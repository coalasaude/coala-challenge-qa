///<reference types="Cypress" />

// Definição das informações dos produtos em um array de objetos
const productsInfo = [
    { name: 'Sauce Labs Backpack', price: '$29.99', imageId: '#item_4_img_link', description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', cart: 'Add to cart' },
    { name: 'Sauce Labs Bike Light', price: '$9.99', imageId: '#item_0_img_link', description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", cart: 'Add to cart' },
    { name: 'Sauce Labs Bolt T-Shirt', price: '$15.99', imageId: '#item_1_img_link', description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', cart: 'Add to cart' },
    { name: 'Sauce Labs Fleece Jacket', price: '$49.99', imageId: '#item_5_img_link', description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", cart: 'Add to cart' },
    { name: 'Sauce Labs Onesie', price: '$7.99', imageId: '#item_2_img_link', description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", cart: 'Add to cart' },
    { name: 'Test.allTheThings() T-Shirt (Red)', price: '$15.99', imageId: '#item_3_img_link', description: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.", cart: 'Add to cart' }
]

// Início dos testes da página de produtos
describe('Página de Produtos', () => {

    // Executado antes de cada teste
    beforeEach(() => {
        // Realiza login com usuário "user1"
        cy.login("login", "user1")
    })

    // Teste: Verifica a quantidade de produtos na página
    describe('Verificação da quantidade de produtos na página', () => {
        it('Deve verificar a quantidade de produtos na página', () => {
            // Seleciona elementos com a classe '.inventory_item' e verifica o número de elementos
            cy.get('.inventory_list .inventory_item').should('have.length', 6)
        })
    })

    // Loop por cada informação de produto definida em productsInfo
    productsInfo.forEach((product) => {
        const { name, price, imageId, description, cart } = product

        // Teste: Verifica a exibição correta das informações de um produto
        describe(`Produto ${name}`, () => {
            it(`Deve exibir informações corretas do "${name}"`, () => {
                // Verifica se o nome, descrição, preço e imagem são exibidos corretamente
                cy.contains(name).should('be.visible')
                cy.contains(description).should('be.visible')
                cy.contains(price).should('be.visible')
                cy.get(`${imageId}`).should('be.visible')

                // Clica no link do produto e verifica se as informações estão corretas na página detalhada
                cy.get(`[alt="${name}"]`).click()
                cy.contains(name).should('be.visible')
                cy.contains(description).should('be.visible')
                cy.contains(price).should('be.visible')
                cy.get('.inventory_details_img').should('be.visible')

                // Clica no botão "Add to cart"
                cy.contains(cart).click()
            })
        })
    })

    // Descrição do conjunto de testes: Exibição de informações incorretas dos produtos
    describe('Exibição de informações incorretas dos produtos', () => {

        // Teste específico: Deve verificar a exibição de informações incorretas dos produtos após o login
        it('Deve verificar a exibição de informações incorretas dos produtos após o login', () => {

            // Faz o login com nome de usuário "user3"
            cy.login("login", "user3")

            // Lista de URLs esperadas das imagens dos produtos
            const expectedImageUrls = [
                '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg',
                '/static/media/bike-light-1200x1500.37c843b0.jpg',
                '/static/media/bolt-shirt-1200x1500.c2599ac5.jpg',
                '/static/media/sauce-pullover-1200x1500.51d7ffaf.jpg',
                '/static/media/red-onesie-1200x1500.2ec615b2.jpg',
                '/static/media/red-tatt-1200x1500.30dadef4.jpg'
            ]

            // Seleciona todos os elementos com a classe "inventory_item_img img" e verificações subsequentes
            cy.get('.inventory_item_img img').should('have.length', 6).each((image, index) => {

                // Obtém a URL da imagem atual
                const actualImageUrl = image.attr('src')

                // Obtém a URL esperada da imagem com base no índice
                const expectedImageUrl = expectedImageUrls[index]

                // Verifica se a imagem atual está visível
                cy.wrap(image).should('be.visible')

                // Verifica se a URL atual da imagem é igual à URL esperada
                expect(actualImageUrl).to.equal(expectedImageUrl)
            })
        })
    })

    describe('Adicionar todos os itens ao carrinho', () => {
        // Função que adiciona produtos ao carrinho
        function adicionarProdutosAoCarrinho() {
            cy.get('.btn_inventory').each((button) => {
                cy.wrap(button).click()
            })
        }
        it('Deve adicionar todos os itens da tela ao carrinho', () => {
            adicionarProdutosAoCarrinho()
            cy.get('.shopping_cart_link').should('have.text', '6')
        })
    })


    // Descrição do conjunto de testes: Remover todos os itens do Carrinho
    describe('Remover todos os itens do Carrinho', () => {

        // Teste específico: Deve remover todos os itens do carrinho
        it('Deve remover todos os itens do carrinho', () => {

            // Seleciona todos os elementos com a classe "btn_inventory" (botões de adicionar ao carrinho) e executa ação para cada botão
            cy.get('.btn_inventory').each((button) => {

                // Encapsula o botão em um objeto Cypress e simula um clique
                cy.wrap(button).click()
            })

            // Seleciona todos os elementos que têm atributos "data-test" começando com "remove-sauce-labs" (botões de remover produtos específicos) e executa ação para cada botão
            cy.get('[data-test^="remove-sauce-labs"]').each((removeButton) => {

                // Encapsula o botão de remoção em um objeto Cypress e simula um clique
                cy.wrap(removeButton).click()
            })

            // Simula um clique no botão de remoção de um produto específico (camiseta vermelha)
            cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()

            // Verifica se o elemento com o id "shopping_cart_container" está vazio
            cy.get('#shopping_cart_container').should('have.text', '')
        })
    })

    // Descrição do conjunto de testes: Filtro de Produtos
    describe('Filtro de Produtos', () => {

        // Teste específico: Deve filtrar os produtos por nome (A a Z)
        it('Deve filtrar os produtos por nome (A a Z)', () => {

            // Seleciona o elemento com o atributo "data-test" igual a "product_sort_container" e seleciona a opção 'az'
            cy.get('[data-test="product_sort_container"]').select('az')

            // Verifica se os produtos estão em ordem alfabética ascendente
            cy.get('.inventory_item_name').then($products => {

                // Cria um array de nomes de produtos a partir dos elementos encontrados
                const productNames = $products.map((_, el) => el.innerText)

                // Loop para comparar nomes de produtos consecutivos e verificar se estão em ordem alfabética correta
                for (let i = 1; i < productNames.length; i++) {

                    // Compara os nomes de produtos usando a função "localeCompare" para considerar a ordem alfabética
                    const result = productNames[i - 1].localeCompare(productNames[i], 'en', { sensitivity: 'base' })

                    // Verifica se o resultado da comparação é menor que 0 (ou seja, o nome anterior deve vir antes do nome atual na ordem alfabética)
                    expect(result).to.be.lessThan(0, `Produto ${productNames[i - 1]} deveria vir antes de ${productNames[i]}`)
                }
            })
        })


        // Teste específico: Deve filtrar os produtos por nome (Z a A)
        it('Deve filtrar os produtos por nome (Z a A)', () => {

            // Seleciona o elemento com o atributo "data-test" igual a "product_sort_container" e seleciona a opção 'za'
            cy.get('[data-test="product_sort_container"]').select('za')

            // Verifica se os produtos estão em ordem alfabética descendente
            cy.get('.inventory_item_name').then($products => {

                // Cria um array de nomes de produtos a partir dos elementos encontrados
                const productNames = $products.map((_, el) => el.innerText)

                // Loop para comparar nomes de produtos consecutivos e verificar se estão em ordem alfabética correta
                for (let i = 1; i < productNames.length; i++) {

                    // Compara os nomes de produtos usando a função "localeCompare" para considerar a ordem alfabética
                    const result = productNames[i].localeCompare(productNames[i - 1], 'en', { sensitivity: 'base' })

                    // Verifica se o resultado da comparação é menor que 0 (ou seja, o nome atual deve vir antes do nome anterior na ordem alfabética descendente)
                    expect(result).to.be.lessThan(0, `Produto ${productNames[i]} deveria vir antes de ${productNames[i - 1]}`)
                }
            })
        })

        // Teste específico: Deve filtrar os produtos por preço (baixo a alto)
        it('Deve filtrar os produtos por preço (baixo a alto)', () => {

            // Seleciona o elemento com o atributo "data-test" igual a "product_sort_container" e seleciona a opção 'lohi' (low to high)
            cy.get('[data-test="product_sort_container"]').select('lohi')

            // Verifica se os preços dos produtos estão em ordem crescente ou igual
            cy.get('.inventory_item_price').then($prices => {

                // Cria um array de preços de produtos a partir dos elementos encontrados
                const productPrices = $prices.map((_, el) => parseFloat(el.innerText.replace('$', '')))

                // Loop para comparar preços de produtos consecutivos e verificar se estão em ordem crescente ou igual
                for (let i = 1; i < productPrices.length; i++) {

                    // Verifica se o preço atual é maior ou igual ao preço anterior
                    expect(productPrices[i]).to.be.at.least(productPrices[i - 1], `O preço de ${productPrices[i]} deveria ser maior ou igual a ${productPrices[i - 1]}`)
                }
            })
        })


        // Teste específico: Deve filtrar os produtos por preço (alto a baixo)
        it('Deve filtrar os produtos por preço (alto a baixo)', () => {

            // Seleciona o elemento com o atributo "data-test" igual a "product_sort_container" e seleciona a opção 'hilo' (high to low)
            cy.get('[data-test="product_sort_container"]').select('hilo')

            // Verifica se os preços dos produtos estão em ordem decrescente
            cy.get('.inventory_item_price').then($prices => {

                // Cria um array de preços de produtos a partir dos elementos encontrados
                const productPrices = $prices.map((_, el) => parseFloat(el.innerText.replace('$', '')))

                // Loop para comparar preços de produtos consecutivos e verificar se estão em ordem decrescente
                for (let i = 1; i < productPrices.length; i++) {

                    // Verifica se o preço atual é menor ou igual ao preço anterior
                    expect(productPrices[i]).to.be.at.most(productPrices[i - 1], `O preço de ${productPrices[i]} deveria ser menor ou igual a ${productPrices[i - 1]}`)
                }
            })
        })

    })
})  