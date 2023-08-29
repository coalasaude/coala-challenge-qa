/// <reference types="cypress" />


function addProduct(){
    cy.get('[id="add-to-cart-sauce-labs-bike-light"]').click()
    // valida que o produto foi adicionado corretamente ao carrinho.
    cy.get('[id="remove-sauce-labs-bike-light"]').should('be.visible')     
}

function addMultipleProducts(){
    cy.get('[id="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[id="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[id="remove-sauce-labs-bike-light"]').should('be.visible')     
    cy.get('[id="remove-sauce-labs-backpack"]').should('be.visible')   
}

export {addProduct};
export {addMultipleProducts};