/// <reference types="cypress" />

import {faker} from '@faker-js/faker';

const firstName = faker.person.firstName()
const lastName = faker.person.lastName()
const zipCode = faker.address.zipCode()

function FillCheckout(){
    cy.get('[id="first-name"]').type(firstName)
    cy.get('[id="last-name"]').type(lastName)
    cy.get('[id="postal-code"]').type(zipCode)
}

export {FillCheckout};