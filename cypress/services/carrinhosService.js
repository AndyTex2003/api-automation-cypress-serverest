export function criarCarrinho(
    produtos, 
    token,
    failOnStatusCode = true
) {
    return cy.request({
        method: 'POST',
        url: '/carrinhos',
        failOnStatusCode,
        headers: {
            Authorization: token
        },
        body: {
            produtos
        }
    });
}

export function concluirCompra(token) {
    return cy.request({
        method: 'DELETE',
        url: '/carrinhos/concluir-compra',
        headers: {
            Authorization: token
        }
    });
}