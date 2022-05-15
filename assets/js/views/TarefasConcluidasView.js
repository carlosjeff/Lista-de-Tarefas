export class TarefasConcluidasView{

    #element;

    constructor(element) {
        this.#element = element;
    }

    #template(model){

        return `
            <ul class="lista">
                ${
                    model.map(t => `
                        <li class="lista__item" id="${t.id}">
                            <a href="#" class="lista__check lista__check-concluido"><i class="check__icon"></i></a>
                            <h2 class="lista__titulo lista__titulo-concluido">${t.titulo}</h2>
                            <p class="lista__subtitulo">${t.detalhe}</p>
                            <button class="lista__button"></button>
                        </li>
                    `).join('')
                }
               
            </ul>
        `
    }

    
    #templateVazio(){
        return `
            <div class="tarefa">
                <i class="tarefa__icon-vazio"></i>
                <h2 class="tarefa__titulo">Nenhuma tarefa concluida!</h2>
                <p class="tarefa__mensagem">Vamos começar?</p>
            </div>
        `
    }

    update(model){
        if(model.length == 0){

            this.#element.innerHTML = this.#templateVazio();
            return;

        }else {

            this.#element.innerHTML = this.#template(model);
            return;

        }
    }
}