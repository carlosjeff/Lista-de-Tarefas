export class  DialogView {

    #element;

    constructor(element) {
        this.#element = element;;
    }


    template(model) {

        throw new Error('O método template deve ser implementado');
    }

    open(model) {
        this.#element.innerHTML = this.template(model);
    }

}