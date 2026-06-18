import { criarUsuarioAdmin } from '../factories/usuarioFactory.js'
import { criarUsuario } from '../services/usuariosService.js'
import { realizarLogin } from '../services/loginService.js'

export function criarUsuarioELogin() {

    const usuario = criarUsuarioAdmin()

    return criarUsuario(usuario)
        .then(() => {

            return realizarLogin(
                usuario.email,
                usuario.password
            )
        });
}