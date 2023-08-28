// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("login", (requiredEnv, requiredUser) => {
    const links = Cypress.env('links');
    const loginUrl = links.login;
    const link = links[requiredEnv];

    cy.visit(loginUrl);

    const users = Cypress.env('users')
    const user = users[requiredUser]

    const username = user.username
    const password = user.password

    if (username !== undefined && username !== null && username !== "") {
        cy.get('#user-name')
            .should('be.visible')
            .type(username);
    }

    if (password !== undefined && password !== null && password !== "") {
        cy.get('#password')
            .should('be.visible')
            .type(password);
    }

    cy.contains('Login')
        .should('be.visible')
        .click();
})



//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
