import { criarUsuario } from '../../services/usuariosService'
import { realizarLogin } from '../../services/loginService'
import { criarProduto } from '../../services/produtosService'

describe('ServeRest - Produtos', () => {

    it('Deve cadastrar produto com sucesso', () => {

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

                expect(response.status)
                    .to.eq(201)

                expect(response.body.message)
                    .to.eq('Cadastro realizado com sucesso')

                expect(response.body._id)
                    .to.exist
            })
    });

    it('Não deve permitir cadastrar produto com nome já existente', () => {

        let usuario
        let token
        let produto

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

                produto = {
                    nome: `Produto ${Date.now()}`,
                    preco: 100,
                    descricao: 'Produto de teste',
                    quantidade: 10
                }

                return criarProduto(produto, token)
            })
            .then(() => {

                return criarProduto(
                    produto,
                    token,
                    false
                )
            })
            .then((response) => {

                expect(response.status).to.eq(400)

                expect(response.body.message)
                    .to.eq('Já existe produto com esse nome')
            })

    });

    it('Não deve permitir cadastrar produto sem token', () => {

        const produto = {
            nome: `Produto ${Date.now()}`,
            preco: 100,
            descricao: 'Produto de teste',
            quantidade: 10
        }

        criarProduto(
            produto,
            '',
            false
        )
            .then((response) => {

                expect(response.status).to.eq(401)

                expect(response.body.message)
                    .to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
    });

    it('Não deve permitir cadastrar produto com usuário não administrador', () => {

        let usuario

        cy.fixture('usuario').then((dadosUsuario) => {

            usuario = {
                ...dadosUsuario,
                email: `qa${Date.now()}@qa.com`,
                administrador: 'false'
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

                return criarProduto(
                    produto,
                    token,
                    false
                )
            })
            .then((response) => {

                expect(response.status).to.eq(403)

                expect(response.body.message)
                    .to.eq('Rota exclusiva para administradores')
            })
    });

    it('Não deve permitir cadastrar produto com token inválido', () => {

        const produto = {
            nome: `Produto ${Date.now()}`,
            preco: 100,
            descricao: 'Produto de teste',
            quantidade: 10
        }

        criarProduto(
            produto,
            'token inválido',
            false
        )
        .then((response) => {

            expect(response.status).to.eq(401)

            expect(response.body.message)
                .to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
        })
    });

});