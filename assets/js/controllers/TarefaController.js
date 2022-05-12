import {ModalTarefaView} from '../views/ModalTarefaView.js'
import {TarefaModel} from '../models/TarefaModel.js'
import {ListaTarefasModel} from '../models/ListaTarefasModel.js'
import {TarefasView} from '../views/TarefasView.js'
import {ToastView} from '../views/ToastView.js'
 
export class TarefaController{

    #elemntDialog;
    #elementTarefas;
    #modalTarefaView;
    #listaTarefas;
    #toastView;

    constructor() {

        this.#elemntDialog = document.getElementById('dialog');
        this.#elementTarefas = document.getElementById('tarefas');
        this.#modalTarefaView = new ModalTarefaView(this.#elemntDialog)
        this.#listaTarefas = new ListaTarefasModel();
        this.#toastView = new ToastView(this.#elemntDialog);

    }

    openDialog(){
        this.#modalTarefaView.open('');
    }

    closeDialog(){
        this.#modalTarefaView.close();
    }

    adicionaTarefa(){
        let form =  document.querySelector('#form');
        let tarefa = new TarefaModel(form.titulo.value,form.detalhe.value, form.dataHora.value);
        this.#listaTarefas.adicionar(tarefa);
        new TarefasView(this.#elementTarefas).update(this.#listaTarefas.tarefas)
        console.log(this.#listaTarefas.tarefas);
        this.closeDialog();
        this.#toastView.open('Tarefa Criado Com Sucesso!')
        setTimeout(() => {
            this.#toastView.close();
        },2000)
    }
}