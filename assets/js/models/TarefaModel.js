import {DateHelper} from '../helpers/DateHelper.js'

export class TarefaModel {

    #titulo;
    #detalhe;
    #dataHora;

    constructor(titulo, detalhe, dataHora) {
        this.#titulo = titulo;
        this.#detalhe = detalhe;
        this.#dataHora = this.#fotmatData(dataHora);
    }

    get titulo(){
        return this.#titulo;
    }

    get detalhe(){
        return this.#detalhe;
    }

    get dataHora(){

        return DateHelper.dataParaTexto(this.#dataHora);
    }

    #fotmatData(datahora){
        return new Date(datahora.replace('T', '-').split('-'));
    }

}