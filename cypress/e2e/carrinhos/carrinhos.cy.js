import { criarUsuario } from '../../services/usuariosService.js'
import { realizarLogin } from '../../services/loginService.js'
import { criarProduto } from '../../services/produtosService.js'
import {
    criarCarrinho,
    concluirCompra
} from '../../services/carrinhosService.js'
import { criarUsuarioAdmin } from '../../factories/usuarioFactory.js';
import { criarProdutoValido } from '../../factories/produtoFactory.js';

describe('ServeRest - Carrinhos', () => {    

    it('Deve cadastrar carrinho com sucesso', () => {  
        
            let token

            const usuario = criarUsuarioAdmin()

            return criarUsuario(usuario)
        
            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })            
            .then((response) => {

                token = response.body.authorization

                const produto = criarProdutoValido()

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
                
        let token
        let idProduto        

            const usuario = criarUsuarioAdmin()

            return criarUsuario(usuario)        

            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })            
            .then((response) => {

                token = response.body.authorization

                const produto = criarProdutoValido()

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

            const usuario = criarUsuarioAdmin()

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

    it('Não deve permitir cadastrar carrinho com token invalido', () => {        

            const usuario = criarUsuarioAdmin()

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
                    'token-invalido',
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
        
        let token        

            const usuario = criarUsuarioAdmin()

            return criarUsuario(usuario)        

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
        
        let token               

            const usuario = criarUsuarioAdmin()

            return criarUsuario(usuario)
        
            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                token = response.body.authorization                

                return criarProduto(
                    criarProdutoValido(), 
                    token
                )
            })
            .then((response) => {                

                return criarCarrinho(
                    [
                        {
                            idProduto: response.body._id,
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
        
        let token
        let idProduto        

            const usuario = criarUsuarioAdmin()

            return criarUsuario(usuario)
        

            .then(() => {

                return realizarLogin(
                    usuario.email,
                    usuario.password
                )
            })
            .then((response) => {

                token = response.body.authorization

                const produto = criarProdutoValido()

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