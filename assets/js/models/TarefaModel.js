import {DateHelper} from '../helpers/DateHelper.js'

export class TarefaModel {

    #id;
    #titulo;
    #detalhe;
    #dataHora;
    #concluido;

    constructor(titulo, detalhe, dataHora, concluido,id = 0) {
        this.#id = id;
        this.#titulo = titulo;
        this.#detalhe = detalhe;
        this.#dataHora = this.#fotmatData(dataHora);
        this.#concluido = concluido;
    }

    get id(){
        return this.#id;
    }

    set id(id){
        this.#id = id;
    }

    get titulo(){
        return this.#titulo;
    }

    get detalhe(){
        return this.#detalhe;
    }

    get dataHoraFormt(){

        return DateHelper.dataParaTexto(this.#dataHora);
    }

    get dataHora(){
        return this.#dataHora;
    }

    get concluido(){
        return this.#concluido;
    }

    set concluido(valor){
        this.#concluido = valor;
    }


    #fotmatData(datahora){
        let data;
        if(DateHelper.verificaData(datahora)){
            data = new Date(datahora.replace('T', '-').split('-'));
        }else{
            data = new Date(datahora);
        }
        return data
    }

    // 2022-05-12T17:21
}