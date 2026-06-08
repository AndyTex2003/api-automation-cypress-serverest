
export function realizarLogin(email, password) {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        body: {
            email,
            password
        }
    });
}