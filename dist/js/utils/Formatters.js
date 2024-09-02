import { FormatoData } from "../types/FormatoData.js";
export function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", { currency: "BRL", style: 'currency' });
}
/*EXERCICIO
 function formatarInformacoes(valor:number, data : Date): string{
     let valorFormatado = formatarMoeda(valor)
     let dataFormatada = formatarData(data, FormatoData.DIA_MES)
     return `${dataFormatada} - ${valorFormatado}`
 }
*/
export function formatarData(data, formato = FormatoData.PADRAO) {
    if (formato === FormatoData.DIA_SEMANA_MES_ANOS) {
        return data.toLocaleDateString("pt-BR", {
            weekday: 'long',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    }
    else if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString("pt-BR", {
            day: '2-digit',
            month: '2-digit'
        });
    }
    return data.toLocaleDateString("pt-BR");
}
