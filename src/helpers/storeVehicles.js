
export const moneyFormat = val => {
    var valor = parseInt(val)
	var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return valorFormatado
}