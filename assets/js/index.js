import { TarefaController } from './controllers/TarefaController.js'

let tarefaController = new TarefaController();
let dialog = document.querySelector('#dialog');
let tarefas = document.getElementById('tarefas');
let tarefasConcluidas = document.getElementById('concluidas');

document.getElementById('button-add').addEventListener('click', () => tarefaController.openDialog());
document.querySelector('.tarefas__concluidas__button').addEventListener('click', () => {

    document.getElementById('concluidas').classList.toggle('tarefas__concluidas-ativo');
    document.querySelector('.tarefas__concluidas__button').classList.toggle('tarefas__concluidas__button-ativo');
});

tarefaController.observer(dialog, e => {
    if (dialog.classList.contains('modal')) {

        let form = dialog.querySelector('#form');

        document.querySelectorAll('.close')
            .forEach(c => c.addEventListener(
                'click', () => tarefaController.closeDialog())
            );
        if(form?.id.value > 0){

            document.querySelector('.editar').addEventListener(
                'click', () => tarefaController.edita(+form.id.value)
            )
        }else{
            document.querySelector('.salvar').addEventListener(
                'click', () => tarefaController.adiciona()
            )
        }

    }

    if (dialog.classList.contains('toast')) {

        document.querySelector('.close').addEventListener(
                'click', () => tarefaController.closeDialog()
            );
    }
});

tarefaController.observer(tarefas, e => {

    tarefas.querySelectorAll('.lista__item').forEach(item => {

        item.querySelector('.lista__check').addEventListener('click', e => tarefaController.concluir(e, item.id));
        item.querySelector('.lista__titulo').addEventListener('click', () => tarefaController.openDialog(item.id));
        item.querySelector('.lista__subtitulo').addEventListener('click', () =>tarefaController.openDialog(item.id));
        item.querySelector('.lista__cards').addEventListener('click', () => tarefaController.openDialog(item.id));
        item.querySelector('.lista__button').addEventListener('click', e => tarefaController.excluir(item.id));
    });
});

tarefaController.observer(tarefasConcluidas, e =>{

    tarefasConcluidas.querySelectorAll('.lista__item').forEach(item => {

        item.querySelector('.lista__check').addEventListener('click', e => tarefaController.concluir(e, item.id, false));
        item.querySelector('.lista__button').addEventListener('click', e => tarefaController.excluir(item.id));
     })
})
