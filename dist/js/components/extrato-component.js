import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { formatarData, formatarMoeda } from "../utils/Formatters.js";
const elementoRegistroTransacoes = document.querySelector(".extrato .registro-transacoes");
renderizarExtrato();
function renderizarExtrato() {
    const grupoTransacoes = Conta.getGrupoTransacoes();
    elementoRegistroTransacoes.innerHTML = "";
    let htmlRegistroTransacoes = "";
    for (let GrupoTransacao of grupoTransacoes) {
        let htmlTransacaoItem = "";
        for (let transacao of GrupoTransacao.transacoes) {
            htmlTransacaoItem += `
                    <div class="transacao-item">
                        <div class="transacao-info">
                            <span class="tipo">${transacao.tipoTransacao}</span>
                            <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
                        </div>
                        <time class="data">${formatarData(transacao.data, FormatoData.DIA_MES)}</time>
                    </div>
            `;
        }
        htmlRegistroTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-grupo">${GrupoTransacao.label}</strong>
            ${htmlTransacaoItem}
        </div>
    `;
    }
    if (htmlRegistroTransacoes === "") {
        htmlRegistroTransacoes = "<div>Não há transações registradas";
    }
    elementoRegistroTransacoes.innerHTML = htmlRegistroTransacoes;
}
const ExtratoComponent = {
    atualizar() {
        renderizarExtrato();
    }
};
export default ExtratoComponent;
