///<reference types="Cypress" />

import { productsInfo, adicionarProdutosAoCarrinho, acessarPaginaCheckout, verifyProductInCart } from './dados'

describe('Página de Overview', function () {
    const usuario = Cypress.env('users').user_checkout;

    beforeEach(() => {
        cy.login("login", "user1")
    })

    // Descrição do conjunto de testes
    describe('Exibição dos Mesmos Produtos no Carrinho e na Página de Overview', () => {
        it('Deve exibir os mesmos produtos que estão no carrinho', () => {
            adicionarProdutosAoCarrinho()
            acessarPaginaCheckout()

            cy.get('#first-name').type(usuario.nome)
            cy.get('#last-name').type(usuario.sobrenome)
            cy.get('#postal-code').type(usuario.caixaPostal)
            cy.contains('Continue').click()

            // Verifique se você foi redirecionado de volta para a página de 
            cy.url().should('include', '/checkout-step-two.html')

            cy.get('.cart_item').should('have.length', productsInfo.length).each((productElement, index) => {
                const productInfo = productsInfo[index];
                verifyProductInCart(productElement, productInfo.name, productInfo.price, productInfo.description, productInfo.quantity);

                expect(productInfo.name).to.equal(productsInfo[index].name)
                expect(productInfo.description).to.equal(productsInfo[index].description)
                expect(productInfo.price).to.equal(productsInfo[index].price)
                expect(productInfo.quantity.toString()).to.equal(productsInfo[index].quantity.toString())
            })
            cy.get('.summary_info').should('be.visible').should('contain', 'Payment Information')
            cy.get('.summary_info').should('be.visible').should('contain', 'SauceCard #31337')
            cy.get('.summary_info').should('be.visible').should('contain', 'Shipping Information')
            cy.get('.summary_info').should('be.visible').should('contain', 'Free Pony Express Delivery!')
            cy.get('.summary_info').should('be.visible').should('contain', 'Price Total')

            cy.get('.summary_info').then((produtoOverview) => {
                // Extrai o texto do Item total, da Taxa e do Valor Total
                const textoItemTotal = produtoOverview.find('.summary_subtotal_label').text()
                const textoTaxa = produtoOverview.find('.summary_tax_label').text()
                const textoValorTotal = produtoOverview.find('.summary_total_label').text()

                // Extrai os valores numéricos dos textos
                const valorItemTotal = parseFloat(textoItemTotal.replace('Item total: $', ''))
                const valorTaxaExibida = parseFloat(textoTaxa.replace('Tax: $', ''))
                const valorTotalExibido = parseFloat(textoValorTotal.replace('Total: $', ''))

                // Calcula a taxa como 8% do valor do item total
                const taxaCalculada = (valorItemTotal * 0.08).toFixed(2) // Calcula 8% e arredonda para 2 casas decimais

                // Calcula o valor total somando o item total e a taxa
                const valorTotalCalculado = valorItemTotal + parseFloat(taxaCalculada)

                // Verifica se a taxa calculada corresponde ao valor exibido na tela
                expect(valorTaxaExibida).to.equal(parseFloat(taxaCalculada))

                // Verifica se o valor total calculado corresponde ao valor exibido na tela
                expect(valorTotalExibido).to.equal(valorTotalCalculado)

                cy.contains("Finish").click()

                // Verifique se você foi redirecionado de volta para a página de produtos
                cy.url().should('include', '/checkout-complete.html')

                cy.contains('Thank you for your order!').should('be.visible')
                cy.contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!').should('be.visible')
                cy.get('.pony_express').should('be.visible')
                cy.get('#back-to-products')
                    .should('be.visible')
                    .click()
                // Verifique se você foi redirecionado de volta para a página de produtos
                cy.url().should('include', '/inventory.html')
            })
        })
    })
})