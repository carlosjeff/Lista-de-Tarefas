import {TarefaModel} from '../models/TarefaModel.js'

export class TarefaDao{

    #connection;
    #store;

    constructor(connection) {
        this.#connection = connection;
        this.#store = 'tarefas';
    }

    adiciona(tarefa){

        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .add(this.#criaObjeto(tarefa));

            request.onsuccess = e => {
                tarefa.id = e.target.result;
                resolve(tarefa);
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a Tarefa!');
            };
        })
    }

    editar(tarefa){
        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .put(this.#criaObjeto(tarefa), tarefa.id);

            request.onsuccess = e => {
                tarefa.id = e.target.result;
                resolve(tarefa);
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível adicionar a Tarefa!');
            };
        })
    }

    
    delete(id){
        return new Promise((resolve, reject) => {

            let request = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .delete(+id);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {

                console.log(e.target.error);
                reject('Não foi possível excluir Tarefa!');
            };
        })
    }


    listarTodos(){
        
        return new Promise((resolve, reject) => {

            let cursor = this.#connection
            .transaction([this.#store], 'readwrite')
            .objectStore(this.#store)
            .openCursor();

        let tarefas = [];

        cursor.onsuccess = e => {

            let atual = e.target.result;

            if (atual) {

                let dado = atual.value;
                tarefas.push(new TarefaModel(dado.titulo,dado.detalhe,dado.dataHora,dado.concluido,atual.key));

                atual.continue();
            } else {
                resolve(tarefas);
            }
        }

        cursor.onerror = e => {
            console.log(e.target.error);
            reject('Não foi possível listar as Tarefas')
        };
        })
    }

    #criaObjeto(tarefa){
        return {
            titulo: tarefa.titulo, 
            detalhe: tarefa.detalhe, 
            dataHora: tarefa.dataHora, 
            concluido: tarefa.concluido 
        }
    }
}