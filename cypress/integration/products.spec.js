describe('Página de Produtos', () => {
    before(() => {
        cy.login("login","user1")
    });

    describe('Verificação da quantidade de produtos na página', () => {
        it('Deve verificar a quantidade de produtos na página', () => {
            cy.get('.inventory_list .inventory_item').should('have.length', 6)
        })
    })

    describe('Produto Sauce Labs Backpack', () => {
        it('Deve exibir informações corretas do "Sauce Labs Backpack"', () => {
            cy.contains('Sauce Labs Backpack').should('be.visible')
            cy.contains('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.').should('be.visible'); // Verifica se a descrição está visível
            cy.contains('$29.99').should('be.visible')
            cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price').should('contain', '$29.99')
            cy.get('#item_4_img_link').should('be.visible')
        })
    })

    describe('Produto Sauce Labs Bike Light', () => {
        it('Deve exibir informações corretas do "Sauce Labs Bike Light"', () => {
            cy.contains('Sauce Labs Bike Light').should('be.visible')
            cy.contains("A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.").should('be.visible'); // Verifica se a descrição está visível
            cy.contains('$9.99').should('be.visible')
            cy.get(':nth-child(2) > .inventory_item_description > .pricebar > .inventory_item_price').should('contain', '$9.99')
            cy.get('#item_0_img_link').should('be.visible')
        })
    })

    describe('Produto Sauce Labs Bolt T-Shirt', () => {
        it('Deve exibir informações corretas do "Sauce Labs Bolt T-Shirt"', () => {
            cy.contains('Sauce Labs Bolt T-Shirt').should('be.visible')
            cy.contains("Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.").should('be.visible'); // Verifica se a descrição está visível
            cy.contains('$15.99').should('be.visible')
            cy.get(':nth-child(3) > .inventory_item_description > .pricebar > .inventory_item_price').should('contain', '$15.99')
            cy.get('#item_1_img_link').should('be.visible')
        })
    })

    describe('Produto Sauce Labs Fleece Jacket', () => {
        it('Deve exibir informações corretas do "Sauce Labs Fleece Jacket"', () => {
            cy.contains('Sauce Labs Fleece Jacket').should('be.visible')
            cy.contains("It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.").should('be.visible'); // Verifica se a descrição está visível
            cy.contains('$49.99').should('be.visible')
            cy.get(':nth-child(4) > .inventory_item_description > .pricebar > .inventory_item_price').should('contain', '$49.99')
            cy.get('#item_5_img_link').should('be.visible')
        })
    })

    describe('Produto Sauce Labs Onesie', () => {
        it('Deve exibir informações corretas do "Sauce Labs Onesie"', () => {
            cy.contains('Sauce Labs Onesie').should('be.visible')
            cy.contains("Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.").should('be.visible'); // Verifica se a descrição está visível
            cy.contains('$7.99').should('be.visible')
            cy.get(':nth-child(5) > .inventory_item_description > .pricebar > .inventory_item_price').should('contain', '$7.99')
            cy.get('#item_2_img_link').should('be.visible')
        })
    })

    describe('Produto Test.allTheThings() T-Shirt (Red)', () => {
        it('Deve exibir informações corretas do "Test.allTheThings() T-Shirt (Red)"', () => {
            cy.contains('Test.allTheThings() T-Shirt (Red)').should('be.visible')
            cy.contains("This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.").should('be.visible'); // Verifica se a descrição está visível
            cy.contains('$15.99').should('be.visible')
            cy.get(':nth-child(6) > .inventory_item_description > .pricebar > .inventory_item_price').should('contain', '$15.99')
            cy.get('#item_3_img_link').should('be.visible')
        })
    })
})

