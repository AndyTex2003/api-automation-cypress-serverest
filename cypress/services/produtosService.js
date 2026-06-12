export function criarProduto(produto, token) {
    return cy.request({
        method: 'POST',
        url: '/produtos',
        headers: {
            Authorization: token
        },
        body: produto
    });
}