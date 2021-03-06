export class ListaTarefasConcluidasModel{

    #lista = []

    constructor() { }

    adicionar(tarefa){
        this.#lista.push(tarefa);
    }

    remover(id){
        this.#lista = this.#lista.filter(e => e.id != id);
    }

    get tarefas(){
        return this.#lista.slice();
    }
}