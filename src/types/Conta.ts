import { Armazenador } from "./Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
    protected nome: string
    protected saldo : number = Armazenador.obter<number>("saldo")|| 0;
    private transacoes: Transacao[] = Armazenador.obter<Transacao[]>(('transacoes'), (key:string, value: any) =>{
        if(key === 'data'){
            return new Date(value);
        }
        return value
    }) || [];

    constructor(nome: string){
        this.nome = nome;
    }

    public getTitular(){
        return this.nome
    }

    getGrupoTransacoes(): GrupoTransacao[]{
        const grupoTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
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
    }


    getSaldo(){
        return this.saldo;
    }

    getDataAcesso(): Date{
        return new Date()
    }

    registrarTransacoes(novaTransacao: Transacao):void {
        if(novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO ) {
            this.depositar(novaTransacao.valor);
        }else if(novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        }else{
            throw new Error('Tipo de transação inválida');
        }

        this.transacoes.push(novaTransacao)
        console.log(this.getGrupoTransacoes())
        Armazenador.salvar('transacoes', JSON.stringify(this.transacoes))
    }

    
    @ValidaDebito
    private debitar(valor: number): void {
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo.toString())
    }

    @ValidaDeposito
    private depositar(valor:number):void{
        this.saldo += valor; 
        Armazenador.salvar("saldo", this.saldo.toString())
    }
}

export class ContaPremium extends  Conta {
    registrarTransacao(transacao: Transacao): void{
        if(transacao.tipoTransacao === TipoTransacao.DEPOSITO){
            console.log('ganhou um bonus de 0.50 centavos');
            transacao.valor += 0.5;
        }
        this.registrarTransacao(transacao)
    }
}

const conta = new Conta("Joana da Silva Olveira");
const contaPremium = new ContaPremium("Mônica Hillman")

export default conta;
