import { criarProdutoValido } from '../factories/produtoFactory.js'
import { criarProduto } from '../services/produtosService.js'

export function criarProdutoComToken(token) {

    const produto = criarProdutoValido()

    return criarProduto(produto, token)
}
