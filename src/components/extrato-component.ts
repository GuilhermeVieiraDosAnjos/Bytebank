import Conta from "../types/Conta.js";
import { FormatoData } from "../types/FormatoData.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";
import { formatarData, formatarMoeda } from "../utils/Formatters.js";

const elementoRegistroTransacoes: HTMLElement = document.querySelector(
  ".extrato .registro-transacoes"
);



renderizarExtrato()
function renderizarExtrato(): void {
  const grupoTransacoes: GrupoTransacao[] = Conta.getGrupoTransacoes()
  elementoRegistroTransacoes.innerHTML = "";
  let htmlRegistroTransacoes: string = "";

  for (let GrupoTransacao of grupoTransacoes) {
    let htmlTransacaoItem: string = "";
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
    `
  }

  if(htmlRegistroTransacoes === ""){
    htmlRegistroTransacoes = "<div>Não há transações registradas";
  }

 elementoRegistroTransacoes.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
    atualizar(): void{
        renderizarExtrato()
    }
}

export default ExtratoComponent;
