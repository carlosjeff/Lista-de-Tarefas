import {DialogView} from './DialogView.js'
import {DateHelper} from '../helpers/DateHelper.js'

export class ModalTarefaView extends DialogView {

    #element;

    constructor(element) {
       super(element);
        this.#element = element;
    }


    template(model) {

        this.#element.classList.add('modal')
        this.#element.classList.remove('dialog')

        return `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-titulo">Adicionar uma tarefa</h2>
                    <button class="close"></button>
                </div>
                <div class="modal-body">
                    <form id="form">
                        <div class="input-container input-none">
                            <input type="text" id="id" value="${this.#temValor(model.id)}" class="input">
                        </div>
                        <div class="input-container">
                            <input type="text" id="titulo" value="${this.#temValor(model.titulo)}" class="input" placeholder="Titulo da Tarefa">
                        </div>
                        <div class="input-container">
                            <input type="text" id="detalhe" value="${this.#temValor(model.detalhe)}" class="input" placeholder="Detalhe da tarefa">
                        </div>
                        <div class="input-container">
                            <input type="datetime-local" value="${this.#formataDataInput(model.dataHora)}" id="dataHora" class="input" placeholder="Titulo da Tarefa">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="close close-footer">Fechar</button>
                    ${
                        model.id > 0 ? '<button class="salvar editar">Editar</button>' : 
                                        '<button class="salvar criar">Criar</button>'
                    }
                    
                </div>
            </div>
        `
    }

    #temValor(value){
        return value ? value : ''
    }

    #formataDataInput(data){
      
          return data ? DateHelper.dataParaInput(data) : '';
    }


    close(){
        this.#element.classList.remove('modal')
        this.#element.classList.add('dialog')
        this.#element.innerHTML = '';
    }
}