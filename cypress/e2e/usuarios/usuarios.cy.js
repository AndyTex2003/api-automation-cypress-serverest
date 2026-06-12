import { criarCarrinho } from "../../services/carrinhosService.js";
import { realizarLogin } from "../../services/loginService.js";
import { criarProduto } from "../../services/produtosService.js";
import {
    criarUsuario,
    buscarUsuarioPorId,
    atualizarUsuario,
    deletarUsuario
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

    it('Deve atualizar um usuário com sucesso', () => {

        cy.fixture('usuario').then((dadosUsuario) => {

            const usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`
            }

            criarUsuario(usuario)
                .then((response) => {

                    const id = response.body._id

                    const usuarioAtualizado = {
                        nome: 'QA Atualizado',
                        email: `qa${Date.now()}@qa.com`,
                        password: '123456',
                        administrador: 'true'
                    }

                    return atualizarUsuario(id, usuarioAtualizado)
                        .then((response) => {

                            expect(response.status).to.eq(200)

                            expect(response.body.message)
                                .to.eq('Registro alterado com sucesso')

                            return buscarUsuarioPorId(id)
                        })
                        .then((response) => {

                            expect(response.body.nome)
                                .to.eq('QA Atualizado')

                        });

                    

                });
        });
    });

    it('Deve excluir usuario com sucesso', () => {

        cy.fixture('usuario').then((dadosUsuario) => {

            const usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`
            }

            criarUsuario(usuario)
                .then((response) => {

                    const id = response.body._id

                    return deletarUsuario(id)

                })
                .then((response) => {

                    expect(response.status).to.eq(200)

                    expect(response.body.message)
                        .to.eq('Registro excluído com sucesso')
                });
                
        });
    });

    it('Não deve permitir excluir usuário com carrinho cadastrado', () => {
        
        let idUsuario
        let token

        cy.fixture('usuario').then((dadosUsuario) => {

            const usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            criarUsuario(usuario)
                .then((response) => {

                    idUsuario = response.body._id

                    return realizarLogin(
                        usuario.email,
                        usuario.password
                    )
                })
                .then((response) => {

                    token = response.body.authorization

                    const produto = {
                        nome: `Produto ${Date.now()}`,
                        preco: 100,
                        descricao: 'Produto de teste',
                        quantidade: 10
                    }

                    return criarProduto(produto, token)
                })
                .then((response) => {

                    const idProduto = response.body._id

                    return criarCarrinho(
                        [
                            {
                                idProduto,
                                quantidade: 1
                            }
                        ],
                        token
                    )
                })
                .then((response) => {

                    return deletarUsuario(
                        idUsuario,
                        false
                    )
                })
                .then((response) => {

                    expect(response.status).to.eq(400)

                    expect(response.body.message)
                        .to.eq('Não é permitido excluir usuário com carrinho cadastrado')
                })
        });
    });


});
