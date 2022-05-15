import {ConnectionFactory} from './ConnectionFactory.js'
import {TarefaDao} from '../dao/TarefaDao.js'

export class TarefaService{

    constructor() {   
    }

    cadastrar(tarefa){
        return ConnectionFactory
                    .getConnection()
                    .then(connection => new TarefaDao(connection))
                    .then(dao => dao.adiciona(tarefa))
                    .catch(() => {
                        throw new Error('Não foi possível adicionar a Tarefa!')
                    });
    }

    editar(tarefa){
        return ConnectionFactory
                .getConnection()
                .then(connection => new TarefaDao(connection))
                .then(dao => dao.editar(tarefa))
                .catch(() => {
                    throw new Error('Não foi possível Alterar a Tarefa!')
                });
    }

    deletar(id){
        return ConnectionFactory
            .getConnection()
            .then(connection => new TarefaDao(connection))
            .then(dao => dao.delete(id))
            .catch(err => {
                throw new Error(err);
            })
    }

    listar(){

        return ConnectionFactory
                .getConnection()
                .then(connection => new TarefaDao(connection))
                .then(dao => dao.listarTodos())
                .catch(() => {
                    throw new Error('Não foi possível listar as Tarefas!')
                })

    }
}