import { criarUsuario } from '../../services/usuariosService.js'
import { realizarLogin } from '../../services/loginService.js'
import { criarProduto } from '../../services/produtosService.js'
import {
    criarCarrinho,
    concluirCompra
} from '../../services/carrinhosService.js'

describe('ServeRest - Carrinhos', () => {

    it('Deve cadastrar carrinho com sucesso', () => {

        let usuario
        let token

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            return criarUsuario(usuario)
        })
            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                token = response.body.authorization
            })
            .then(() => {
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

                expect(response.status).to.eq(201)

                expect(response.body.message)
                    .to.eq('Cadastro realizado com sucesso')

                expect(response.body._id).to.exist
            })
    });

    it('Não deve permitir possuir mais de 1 carrinho', () => {

        let usuario
        let token
        let idProduto

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            return criarUsuario(usuario)
        })

            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                token = response.body.authorization
            })
            .then(() => {
                const produto = {
                    nome: `Produto ${Date.now()}`,
                    preco: 100,
                    descricao: 'Produto de teste',
                    quantidade: 10
                }

                return criarProduto(produto, token)
            })
            .then((response) => {

                idProduto = response.body._id

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
            .then(() => {

                return criarCarrinho(
                    [
                        {
                            idProduto,
                            quantidade: 1
                        }
                    ],
                    token,
                    false
                )
            })
            .then((response) => {

                expect(response.status).to.eq(400)

                expect(response.body.message)
                    .to.eq('Não é permitido ter mais de 1 carrinho')
            })

    });

    it('Não deve permitir cadastrar carrinho sem token', () => {

        let usuario

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            return criarUsuario(usuario)
        })
            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                const token = response.body.authorization

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
                    '',
                    false
                )
            })

            .then((response) => {

                expect(response.status).to.eq(401)

                expect(response.body.message)
                    .to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')

            })
    });

    it('Não deve permitir cadastrar carrinho com token inválido', () => {

        let usuario

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            return criarUsuario(usuario)
        })
            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                const token = response.body.authorization

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
                    '',
                    false
                )
            })
            .then((response) => {

                expect(response.status).to.eq(401)

                expect(response.body.message)
                    .to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
    });

    it('Não deve permitir adicionar produto inexistente ao carrinho', () => {

        let usuario
        let token

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            return criarUsuario(usuario)
        })

            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                token = response.body.authorization


                return criarCarrinho(
                    [
                        {
                            idProduto: 'produto-inexistente',
                            quantidade: 1
                        }
                    ],
                    token,
                    false
                )

            })
            .then((response) => {

                expect(response.status).to.eq(400)

                expect(response.body.message)
                    .to.eq('Produto não encontrado')
            })
    });

    it('Não deve permitir adicionar quantidade maior que o estoque', () => {

        let usuario
        let token
        let idProduto

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            return criarUsuario(usuario)
        })
            .then(() => {

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

                idProduto = response.body._id

                return criarCarrinho(
                    [
                        {
                            idProduto,
                            quantidade: 20
                        }
                    ],
                    token,
                    false
                )

            })
            .then((response) => {

                expect(response.status).to.eq(400)

                expect(response.body.message)
                    .to.eq('Produto não possui quantidade suficiente')
            })
    });

    it('Deve concluir compra com sucesso', () => {

        let usuario
        let token
        let idProduto

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'true'
            }

            return criarUsuario(usuario)
        })

            .then(() => {

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

                idProduto = response.body._id

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
            .then(() => {

                return concluirCompra(token)
            })
            .then((response) => {

                expect(response.status).to.eq(200)

                expect(response.body.message)
                    .to.eq('Registro excluído com sucesso')
            })
    });
});