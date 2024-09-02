import { formatarMoeda } from "../utils/Formatters";
import Conta from '../types/Conta.js';
const elementoSaldo = document.querySelector('.saldo-valor .valor');
function atualizarSaldo() {
    if (elementoSaldo !== null) {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}
const SaldoComponent = {
    atualizar: function () {
        atualizarSaldo();
    }
};
export default SaldoComponent;
