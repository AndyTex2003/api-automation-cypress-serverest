import { criarUsuario } from "../../services/usuariosService.js";

describe('ServeRest - Usuários', () => {
    
    it('Deve criar um usuário com sucesso', () => {

        const usuario = {
            nome: "QA Test Cypress",
            email: `qa${Date.now()}@qa.com`,
            password: '123456',
            administrador: 'true'
        }

        criarUsuario(usuario)
            .then((response) => {

                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('_id')
                expect(response.body.message)
                    .to.eq('Cadastro realizado com sucesso')
            });
    });

});