
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

export function atualizarUsuario(
    id,
    usuario,
    failOnStatusCode = true
) {
    return cy.request({
        method: 'PUT',
        url: `/usuarios/${id}`,
        failOnStatusCode,
        body: usuario
    });
}