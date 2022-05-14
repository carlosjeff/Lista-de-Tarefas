import {DialogView} from './DialogView.js'

export class ToastView extends DialogView {

    #element;

    constructor(element) {
        super(element);
        this.#element = element;
    }


    template(model) {

        this.modicaClasse();

        return `
            <div class="toast__container">
                <i class="tost__icon tost__icon-check"></i>
                <h3 class="tost__titulo">${model}</h3>
                <button class="close"></button>
            </div>
        `
    }

    modicaClasse(){
        this.#element.classList.toggle('toast')
        this.#element.classList.toggle('dialog')
    }
}