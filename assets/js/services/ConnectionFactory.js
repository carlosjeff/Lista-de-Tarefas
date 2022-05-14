const stores = ['tarefas'];
const version = 1;
const dbName = 'tarefasLista';

let connection = null
let close = null

export class ConnectionFactory {

    constructor() {

        throw new Error("Não é posssivel criae instacia de ConnectionFactory");
    }

    static getConnection(){

        return new Promise((resolve, reject) => {

            let openRequest = window.indexedDB.open(dbName, version);
    
            openRequest.onupgradeneeded = e => {
                ConnectionFactory.#createStore(e.target.result);
            };
    
            openRequest.onsuccess = e => {
    
                if (!connection) {
                    connection = e.target.result;
                    close = connection.close.bind(connection);
                    connection.close = function () {
                        throw new Error("você não pode fechar diretamnete a connexão");
                    }         
                }
                resolve(connection);
            }
    
            
            openRequest.onerror = e => {
    
                console.log(e.target.result);
                reject(e.target.error.name);
            };
        })
        
    }

    static #createStore(connection){
        stores.forEach(store => {
            
            if (connection.objectStoreNames.contains(store)) {
                connection.deleteObjectStore(store);
            }

            connection.createObjectStore(store, { autoIncrement: true });
        })
    }

    static closeConnection() {

        if (connection) {

            close();
            connection = null;
        }
    }
}