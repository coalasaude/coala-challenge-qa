/// <reference types="cypress" />

import * as productHelper from '../inventoryPage/InventoryHelper.cy'

import * as cartHelper from './cartHelper.cy'

describe('test form cart', () => {
	beforeEach(()=> {
        cy.visit('/')
        cy.login("standard_user", "secret_sauce")
    })

    it('go to the cart page', () => {
        productHelper.addProduct()
        cy.get('[class="shopping_cart_link"]').click()
        // valida que está no path do carrinho
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
	});

    it('remove product from the cart', () => {
        productHelper.addProduct()
        cy.get('[class="shopping_cart_link"]').click()
        // remove produto do carrinho
        cy.get('[class="btn btn_secondary btn_small cart_button"]').click()
        // valida que não existe nenhum produto no carrinho
        cy.get('[class="cart_item_label"]').should('not.exist')
	});

    it('checkout the sale', () => {
        productHelper.addProduct()
        cy.get('[class="shopping_cart_link"]').click()
        cy.get('[id="checkout"]').click()
        // preenche dados no formulário
        cartHelper.FillCheckout()
        cy.get('[id="continue"]').click()
        cy.get('[id="finish"]').click()
        // valida que concluiu a venda com sucesso.
        cy.get('[class="title"]').should('have.text', 'Checkout: Complete!')
	});

    it('checkout the sale empty form', () => {
        productHelper.addProduct()
        cy.get('[class="shopping_cart_link"]').click()
        cy.get('[id="checkout"]').click()
        cy.get('[id="continue"]').click()
        // valida que não prosseguiu com a venda.
        cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required')
	});

    it('checkout the sale empty first name', () => {
        productHelper.addProduct()
        cy.get('[class="shopping_cart_link"]').click()
        cy.get('[id="checkout"]').click()
        cy.get('[id="last-name"]').type('lastName')
        cy.get('[id="postal-code"]').type('123456')
        cy.get('[id="continue"]').click()
        // valida que o primeiro nome é obrigatório
        cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required')
	});

    it('checkout the sale empty last name', () => {
        productHelper.addProduct()
        cy.get('[class="shopping_cart_link"]').click()
        cy.get('[id="checkout"]').click()
        cy.get('[id="first-name"]').type('firstName')
        cy.get('[id="postal-code"]').type('123456')
        cy.get('[id="continue"]').click()
        // valida que o último nome é obrigatório
        cy.get('[data-test="error"]').should('have.text', 'Error: Last Name is required')
	});

    it('checkout the sale empty zip code', () => {
        productHelper.addProduct()
        cy.get('[class="shopping_cart_link"]').click()
        cy.get('[id="checkout"]').click()
        cy.get('[id="first-name"]').type('firstName')
        cy.get('[id="last-name"]').type('lastName')
        cy.get('[id="continue"]').click()
        // valida que o código postal é obrigatório
        cy.get('[data-test="error"]').should('have.text', 'Error: Postal Code is required')
	});

});