function ValidaCpf(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', { // cpfLimpo é a proprieda definida
        enumerable: true, //Faz o cpfEnviado aparecer no console.log(cpf)
        get: () => {
            return cpfEnviado.replace(/\D+/g, ''); //Tudo que nao for numero sera substituido por '' NADA
        }
    });
}

ValidaCpf.prototype.valida = function () {  //Criando o metodo prototype valida dentro do ValidaCpf
    if (typeof this.cpfLimpo === 'undefined') return false;//this utilizado pq cpfLimpo esta dentro de validaCpf
    if (this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false
    const cpfParcial = this.cpfLimpo.slice(0, -2); //diminuindo cpf para 9 numeros 
    const digito1 = this.criaDigito(cpfParcial); //Fazendo a soma dos 9 numeros para obter o primeiro digito 
    const digito2 = this.criaDigito(cpfParcial + digito1); //obtendo o segundo digito 
    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
}

ValidaCpf.prototype.criaDigito = function (cpfParcial) { //cria os digitos finais e faz a conta
    const cpfArray = Array.from(cpfParcial) //Transformando em array

    let contadorRegressivo = cpfArray.length + 1; //Fazendo array começar com o index 1
    const total = cpfArray.reduce((ac, val) => {
      ac += (contadorRegressivo * Number(val))   //obtendo o total
        contadorRegressivo--;
        return ac
    }, 0)
    const digito = 11 - (total % 11); //Obtendo o primeiro digito pos - do cpf
    return digito > 9 ? '0' : String(digito); //Retornando uma sting para concatecar no (novoCpf)
}

ValidaCpf.prototype.isSequencia = function () {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length); //Nao permintindo repetições do mesmo numero por todo cpf EX: 111111111
    return sequencia === this.cpfLimpo;
}

const cpf = new ValidaCpf('705.484.450-52');
console.log(cpf.cpfLimpo) // .cpfLimpo para executar o get e mostrar apenas os numeros do cpf

console.log(cpf.valida()); // Metodo responsavel por validar


if(cpf.valida()) {
    console.log('Cpf Valido')
}else{
    console.log('Cpf Invalido')
}