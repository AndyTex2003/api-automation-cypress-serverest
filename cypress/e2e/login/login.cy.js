describe('ServeRest - Login', () => {

  it('Deve criar usuário e fazer login com sucesso', () => {

    const email = `qa${Date.now()}@qa.com`

    // 1. Criar usuário
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/usuarios',
      body: {
        nome: 'QA Test',
        email: email,
        password: '123456',
        administrador: 'true'
      }
    }).then(() => {

      // 2. Fazer login com o mesmo usuário
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
          email: email,
          password: '123456'
        }
      }).then((response) => {

        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('authorization')
        expect(response.body.message).to.eq('Login realizado com sucesso')

        cy.log(response.body.authorization)

      });

    });

  });

});