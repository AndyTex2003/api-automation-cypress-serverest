
export function realizarLogin(
    email, 
    password,
    failOnStatusCode = true
) {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/login',
        failOnStatusCode,
        body: {
            email,
            password
        }
    });
}