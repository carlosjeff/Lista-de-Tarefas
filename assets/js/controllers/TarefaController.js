import {ModalTarefaView} from '../views/ModalTarefaView.js'
import {TarefaModel} from '../models/TarefaModel.js'
import {ListaTarefasModel} from '../models/ListaTarefasModel.js'
import {TarefasView} from '../views/TarefasView.js'
import {ToastView} from '../views/ToastView.js'
import {TarefaService} from '../services/TarefaService.js'
 
export class TarefaController{

    #elemntDialog;
    #elementTarefas;
    #listaTarefas;
    #toastView;
    #modalTarefaView;
    #tarefaView;
    #service;

    constructor() {
        this.#elemntDialog = document.getElementById('dialog');
        this.#elementTarefas = document.getElementById('tarefas');
        this.#modalTarefaView = new ModalTarefaView(this.#elemntDialog)
        this.#listaTarefas = new ListaTarefasModel();
        this.#toastView = new ToastView(this.#elemntDialog);
        this.#tarefaView = new TarefasView(this.#elementTarefas);
        this.#service = new TarefaService();
        this.#updateView();
       
        this.#service.listar().then(tarefas => {
            tarefas.forEach(t => this.#listaTarefas.adicionar(t));
            this.#updateView();
        })
    }

    openDialog(model = ''){
        this.#modalTarefaView.open(model);
    }

    closeDialog(){
        this.#modalTarefaView.close();
    }

    mensagem(messagem){
        this.#toastView.open(messagem);
        setTimeout(() => {
            this.#toastView.close();
        },2000)
    }

    adiciona(){

        let tarefa =  this.#cria();

        this.#service.cadastrar(tarefa)
            .then(objeto => {
                this.#listaTarefas.adicionar(objeto);
                this.#updateView();
                this.closeDialog();
                this.mensagem('Tarefa Criado Com Sucesso!');
        })

    }

    edita(tarefa){
        this.#service.editar(tarefa).then(objeto => {
            this.mensagem('Tarefa editada Com Sucesso!');
        })
    }

    concluir(evento, id){
        evento.preventDefault();
        let tarefa = this.#listaTarefas.tarefas.find(t => t.id == id);
        tarefa.concluido = !tarefa.concluido
        this.edita(tarefa)
    }

    retirarDaLista(){
        
    }

    #cria(){
        let form =  document.querySelector('#form');
        return new TarefaModel(
            form.titulo.value,
            form.detalhe.value, 
            form.dataHora.value,
            false
            );
    }

    #updateView(){
        this.#tarefaView.update(this.#listaTarefas.tarefas)
    }

    observer(element,eventos){

        let obeserver = new MutationObserver(mutations => mutations.forEach(e => eventos(e)));
        obeserver.observe(element, { childList: true });

        return obeserver
    }
}