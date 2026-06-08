import { criarUsuario } from "../../services/usuariosService.js";
import { realizarLogin } from "../../services/loginService.js";


describe('ServeRest - Login', () => {

  it('Deve criar usuário e fazer login com sucesso', () => {

    const usuario = {
      nome: 'QA Test',
      email: `qa${Date.now()}@qa.com`,
      password: '123456',
      administrador: 'true'
    }

    criarUsuario(usuario)
      .then(() =>
        realizarLogin(
          usuario.email,
          usuario.password
        )
      )
      .then((response) => {

        expect(response.status).to.eq(200)

        expect(response.body)
          .to.have.property('authorization')

        expect(response.body.message)
          .to.eq('Login realizado com sucesso')

      });

  });

});