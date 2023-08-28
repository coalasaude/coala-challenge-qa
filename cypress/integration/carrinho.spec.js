describe('Página do Carrinho', () => {
    before(() => {
        cy.login("login", "user1")
    })

    describe('Adição do Produto Sauce Labs Backpack no carrinho', () => {
        it('Deve exibir informações corretas do "Sauce Labs Backpack"', () => {
            cy.contains('Sauce Labs Backpack').should('be.visible')
            cy.contains('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.').should('be.visible')
            cy.contains('$29.99').should('be.visible')
            cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').should('contain', '$29.99')
            cy.get('#item_4_img_link').should('be.visible')
            cy.get("#add-to-cart-sauce-labs-backpack")
                .should('be.visible')
                .click()
            cy.get("#shopping_cart_container")
                .should('be.visible')
                .click()
            cy.contains("QTY").should('be.visible')
            cy.contains("Description").should('be.visible')
            cy.get(".cart_quantity").should('have.length', 1).should('be.visible')
            cy.contains('Sauce Labs Backpack').should('be.visible')
            cy.contains('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.').should('be.visible')
        })
    })
    //Adição de todos os produtos

    describe('Remoção do Produto Sauce Labs Backpack no carrinho', () => {
        it('Deve remover as informações do Sauce Labs Backpack', () => {
            cy.contains('Remove')
            .should('be.visible')
            .click()
            // como validar que esta sem produtos?
        })
    })

    //Verificar se o carrinho é atualizado corretamente após adicionar um produto.
    //Verificar se os preços exibidos na página correspondem aos preços reais dos produtos.
    //Verificar se os valores no carrinho são calculados corretamente com base nos produtos adicionados.
})