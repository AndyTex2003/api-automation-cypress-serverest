describe('ServeRest - Usuários', () => {
    it('Deve criar um usuário com sucesso', () => {
        const email = `qa${Date.now()}@mail.com`


        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                nome: "QA Test Cypress",
                email: email,
                password: '123456',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('_id')
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
        });
    });
});