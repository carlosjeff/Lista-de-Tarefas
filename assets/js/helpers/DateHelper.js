export class DateHelper{

    static dataParaTexto(data){
        let meses = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 
        'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];

        let numero = n => n < 10 ? '0' + n : n;

        return `${numero(data.getDate())} de ${meses[data.getMonth()]} de ${data.getFullYear()}, ${numero(data.getHours())}:${numero(data.getMinutes())}`

    }

}