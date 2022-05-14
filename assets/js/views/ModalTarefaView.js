import {DialogView} from './DialogView.js'

export class ModalTarefaView extends DialogView {

    #element;

    constructor(element) {
       super(element);
        this.#element = element;
    }


    template(model) {

        this.modicaClasse();

        return `
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-titulo">Adicionar uma tarefa</h2>
                    <button class="close"></button>
                </div>
                <div class="modal-body">
                    <form id="form">
                        <div class="input-container">
                            <input type="text" id="titulo" class="input" placeholder="Titulo da Tarefa">
                        </div>
                        <div class="input-container">
                            <input type="text" id="detalhe" class="input" placeholder="Detalhe da tarefa">
                        </div>
                        <div class="input-container">
                            <input type="datetime-local" id="dataHora" class="input" placeholder="Titulo da Tarefa">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="close close-footer">Fechar</button>
                    <button class="salvar salvar-check">Criar</button>
                </div>
            </div>
        `
    }

    modicaClasse(){
        this.#element.classList.toggle('modal')
        this.#element.classList.toggle('dialog')
    }

}