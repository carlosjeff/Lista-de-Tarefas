
export class ListaTarefasModel{

    #lista = [];

    constructor() {}

    adicionar(tarefa){
        this.#lista.push(tarefa);
    }

    get tarefas(){
        return this.#lista.slice();
    }
}