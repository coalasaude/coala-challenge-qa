///<reference types="Cypress" />

import { userScenarios } from './dados'

// Descreve o conjunto de testes relacionados à Página de Login
describe('Página de Login', function () {
  // Antes de cada teste, visita a página de login
  beforeEach(() => {
    cy.visit(Cypress.env('links').login)
  })

  // Itera sobre cada cenário de teste de login
  userScenarios.forEach(({ user, expectedErrorMessage, description }) => {
    // Descreve o teste específico para o cenário atual
    it(`Deve ${expectedErrorMessage ? "exibir mensagem de erro" : "permitir que o usuário faça login"
      } com usuário ${user}: ${description}`, () => {
        // Realiza o login com o usuário atual
        cy.login("login", user)

        // Verifica se há uma mensagem de erro visível, se esperado
        if (expectedErrorMessage) {
          cy.get('.error-message-container')
            .should('be.visible')
            .should('have.text', expectedErrorMessage)
        } else {
          // Verifica se o usuário foi redirecionado para a página de produtos
          cy.url().should('include', '/inventory.html')
        }
      })
  })

  // Descreve o conjunto de testes relacionados a problemas na conta do usuário
  describe('Usuário com problemas na conta', () => {
    // Teste para verificar se um usuário com informações incorretas dos produtos consegue fazer login
    it('Deve verificar se um usuário com informações incorretas dos produtos consegue fazer login', () => {
      cy.login("login", "user3")
    })

    // Descreve o conjunto de testes relacionados a problemas de performance do usuário
    describe('Usuário com problemas de perfomance', () => {
      // Teste para verificar a lentidão ao logar no sistema
      it('Deve verificar a lentidão ao logar no sistema', () => {
        cy.login("login", "user4")

        // Mede o tempo de início da execução do teste
        const startTime = performance.now()

        // Procura a classe que contém a lista de produtos e verifica se é visível
        cy.get('.inventory_list').should('be.visible').then(() => {
          // Mede o tempo de término da execução do teste
          const endTime = performance.now()
          // Calcula o tempo total de carregamento da página
          const pageLoadTime = endTime - startTime
          // Exibe uma mensagem no console com o tempo de carregamento formatado
          cy.log(`Tempo de carregamento da página: ${pageLoadTime.toFixed(2)}ms`)
        })
      })
    })
  })
})