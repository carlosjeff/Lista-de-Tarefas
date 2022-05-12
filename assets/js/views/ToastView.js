export class ToastView {

    #element;

    constructor(element) {
        this.#element = element;;
    }


    #template(model) {

        this.#modicaClasse();

        return `
            <div class="toast__container">
                <i class="tost__icon tost__icon-check"></i>
                <h3 class="tost__titulo">${model}</h3>
                <button class="close"></button>
            </div>
        `
    }

    open(model) {
        this.#element.innerHTML = this.#template(model);
    }

    close(){
        this.#modicaClasse();
        this.#element.innerHTML = '';
    }

    #modicaClasse(){
        this.#element.classList.toggle('toast')
        this.#element.classList.toggle('dialog')
    }

}