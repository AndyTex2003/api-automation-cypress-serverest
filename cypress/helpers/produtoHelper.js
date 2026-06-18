import { criarProdutoValido } from '../factories/produtoFactory.js'
import { criarProduto } from '../services/produtosService.js'
import { criarUsuarioELogin } from './authHelper.js'

export function criarProdutoComToken(token) {

    const produto = criarProdutoValido()

    return criarProduto(produto, token)
}

export function criarUsuarioLoginEProduto() {

    let token

    return criarUsuarioELogin()
        .then((response) => {

            token = response.body.authorization

            return criarProdutoComToken(token)
        })
        .then((response) => {

            return {                
                token,
                idProduto: response.body._id
            }
        })
}