export class TarefasView{

    #element;

    constructor(element) {
        this.#element = element;
    }

    #template(model){

        return `
            <ul class="lista">
                ${
                    model.map(t => `
                        <li class="lista__item">
                            <a href="#" class="lista__check"><i class="check__icon"></i></a>
                            <h2 class="lista__titulo">${t.titulo}</h2>
                            <p class="lista__subtitulo">${t.detalhe}</p>
                            <div class="lista__cards">
                                <span class="card">${t.dataHora}</span>
                            </div>
                            <button class="lista__button"></button>
                        </li>
                    `).join('')
                }
               
            </ul>
        `
    }

    update(model){
        this.#element.innerHTML = this.#template(model);
    }
}