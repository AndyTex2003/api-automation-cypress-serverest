import{ 
    criarUsuario,
    buscarUsuarioPorId
 } from "../../services/usuariosService.js"

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

    it('Deve buscar um usuário pelo ID com sucesso', () => {

        cy.fixture('usuario').then((dadosUsuario) => {

            const usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`
            }

            criarUsuario(usuario)
                .then((response) => {

                    const idUsuario = response.body._id

                    return buscarUsuarioPorId(idUsuario)
                })
                .then((response) => {
                    
                    expect(response.status).to.eq(200)

                    expect(response.body.nome)
                        .to.eq(usuario.nome)

                    expect(response.body.email)
                        .to.eq(usuario.email)

                    expect(response.body.administrador)
                        .to.eq(usuario.administrador)
                })
        });
    });

    it('Deve retornar erro ao buscar usuário com ID inválido', () => {

        buscarUsuarioPorId('123456', false)
            .then((response) => {
                
                expect(response.status).to.eq(400)

                expect(response.body.id)
                    .to.eq('id deve ter exatamente 16 caracteres alfanuméricos')
                
            });
    });

    it('Deve retornar erro ao buscar usuário inexistente', () => {

        buscarUsuarioPorId(
            '1234561234561234',
            false
        )
            .then((response) => {

                expect(response.status).to.eq(400)

                expect(response.body.message)
                    .to.eq('Usuário não encontrado')
            });
    });


});
