import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { ResumoTransacoes } from "./ResumoTransacao.js";

let saldo: number = JSON.parse(localStorage.getItem('saldo')) || 0;
const transacoes : Transacao[] = JSON.parse(localStorage.getItem('transacoes'), (key: string, value:string)=> {
    if(key === 'data'){
        return new Date(value)
    }

    return value
} ) || [];

function debitar(valor: number): void {
    if(valor <= 0){
        throw new Error ('O valor a ser debitado deve ser maior que zero!');
    }

    if(valor > saldo){
        throw new Error('Saldo insuficiente!')
    }
    saldo -= valor;
    localStorage.setItem("saldo", saldo.toString())
}


function depositar(valor:number):void{
    if(valor <=0){
        throw new Error('O valor a ser depositado deve ser maior que zero!');
    }
    saldo += valor; 
    localStorage.setItem("saldo", saldo.toString())
}

const Conta = {
    getSaldo() {
        return saldo
    },

    getDataAcesso(): Date {
        return new Date()
    },

    getGrupoTransacoes(): GrupoTransacao[]{
        const grupoTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(transacoes);
        const transaoesOrdenadas : Transacao[] = listaTransacoes.sort((t1,t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao : string = "";

        for (let transacao of transaoesOrdenadas) {
            let labelGrupoTransacao : string = transacao.data.toLocaleDateString('pt-br', {month:'long', year:'numeric'})

            if(labelAtualGrupoTransacao !== labelGrupoTransacao ){
                labelAtualGrupoTransacao = labelGrupoTransacao;
                grupoTransacoes.push({
                    label: labelGrupoTransacao, 
                    transacoes: []
                })
            }

            grupoTransacoes.at(-1).transacoes.push(transacao)
        }

        return grupoTransacoes
    },

    agruparTransacao(): ResumoTransacoes{
        const resumo : ResumoTransacoes = {
            totalDepositos: 0,
            totalTransferencias: 0,
            totalPagamentosBoleto: 0
        };

        this.transacoes.forEach(transacao => {
            switch (transacao.tipoTransacao){
                case TipoTransacao.DEPOSITO:
                    resumo.totalDepositos += transacao.valor
                    break;

                case TipoTransacao.TRANSFERENCIA:
                    resumo.totalTransferencias += transacao.valor
                    break;

                case TipoTransacao.PAGAMENTO_BOLETO:
                    resumo.totalPagamentosBoleto += transacao.valor
                    break;
            }
        })

        return resumo
    },

    registrarTransacoes(novaTransacao: Transacao):void {
        if(novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO ) {
            depositar(novaTransacao.valor);
        }else if(novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }else{
            throw new Error('Tipo de transação inválida');
        }

        transacoes.push(novaTransacao)
        console.log(this.getGrupoTransacoes())
        localStorage.setItem('transacoes', JSON.stringify(transacoes))
    }
}

export default Conta;