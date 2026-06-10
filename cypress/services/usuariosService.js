
export function criarUsuario(usuario) {
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        body: usuario
    });
}

export function buscarUsuarioPorId(
    id, 
    failOnStatusCode = true
) {
    return cy.request({
        method: "GET",
        url: `/usuarios/${id}`,
        failOnStatusCode
    });
}