export function criarUsuarioAdmin() {
    return {
        nome: 'QA Automation',
        email: `qa${Date.now()}@qa.com`,
        password: 'teste123',
        administrador: 'true'
    }
}