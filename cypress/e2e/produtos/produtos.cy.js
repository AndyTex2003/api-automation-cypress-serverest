import { criarUsuarioAdmin } from '../../factories/usuarioFactory.js'
import { criarProdutoValido } from '../../factories/produtoFactory.js';
import { criarUsuario } from '../../services/usuariosService.js'
import { realizarLogin } from '../../services/loginService.js'
import { criarProduto } from '../../services/produtosService.js'
import { criarUsuarioELogin } from '../../helpers/authHelper.js';

describe('ServeRest - Produtos', () => {

    it('Deve cadastrar produto com sucesso', () => {        

        return criarUsuarioELogin()
            
            .then((response) => {

                const token = response.body.authorization

                const produto = criarProdutoValido()

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

        let token
        let produto

        return criarUsuarioELogin()

            .then((response) => {

                token = response.body.authorization

                produto = criarProdutoValido()

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

        const produto = criarProdutoValido()

        return criarProduto(
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

        const usuario = {
            ...criarUsuarioAdmin(),
            administrador: 'false'
        }

        return criarUsuario(usuario)

            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                const token = response.body.authorization

                const produto = criarProdutoValido()

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

        const produto = criarProdutoValido()

        return criarProduto(
            produto,
            'token invalido',
            false
        )
            .then((response) => {

                expect(response.status).to.eq(401)

                expect(response.body.message)
                    .to.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
            })
    });

});