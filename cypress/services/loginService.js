
export function realizarLogin(
    email, 
    password,
    failOnStatusCode = true
) {
    return cy.request({
        method: 'POST',
        url: '/login',
        failOnStatusCode,
        body: {
            email,
            password
        }
    });
}
