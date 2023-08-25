///<reference types="Cypress" />

describe('Página de Login', function () {
  beforeEach(function () {
    cy.visit('https://www.saucedemo.com/')
  })

  describe('Login com sucesso', () => {
    it('Deve permitir que o usuário faça login com sucesso', () => {
      cy.get('#user-name').type('standard_user')
      cy.get('#password').type('secret_sauce')
      cy.contains('Login').click()
    })
  })

  describe('Login sem usuário', () => {
    it('Deve exibir mensagem de erro ao tentar fazer login sem usuário', () => {
      cy.get('#user-name').clear() // Deixa o campo de usuário vazio
      cy.get('#password').type('secret_sauce')
      cy.contains('Login').click()
      cy.get('.error-message-container')
        .should('be.visible') // Verifica se o elemento está visível
        .should('have.text', 'Epic sadface: Username is required') // Verifica o texto da mensagem de erro
    })
  })

  describe('Login sem senha', () => {
    it('Deve exibir mensagem de erro ao tentar fazer login sem senha', () => {
      cy.get('#user-name').type('standard_user')
      cy.get('#password').clear()
      cy.contains('Login').click()
      cy.get('.error-message-container')
        .should('be.visible') // Verifica se o elemento está visível
        .should('have.text', 'Epic sadface: Password is required') // Verifica o texto da mensagem de erro
    })
  })

  describe('Credenciais inválidas', () => {
    it('Deve exibir mensagem de erro ao usar credenciais inválidas', () => {
      cy.get('#user-name').type('standard_usera')
      cy.get('#password').type('secret_sauce')
      cy.contains('Login').click()
      cy.get('.error-message-container')
        .should('be.visible') // Verifica se o elemento está visível
        .should('have.text', 'Epic sadface: Username and password do not match any user in this service') // Verifica o texto da mensagem de erro
    })
  })
})