/// <reference types="cypress" />

import * as productHelper from './InventoryHelper.cy'

describe('test form inventory', () => {
	beforeEach(()=> {
        cy.visit('/')
        cy.login("standard_user", "secret_sauce")
    })

    it('add specific product in the cart', () => {
        productHelper.addProduct()
        // valida de que só existe esse produto no carrinho.
        cy.get('[class="shopping_cart_badge"]').should('have.text', '1')
	});

    it('remove specific product in the cart', () => {
		productHelper.addProduct()    
        // remove o produto
        cy.get('[id="remove-sauce-labs-bike-light"]').click()
        // valida que o produto foi removido
        cy.get('[id="add-to-cart-sauce-labs-bike-light"]').should('be.visible')  
	});

    it('add multiple products in the cart', () => {
		productHelper.addMultipleProducts()     
        // valida que foram adicionados os produtos ao carrinho.
        cy.get('[class="shopping_cart_badge"]').should('have.text', '2')
	});
});