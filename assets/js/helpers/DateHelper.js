export class DateHelper{

    static dataParaTexto(data){
        let meses = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 
        'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];

        let numero = n => n < 10 ? '0' + n : n;

        return `${numero(data.getDate())} de ${meses[data.getMonth()]} de ${data.getFullYear()}, ${numero(data.getHours())}:${numero(data.getMinutes())}`

    }

    static verificaData(data){
        // 2022-05-12T17:21

       return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(data)
    }

}