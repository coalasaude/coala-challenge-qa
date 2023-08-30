///<reference types="Cypress" />

import { productsInfo, adicionarProdutosAoCarrinho, acessarPaginaCheckout } from './dados'

describe('Página de Informações de Usuario', function () {
    beforeEach(() => {
        // Realiza login com usuário "user1"
        cy.login("login", "user1")
    })

    const usuario = Cypress.env('users').user_checkout;

    describe('Processo de Checkout', () => {
        it('Deve completar o checkout com sucesso', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()

            cy.get('#first-name').type(usuario.nome)
            cy.get('#last-name').type(usuario.sobrenome)
            cy.get('#postal-code').type(usuario.caixaPostal)
            cy.contains('Continue').click()

            cy.url().should('include', '/checkout-step-two.html')
        })
    })

    describe('Checkout - Sem Nome de Usuário', () => {
        it('Deve exibir uma mensagem de erro ao tentar fazer o checkout sem um nome de usuário', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()
            cy.get('#last-name').type(usuario.sobrenome)
            cy.get('#postal-code').type(usuario.caixaPostal)
            cy.contains('Continue').click()
            cy.get('.error-message-container').should('be.visible').should('have.text', 'Error: First Name is required')
            // Verificar se a ação de checkout não foi concluída devido ao erro
            cy.get('.checkout-success-message').should('not.exist');
        })
    })

    describe('Checkout - Sem Sobrenome de Usuário', () => {
        it('Deve exibir uma mensagem de erro ao tentar fazer checkout sem preencher o sobrenome', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()

            cy.get('#first-name').type(usuario.nome)
            cy.get('#postal-code').type(usuario.caixaPostal)
            cy.contains('Continue').click()
            cy.get('.error-message-container').should('be.visible').should('have.text', 'Error: Last Name is required')

            // Verificar se a ação de checkout não foi concluída devido ao erro
            cy.get('.checkout-success-message').should('not.exist');
        })
    })

    describe('Checkout - Sem Caixa Postal', function () {
        it('Deve exibir uma mensagem de erro ao tentar fazer checkout sem preencher a caixa postal', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()

            cy.get('#first-name').type(usuario.nome)
            cy.get('#last-name').type(usuario.sobrenome)

            cy.contains('Continue').click()
            cy.get('.error-message-container').should('be.visible').should('have.text', 'Error: Postal Code is required')
            // Verificar se a ação de checkout não foi concluída devido ao erro
            cy.get('.checkout-success-message').should('not.exist');
        })
    })
    describe('Checkout - Caixa Postal', function () {
        it('Deve aceitar letras na caixa postal', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()

            cy.get('#first-name').type(usuario.nome)
            cy.get('#last-name').type(usuario.sobrenome)
            cy.get('#postal-code').type('SW1A 1AA')

            cy.contains('Continue').click()
            cy.url().should('include', '/checkout-step-two.html')
        })
    })

    describe('Formulário com campos obrigatórios', () => {
        it('Deve exibir erro ao submeter com campos vazios', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()

            cy.contains('Continue').click()
            cy.get('.error-message-container').should('be.visible').should('have.text', 'Error: First Name is required')
            // Verificar se a ação de checkout não foi concluída devido ao erro
            cy.get('.checkout-success-message').should('not.exist')
        })
    })

    describe('Funcionalidade do Botão de Cancelar no Checkout', () => {
        it('Deve redirecionar para a página carrinho ao clicar em cancelar', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()

            cy.get('#first-name').type(usuario.nome)
            cy.get('#last-name').type(usuario.sobrenome)
            cy.get('#postal-code').type(usuario.caixaPostal)
            cy.contains('Cancel').click()

            cy.url().should('include', '/cart.html')
        })
    })
})
