export function ValidaDebito(target : any, propertyKey: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;

    descriptor.value = function(valorDoDebito:number){
        if(valorDoDebito <= 0){
            throw new Error("O valor a ser debitado precisa se maior do que zero")
        }


        if(valorDoDebito > this.saldo){
            throw new Error('Seu saldo é insuficiente para realizar a operação')
        }

        return originalMethod.apply(this, [valorDoDebito])
    }

    return descriptor;
}

export function ValidaDeposito(target: any, propertyKey: string, descriptor:PropertyDescriptor){
    const originalMethod = descriptor.value;
    descriptor.value = function(valorDeposito: number){
        if(valorDeposito <= 0){
            throw new Error("O valor a ser depositado tem que ser maior que zero!")
        }

        return originalMethod.apply(this, [valorDeposito])
    }

    return descriptor
}