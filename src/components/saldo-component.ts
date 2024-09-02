import { formatarData, formatarMoeda } from "../utils/Formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;
const elementodataAcesso = document.querySelector('.block-saldo time') as HTMLElement; 

if(elementodataAcesso !== null){
    elementodataAcesso.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_MES_ANOS)
}


renderizarSaldo();
function renderizarSaldo(): void {
    if(elementoSaldo !== null){
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo())
    }
}


const SaldoComponent = {
    atualizar (){
        renderizarSaldo()
    }
}

export default SaldoComponent