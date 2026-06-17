export function criarProdutoValido() {
    return {
        nome: `Produto ${Date.now()}`,
        preco: 100,
        descricao: 'Produto de teste',
        quantidade: 10
    }
}