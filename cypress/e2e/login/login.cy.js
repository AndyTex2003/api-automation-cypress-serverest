import { criarUsuario } from "../../services/usuariosService.js";
import { realizarLogin } from "../../services/loginService.js";
import { criarUsuarioAdmin } from "../../factories/usuarioFactory.js";

describe('ServeRest - Login', () => {

  it('Deve criar usuário e fazer login com sucesso', () => {    

      const usuario = criarUsuarioAdmin()

      return criarUsuario(usuario)
        .then(() => realizarLogin(usuario.email, usuario.password))
        .then((response) => {

          expect(response.status).to.eq(200)

          expect(response.body)
            .to.have.property('authorization')

          expect(response.body.message)
            .to.eq('Login realizado com sucesso')
        });    

  });

  it("Deve retornar erro ao realizar login com senha inválida", () => {    

      const usuario = criarUsuarioAdmin()

      return criarUsuario(usuario)
        .then(() => realizarLogin(usuario.email, 'senhaInvalida', false))
        .then((response) => {

          expect(response.status).to.eq(401)          

          expect(response.body.message)
            .to.eq('Email e/ou senha inválidos')
        });    
    
  });

  it('Deve retornar erro ao realizar login com usuário inexistente', () => {

    return realizarLogin(
      'inexistente@qa.com',
      '123456',
      false
    )
      .then((response) => {

        expect(response.status).to.eq(401)

        expect(response.body.message)
          .to.eq('Email e/ou senha inválidos')
      });
  });

  it('Deve retornar erro ao realizar login sem e-mail', () => {

    return cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false,
      body: {
        password: '123456'
      }
    })
      .then((response) => {

        expect(response.status).to.eq(400)

        expect(response.body.email)
          .to.eq('email é obrigatório')

      });

  });

  it('Deve retornar erro ao realizar login sem senha', () => {

    return cy.request({
      method: 'POST',
      url: '/login',
      failOnStatusCode: false,
      body: {
        email: 'fulano@qa.com'
      }
    })
      .then((response) => {

        expect(response.status).to.eq(400)

        expect(response.body.password)
          .to.eq('password é obrigatório')

      });

  });

});
