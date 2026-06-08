import { criarUsuario } from "../../services/usuariosService.js";

describe('ServeRest - Usuários', () => {

    it('Deve criar um usuário com sucesso', () => {

        cy.fixture('usuario').then((dadosUsuario) => {

            const usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`
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

});
