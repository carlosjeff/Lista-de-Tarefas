
export class ListaTarefasModel{

    #lista = [];

    constructor() {}

    adicionar(tarefa){
        this.#lista.push(tarefa);
    }

    remover(id){
        this.#lista = this.#lista.filter(e => e.id != id);
    }

    editar(tarefa){
        this.#lista = this.#lista.map(e => e.id == tarefa.id ? tarefa : e);
    }

    get tarefas(){
        return this.#lista.slice();
    }
}