export function criarProduto(
    produto, 
    token,
    failOnStatusCode = true
) {
    return cy.request({
        method: 'POST',
        url: '/produtos',
        failOnStatusCode,
        headers: {
            Authorization: token
        },
        body: produto
    });
}