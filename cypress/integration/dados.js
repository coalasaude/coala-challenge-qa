//CONSTANTES

export const productsInfo = [
    { name: 'Sauce Labs Backpack', price: '$29.99', imageId: '#item_4_img_link', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', cart: 'Add to cart', quantity: '1' },
    { name: 'Sauce Labs Bike Light', price: '$9.99', imageId: '#item_0_img_link', description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", cart: 'Add to cart', quantity: '1' },
    { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', imageId: '#item_1_img_link', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', cart: 'Add to cart', quantity: '1' },
    { name: 'Sauce Labs Fleece Jacket', price: '$49.99', imageId: '#item_5_img_link', description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", cart: 'Add to cart', quantity: '1' },
    { name: 'Sauce Labs Onesie', price: '$7.99', imageId: '#item_2_img_link', description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", cart: 'Add to cart', quantity: '1' },
    { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', imageId: '#item_3_img_link', description: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.", cart: 'Add to cart', quantity: '1' }
]

export const userScenarios = [
    // Usuário loga com sucesso
    { user: "user1", expectedErrorMessage: "", description: "Usuário loga com sucesso" },
    // Tenta logar sem usuário
    { user: "user5", expectedErrorMessage: "Epic sadface: Username is required", description: "Tenta logar sem usuário" },
    // Tenta logar sem senha
    { user: "user6", expectedErrorMessage: "Epic sadface: Password is required", description: "Tenta logar sem senha" },
    // Tenta logar com credenciais inválidas
    { user: "user7", expectedErrorMessage: "Epic sadface: Username and password do not match any user in this service", description: "Tenta logar com credenciais inválidas" },
    // Usuário bloqueado tenta logar
    { user: "user2", expectedErrorMessage: "Epic sadface: Sorry, this user has been locked out.", description: "Usuário bloqueado tenta logar" }
  ]

 // Lista de URLs esperadas das imagens dos produtos
 export const expectedImageUrls = [
    '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg',
    '/static/media/bike-light-1200x1500.37c843b0.jpg',
    '/static/media/bolt-shirt-1200x1500.c2599ac5.jpg',
    '/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg',
    '/static/media/red-onesie-1200x1500.2ec615b2.jpg',
    '/static/media/red-tatt-1200x1500.30dadef4.jpg'
]

export const lastTwoProductIndices = [productsInfo.length - 2, productsInfo.length - 1]

export const checkoutText = 'Checkout'

export const clickInventoryButton = (index) => {
    cy.get('.btn_inventory').eq(index).click();
}

//FUNÇÕES

export function verifyProductInCart(productElement, productName, productPrice, productDescription, productQuantity) {
    cy.wrap(productElement).contains(productName).should('be.visible');
    cy.wrap(productElement).contains(productPrice).should('be.visible');
    cy.wrap(productElement).contains(productDescription).should('be.visible');
    cy.wrap(productElement).find('.cart_quantity').should('be.visible').should('have.text', productQuantity.toString());
}

export function adicionarProdutosAoCarrinho() {
    productsInfo.forEach((product, index) => {
        cy.get('.btn_inventory').eq(index).click();
    });
}

export function acessarPaginaCheckout() {
    cy.get('.shopping_cart_link').click()
    cy.contains('Checkout').click()
}