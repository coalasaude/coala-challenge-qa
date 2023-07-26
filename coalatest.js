/// <reference types="Cypress" />

const { cyanBright } = require("colorette")

describe('Teste para Desafio Coala', function() 
{
 
it('Fluxo de compra',function() {
    var sc=0
    //Acessando o domínio da página de Teste. 
    cy.intercept('**').as('requests')
    cy.visit('https://www.saucedemo.com/')
    //Assegurando que o domínio visitado é o intencionado.
    cy.url().should('include','https://www.saucedemo.com/')
    //Teste de usuário inválido
    cy.get('[data-test="username"]').type('abc')
    cy.get('[data-test="password"]').type('abc')
    cy.get('[data-test="login-button"]').click()
    //Mensagem de erro deve surgir
    cy.get('[data-test="error"]').should('be.visible')
    //Página deve continuar sendo a mesma.
    cy.url().should('include','https://www.saucedemo.com/')
    //Mensagem de teste finalizado.
    cy.log('Teste de senha: Passou.')
    //Teste de usuário válido
    //Acessando o domínio da página de Teste. 
    cy.intercept('**').as('requests')
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.screenshot()
    sc += 1
    cy.log('Screenshot de prova ',sc)
    cy.get('[data-test="login-button"]').click()
    cy.wait(1000)
    cy.url().should('include','inventory.html')
    cy.log('Acessando a loja online.')
//=================================================================================//
    var q1 = 0
    cy.log('Teste de itens')
    //Adicionando todos os itens disponíveis na página
        cy.get('.inventory_item').find('.pricebar').each(($el, index, $list) => {
        const botaoadicionar = $el.text()
        if(botaoadicionar.includes("Add")){
            $el.find('button').click()
            q1 = q1 + 1
            cy.log(q1)
        }
    }).then(() =>{
    //Verificando que o carrinho exibe a mesma quantidade de itens
    cy.get('.shopping_cart_badge').invoke('text').should('eq', q1.toString());
    //Acessando a página de checkout
    cy.get('.shopping_cart_link').click()
    //Confirmando que a nova página é a intencionada
    cy.url().should('include','cart.html')
    //Confirmando que a página de checkout possui a mesma quantidade de itens
    cy.get('.cart_list').find('.cart_item').should('have.length',q1)
    //Finalizando compra
    sc += 1
    cy.log('Screenshot de prova ',sc)
    cy.get('[data-test="checkout"]').click()
    })
//=================================================================================//
    //Verificando página 1 de checkout
    cy.log('Checkout')
    cy.url().should('include','checkout-step-one')
    //Verificando que a página não prossiga sem todos os campos preenchidos
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('.error-message-container').invoke('text').should('contain','First Name')
    cy.get('[data-test="firstName"]').type('a')
    cy.get('[data-test="continue"]').click()
    cy.get('.error-message-container').invoke('text').should('contain','Last Name')
    cy.get('[data-test="lastName"]').type('a')
    cy.get('[data-test="continue"]').click()
    cy.get('.error-message-container').invoke('text').should('contain','Postal Code')
    cy.get('[data-test="postalCode"]').type('a')
    sc += 1
    cy.log('Screenshot de prova ',sc)
    cy.get('[data-test="continue"]').click()
    //Verificando que a página prosseguiu após o preechimento de todos os campos
    cy.url().should('include','checkout-step-two')
//================================================================================//
    //Verificando página 2 de checkout
    //Somando o preço final de antemão
    var q2 = 0.0
    cy.get('.cart_list').find('.cart_item').each(($el, index, $list) => {
        const precoString = $el.find('div.inventory_item_price').text()
        const precoFloat = parseFloat(precoString.replace('$', '')) 
        q2 += precoFloat   
        cy.log('Preço final sem a taxa deve ser: ',q2)
}).then(() =>{
    const taxa = 10.40
    q2 += taxa
    //Validando que o preço final bate
    cy.get('.summary_total_label').invoke('text').should('contain',q2)
})
sc += 1
cy.log('Screenshot de prova ',sc)
cy.get('[data-test="finish"]').click()
//=======================================================================================//
    //Verificando página final de checkout
    cy.url().should('contain','/checkout-complete.')
    sc += 1
    cy.log('Screenshot de prova ',sc)
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('contain','inventory.html') 
}
)
}
)
