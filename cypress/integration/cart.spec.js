///<reference types="Cypress" />

import { productsInfo, lastTwoProductIndices, checkoutText, adicionarProdutosAoCarrinho, clickInventoryButton, verifyProductInCart } from './dados'

describe('Página do Carrinho', () => {
    beforeEach(() => {
        cy.login("login", "user1")
    })

    // Descrição do conjunto de testes
    describe('Adição de dois produtos ao carrinho', () => {
        // Teste específico
        it('Deve adicionar os dois primeiros produtos ao carrinho e verificar suas informações', () => {
            clickInventoryButton(0)
            clickInventoryButton(1)
            cy.get('.shopping_cart_link').click()

            cy.get('.cart_item').should('have.length', 2).each((productElement, index) => {
                const productInfo = productsInfo[index];
                verifyProductInCart(productElement, productInfo.name, productInfo.price, productInfo.description, productInfo.quantity);
            })
        })
    })

    // Descrição do conjunto de testes
    describe('Adição de todos os itens ao carrinho', () => {
        // Teste específico
        it('Deve adicionar todos os itens da tela de produtos ao carrinho', () => {
            adicionarProdutosAoCarrinho()
            cy.get('.shopping_cart_link').should('have.text', productsInfo.length.toString())
            cy.get('.shopping_cart_link').click()

            cy.get('.cart_item').should('have.length', 6).each((productElement, index) => {
                const productInfo = productsInfo[index];
                verifyProductInCart(productElement, productInfo.name, productInfo.price, productInfo.description, productInfo.quantity)
            })
        })
    })

    describe('Remoção de um produto do carrinho', () => {
        it('Deve remover as informações do primeiro produto', () => {
            // Adicione os dois primeiros produtos ao carrinho
            cy.get('.btn_inventory').first().click() // Clica no botão "Adicionar ao Carrinho" do primeiro produto
            cy.get('.btn_inventory').eq(1).click()   // Clica no botão "Adicionar ao Carrinho" do segundo produto

            // Acesse a página do carrinho
            cy.get('.shopping_cart_link').click() // Clica no link do carrinho para ir à página de carrinho

            // Verifique os produtos no carrinho
            cy.get('.cart_item').should('have.length', 2).each((productElement, index) => {
                const productInfo = productsInfo[index];
                verifyProductInCart(productElement, productInfo.name, productInfo.price, productInfo.description, productInfo.quantity)
            })
            cy.contains('Remove').first().click()
            // Verifique se o produto foi removido do carrinho
            cy.get('.cart_item').should('have.length', 1)
        })
    })

    describe('Remoção de todos os produtos do carrinho', () => {
        it('Deve remover todos os produtos do carrinho e verificar se está vazio', () => {
            adicionarProdutosAoCarrinho() // Chama a função para adicionar produtos ao carrinho
            
            // Verifica se o elemento com a classe 'shopping_cart_link' possui o texto '6'
            cy.get('.shopping_cart_link').should('have.text', '6')

            // Acesse a página do carrinho
            cy.get('.shopping_cart_link').click() // Clica no link do carrinho para ir à página de carrinho

            // Verifique os produtos no carrinho
            // Verifica se o número de itens no carrinho é igual ao número de produtos na lista productsInfo
            cy.get('.cart_item').should('have.length', productsInfo.length).each((productElement, index) => {
                const productInfo = productsInfo[index];
                verifyProductInCart(productElement, productInfo.name, productInfo.price, productInfo.description, productInfo.quantity)
            })

            // Remove todos os produtos do carrinho
            cy.get('.cart_item').each((product, index) => {
                cy.wrap(product).contains('Remove').click()
            })

            // Verifique se todos os produtos foram removidos do carrinho
            cy.get('.cart_item').should('have.length', 0)
        })
    })
    describe('Funcionalidade "Continue Shopping"', () => {
        it('Deve adicionar os dois últimos produtos ao carrinho e redirecionar para a página de produtos', () => {
            lastTwoProductIndices.forEach(index => {
                clickInventoryButton(index)
            })
            cy.get('.shopping_cart_link').click()
            cy.contains(checkoutText).click()
            cy.url().should('include', '/checkout-step-one.html')
        })
    })

    describe('Verificar botão de checkout', () => {
        it('Deve adicionar os dois últimos produtos ao carrinho...', () => {
            lastTwoProductIndices.forEach(index => {
                clickInventoryButton(index)
            })
            cy.get('.shopping_cart_link').click()
            cy.contains(checkoutText).click()
            cy.url().should('include', '/checkout-step-one.html')
        })
    })
})