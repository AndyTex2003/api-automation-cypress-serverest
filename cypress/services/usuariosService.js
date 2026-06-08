
export function criarUsuario(usuario) {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        body: usuario
    });
}