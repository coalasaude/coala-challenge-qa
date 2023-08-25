///<reference types="Cypress" />

describe('Página de Informações de Usuario', function () {
    beforeEach(function () {
        cy.visit('https://www.saucedemo.com/')
    })

    it('', () => {
        cy.get('#first-name').type('Roberto')
        cy.get('#last-name').type('Silva')
        cy.get('#postal-code').type('60000-000')
        cy.contains('Checkout').click()
    })
})