/// <reference types="cypress" />

describe('test form login', () => {
	beforeEach(()=> {
        cy.visit('/')
    })

	it('valid login', () => {
		cy.login("standard_user", "secret_sauce")
        // valida que fez o login e está no path correto.
        cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
	});

    it('incorret user and password', () => {
		cy.login("incorrectUser", "incorrectPass")
        // valida que não fez o login e está no path inicial.
        cy.url().should('eq', 'https://www.saucedemo.com/')
        // valida que exibe a mensagem correta de acordo com o erro
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
	});

    it('locked user', () => {
		cy.login("locked_out_user", "secret_sauce")
        // valida que não fez o login e está no path inicial.
        cy.url().should('eq', 'https://www.saucedemo.com/')
        // valida que exibe a mensagem correta de acordo com o erro
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
	});

    it('empty user', () => {
        cy.get('[id="password"]').type("secret_sauce")
        cy.get('[id="login-button"]').click()
        // valida que não fez o login e está no path inicial.
        cy.url().should('eq', 'https://www.saucedemo.com/')
        // valida que exibe a mensagem correta de acordo com o erro
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')
	});

    it('empty password', () => {
        cy.get('[id="user-name"]').type("standard_user")
        cy.get('[id="login-button"]').click()
        // valida que não fez o login e está no path inicial.
        cy.url().should('eq', 'https://www.saucedemo.com/')
        // valida que exibe a mensagem correta de acordo com o erro
        cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required')
	});
});