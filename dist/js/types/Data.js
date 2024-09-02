import { formatarData } from "../utils/Formatters";
import Conta from "./Conta";
import { FormatoData } from "./FormatoData";
const elementoData = document.querySelector('.block-saldo time');
function renderizarData() {
    if (elementoData !== null) {
        elementoData.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_MES_ANOS);
    }
}
const DataAtualizada = {
    atualizar: function () {
        renderizarData();
    }
};
