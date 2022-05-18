import {DialogView} from './DialogView.js'

export class ToastView extends DialogView {

    #element;

    constructor(element) {
        super(element);
        this.#element = element;
    }


    template(model, tipo) {


        this.#element.classList.add('toast')
        this.#element.classList.remove('dialog')


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
    
    close(){
        this.#element.classList.remove('toast')
        this.#element.classList.add('dialog')
        this.#element.innerHTML = '';
    }
}