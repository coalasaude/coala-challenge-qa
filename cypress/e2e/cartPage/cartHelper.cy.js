/// <reference types="cypress" />

import {faker} from '@faker-js/faker';

// gera dados aleátorios para uso no formulário
const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const zipCode = faker.address.zipCode()

// função para preenchimento do formulário de finalização da venda
function FillCheckout(){
    cy.get('[id="first-name"]').type(firstName)
    cy.get('[id="last-name"]').type(lastName)
    cy.get('[id="postal-code"]').type(zipCode)
}

export {FillCheckout};