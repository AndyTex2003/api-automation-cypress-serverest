
export function criarUsuario(usuario) {
    return cy.request({
        method: 'POST',
        url: '/usuarios',
        body: usuario
    });
}