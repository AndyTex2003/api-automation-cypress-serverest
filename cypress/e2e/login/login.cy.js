import { criarUsuario } from "../../services/usuariosService.js";
import { realizarLogin } from "../../services/loginService.js";


describe('ServeRest - Login', () => {

  it('Deve criar usuário e fazer login com sucesso', () => {

    cy.fixture('usuario').then((dadosUsuario) => {

      const usuario = {
        ...dadosUsuario,
        email: `qa${Date.now()}@qa.com`
      }

      criarUsuario(usuario)
        .then(() => realizarLogin(usuario.email, usuario.password))
        .then((response) => {

          expect(response.status).to.eq(200)

          expect(response.body)
            .to.have.property('authorization')

          expect(response.body.message)
            .to.eq('Login realizado com sucesso')
        });

    });

  });

});