import {DialogView} from './DialogView.js'

export class ToastView extends DialogView {

    #element;

    constructor(element) {
        super(element);
        this.#element = element;
    }


    template(model, tipo) {

        this.modicaClasse();



        return `
            <div class="toast__container">
                <i class="tost__icon tost__icon-${tipo}"></i>
                <h3 class="tost__titulo">${model}</h3>
                <button class="close"></button>
            </div>
        `
    }

    open(model, tipo) {
        this.#element.innerHTML = this.template(model,tipo);
    }

    modicaClasse(){
        this.#element.classList.toggle('toast')
        this.#element.classList.toggle('dialog')
    }
}