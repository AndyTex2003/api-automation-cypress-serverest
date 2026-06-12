export function criarCarrinho(produtos, token) {
    return cy.request({
        method: 'POST',
        url: '/carrinhos',
        headers: {
            Authorization: token
        },
        body: {
            produtos
        }
    });
}