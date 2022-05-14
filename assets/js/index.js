import { TarefaController } from './controllers/TarefaController.js'

let tarefaController = new TarefaController();
let dialog = document.querySelector('#dialog');
let tarefas = document.getElementById('tarefas');

document.getElementById('button-add').addEventListener('click', () => tarefaController.openDialog());
document.querySelector('.tarefas__concluidas__button').addEventListener('click', () => {

    document.getElementById('concluidas').classList.toggle('tarefas__concluidas-ativo')
    document.querySelector('.tarefas__concluidas__button').classList.toggle('tarefas__concluidas__button-ativo')
    
    
}
    );

tarefaController.observer(dialog, e => {
    console.log(e)
    if (dialog.classList.contains('modal')) {

        document.querySelectorAll('.close')
            .forEach(c => c.addEventListener(
                'click', () => tarefaController.closeDialog())
            );

        document.querySelector('.salvar').addEventListener(
            'click', () => tarefaController.adiciona()
        )
    }

    if (dialog.classList.contains('toast')) {

        document.querySelector('.close').addEventListener(
                'click', () => tarefaController.closeDialog()
            );
    }
});

tarefaController.observer(tarefas, e => {

    
    tarefas.querySelectorAll('.lista__item').forEach(item => {
       item.querySelector('.lista__check').addEventListener('click', e => {
        tarefaController.concluir(e, item.id)
       })
    })
})