import {ModalTarefaView} from '../views/ModalTarefaView.js'
import {TarefaModel} from '../models/TarefaModel.js'
import {ListaTarefasModel} from '../models/ListaTarefasModel.js'
import {TarefasView} from '../views/TarefasView.js'
import {ToastView} from '../views/ToastView.js'
import {TarefaService} from '../services/TarefaService.js'
import {ListaTarefasConcluidasModel} from '../models/ListaTarefasConcluidas.js'
import {TarefasConcluidasView} from '../views/TarefasConcluidasView.js'
 
export class TarefaController{

    #elemntDialog;
    #elementTarefas;
    #elementTarefasConcluidas;

    #listaTarefas;
    #listaTarefasConcluidas;

    #toastView;
    #modalTarefaView;
    #tarefaView;
    #tarefasConcluidasView;

    #service;

    constructor() {
        this.#elemntDialog = document.getElementById('dialog');
        this.#elementTarefas = document.getElementById('tarefas');
        this.#elementTarefasConcluidas = document.getElementById('concluidas');
        
        this.#listaTarefas = new ListaTarefasModel();
        this.#listaTarefasConcluidas = new ListaTarefasConcluidasModel();

        this.#modalTarefaView = new ModalTarefaView(this.#elemntDialog)
        this.#toastView = new ToastView(this.#elemntDialog);
        this.#tarefaView = new TarefasView(this.#elementTarefas);
        this.#tarefasConcluidasView = new TarefasConcluidasView(this.#elementTarefasConcluidas)

        this.#service = new TarefaService();

        this.#init();
    }

    #init(){
        this.#updateView();

        this.#service.listar().then(tarefas => {
            tarefas.forEach(t => { 
                if(t.concluido){
                    this.#listaTarefasConcluidas.adicionar(t)
                }else{
                    this.#listaTarefas.adicionar(t)
                }
            });
            this.#updateView();
        })
    }

    observer(element,eventos){

        let obeserver = new MutationObserver(mutations => mutations.forEach(e => eventos(e)));
        obeserver.observe(element, { childList: true });

        return obeserver
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
                this.mensagem('Tarefa criado com sucesso!');
        })

    }

    edita(tarefa){
        this.#service.editar(tarefa).then(objeto => {
            this.mensagem('Tarefa editada com sucesso!');
        })
    }

    excluir(id){
        this.#service.deletar(id)
            .then(() => this.#listaTarefas.remover(id))  
            .then(() => this.#listaTarefasConcluidas.remover(id))
            .then(() => this.#updateView())
            .then(() => this.mensagem('Tarefa foi removida com sucesso!'))
            .catch(() => this.mensagem('Não foi possível remover a tarefa!'))
    }

    concluir(evento, id, concluir = true){
        evento.preventDefault();
        let tarefa = this.#listaTarefas.tarefas.find(t => t.id == id);
        if(!concluir){
            tarefa = this.#listaTarefasConcluidas.tarefas.find(t => t.id == id);
        }
        tarefa.concluido = !tarefa.concluido
        
        this.#service.editar(tarefa)
            .then(() => concluir ? this.#listaTarefas.remover(id) : this.#listaTarefas.adicionar(tarefa))
            .then(() => concluir ? this.#listaTarefasConcluidas.adicionar(tarefa) : this.#listaTarefasConcluidas.remover(id))
            .then(() => this.#updateView())
            .then(() => this.mensagem(concluir ? 'Tarefa concluida com sucesso!' : 'Tarefa marcada como não concluida!'))
            .catch(() => this.mensagem('Erro ao realizar a acão!'))
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
        this.#tarefasConcluidasView.update(this.#listaTarefasConcluidas.tarefas)
    }


}