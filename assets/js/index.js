import { TarefaController } from './controllers/TarefaController.js'

let tarefaController = new TarefaController();
let dialog = document.querySelector('#dialog');
let dialogToast = document.querySelector('#dialog-toast');
let tarefas = document.getElementById('tarefas');
let tarefasConcluidas = document.getElementById('concluidas');
let actionEvent = () => {};

document.getElementById('button-add').addEventListener('click', () => tarefaController.openDialog());

document.querySelector('.tarefas__concluidas__button').addEventListener('click', () => animacaoTarefasConcluidas());

tarefaController.observer(tarefas, () => eventosTarefas());

tarefaController.observer(tarefasConcluidas, () => eventosTarefasConcluidas());

tarefaController.observer(dialog, () => eventosDialog());

tarefaController.observer(dialogToast, () => eventosDialogToast());

function eventosDialog(){

    if (dialog.classList.contains('modal')) {

        let form = dialog.querySelector('#form');

        
        document.querySelectorAll('.close')
            .forEach(c => c.addEventListener(
                'click', () => tarefaController.closeDialog())
            );
        if(form?.id.value > 0){
            
            actionEvent =  () => tarefaController.edita(+form.id.value);

            document.addEventListener('keyup', tecladoEvento)

            document.querySelector('.editar').addEventListener(
                'click', actionEvent
            )
        }else{
            
            actionEvent =  () =>  tarefaController.adiciona();

            document.addEventListener('keyup', tecladoEvento)

            document.querySelector('.salvar').addEventListener(
                'click', () => actionEvent
            )
        }

        document.getElementById('titulo').focus();
    }   
}

function eventosDialogToast(){

    if (dialogToast.classList.contains('toast')) {

        document.querySelector('.close').addEventListener(
                'click', () => tarefaController.fechaMensagem()
        );
    }
}

function eventosTarefasConcluidas(){

    tarefasConcluidas.querySelectorAll('.lista__item').forEach(item => {

        item.querySelector('.lista__check').addEventListener('click', e => tarefaController.concluir(e, item.id, false));
        item.querySelector('.lista__button').addEventListener('click', e => tarefaController.excluir(item.id));
     })
}

function eventosTarefas(){

    tarefas.querySelectorAll('.lista__item').forEach(item => {

        item.querySelector('.lista__check').addEventListener('click', e => tarefaController.concluir(e, item.id));
        item.querySelector('.lista__titulo').addEventListener('click', () => tarefaController.openDialog(item.id));
        item.querySelector('.lista__subtitulo').addEventListener('click', () =>tarefaController.openDialog(item.id));
        item.querySelector('.lista__cards').addEventListener('click', () => tarefaController.openDialog(item.id));
        item.querySelector('.lista__button').addEventListener('click', e => tarefaController.excluir(item.id));
    });
}

function tecladoEvento(event) {

    if(event.key == 'Enter'){
        actionEvent();
        document.removeEventListener('keyup',tecladoEvento,false)
    }
    if(event.key == 'Escape'){
        tarefaController.closeDialog()
        document.removeEventListener('keyup',tecladoEvento,false)
    }
}

function animacaoTarefasConcluidas(){
    document.getElementById('concluidas').classList.toggle('tarefas__concluidas-ativo');
    document.querySelector('.tarefas__concluidas__button').classList.toggle('tarefas__concluidas__button-ativo');
}   