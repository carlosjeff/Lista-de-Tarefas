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
                        <li class="lista__item" id="${t.id}">
                            <a href="#" class="lista__check"><i class="check__icon"></i></a>
                            <h2 class="lista__titulo">${t.titulo}</h2>
                            <p class="lista__subtitulo">${t.detalhe}</p>
                            <div class="lista__cards">
                                <span class="card">${t.dataHoraFormt}</span>
                            </div>
                            <button class="lista__button"></button>
                        </li>
                    `).join('')
                }
               
            </ul>
        `
    }

    #teplateConcluido(){
        return `
            <div class="tarefa">
                <i class="tarefa__icon-check"></i>
                <h2 class="tarefa__titulo">Todas Tarefas Concluidas!</h2>
                <p class="tarefa__mensagem">Bom Trabalho</p>
            </div>
        `
    }

    #templateVazio(){
        return `
            <div class="tarefa">
                <i class="tarefa__icon-vazio"></i>
                <h2 class="tarefa__titulo">Nâo há tarefas ainda!</h2>
                <p class="tarefa__mensagem">Vamos começar?</p>
            </div>
        `
    }

    update(model){
        if(model.length == 0){
            this.#element.innerHTML = this.#templateVazio();
         
            return;
        }else if(!model.find(m => m.concluido == false)){
            this.#element.innerHTML = this.#teplateConcluido()

            return;
        }
        this.#element.innerHTML = this.#template(model);
    }
}