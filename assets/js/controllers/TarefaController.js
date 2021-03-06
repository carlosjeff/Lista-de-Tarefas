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
    #elementToast;
    #elementTarefas;
    #elementTarefasConcluidas;

    #listaTarefas;
    #listaTarefasConcluidas;

    #toastView;
    #modalTarefaView;
    #tarefaView;
    #tarefasConcluidasView;
    #tempoMensagem

    #service;

    constructor() {
        this.#elemntDialog = document.getElementById('dialog');
        this.#elementTarefas = document.getElementById('tarefas');
        this.#elementTarefasConcluidas = document.getElementById('concluidas');
        this.#elementToast = document.getElementById('dialog-toast')
        
        this.#listaTarefas = new ListaTarefasModel();
        this.#listaTarefasConcluidas = new ListaTarefasConcluidasModel();

        this.#modalTarefaView = new ModalTarefaView(this.#elemntDialog)
        this.#toastView = new ToastView(this.#elementToast);
        this.#tarefaView = new TarefasView(this.#elementTarefas);
        this.#tarefasConcluidasView = new TarefasConcluidasView(this.#elementTarefasConcluidas)

        this.#service = new TarefaService();

        this.#init();
    }

    #init(){

        this.#service.listar().then(tarefas => {
            tarefas.forEach(t => { 
                if(t.concluido){
                    this.#listaTarefasConcluidas.adicionar(t)
                }else{
                    this.#listaTarefas.adicionar(t)
                }
            });
           
        }).then(() =>  this.#updateView())
    }

    observer(element,eventos){

        let obeserver = new MutationObserver(mutations => mutations.forEach(e => eventos(e)));
        obeserver.observe(element, { childList: true });

        return obeserver
    }

    openDialog(id = ''){
        let model = id ? this.#listaTarefas.tarefas.find(t => t.id == id) : id
        this.#modalTarefaView.open(model);
    }

    closeDialog(){
        this.#modalTarefaView.close();
    }

    mensagem(messagem, tipo  = 'sucesso'){
        clearTimeout(this.#tempoMensagem);
        this.#toastView.open(messagem, tipo);
       this.#tempoMensagem = setTimeout(() => {
            this.#toastView.close();
        },2000)
    }

    fechaMensagem(){
        clearTimeout(this.#tempoMensagem);
        this.#toastView.close();
    }

    adiciona(){
        let tarefa =  this.#cria();

        this.#service.cadastrar(tarefa)
            .then(objeto => this.#listaTarefas.adicionar(objeto))
            .then(() => this.#updateView())
            .then(() => this.closeDialog())
            .then(() => this.mensagem('Tarefa criado com sucesso!'))
            .catch(() => this.mensagem('N??o foi poss??vel adiconar a tarefa!', 'erro'))
        

    }

    edita(id){
        let tarefa =  this.#cria();
        tarefa.id = id;
        this.#service.editar(tarefa)
            .then(objeto => this.#listaTarefas.editar(objeto))
            .then(() => this.#updateView())
            .then(() => this.closeDialog())
            .then(() => this.mensagem('Tarefa editada com sucesso!', 'editado'))
            .catch(() => this.mensagem('N??o foi poss??vel editar a tarefa!', 'erro'))
    }

    excluir(id){
        this.#service.deletar(id)
            .then(() => this.#listaTarefas.remover(id))  
            .then(() => this.#listaTarefasConcluidas.remover(id))
            .then(() => this.#updateView())
            .then(() => this.mensagem('Tarefa foi removida com sucesso!'))
            .catch(() => this.mensagem('N??o foi poss??vel remover a tarefa!', 'erro'))
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
            .then(() => this.mensagem(concluir ? 'Tarefa concluida com sucesso!' : 'Tarefa marcada como n??o concluida!'))
            .catch(() => this.mensagem('Erro ao realizar a ac??o!', 'erro'))
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