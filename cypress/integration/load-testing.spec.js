describe('Teste de Carga na Página de Login', () => {
    it('Acessa a página de login várias vezes', () => {
      // Repita o loop 50 vezes (simulando 50 acessos concorrentes)
      for (let i = 0; i < 50; i++) {
        // Acesse a página de login
        cy.visit('https://www.saucedemo.com/')
  
        // Preencha os campos e faça login
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()

        // Espere por um tempo para simular o carregamento da página
        cy.wait(1000) // Aguarde 1 segundo
      }
    })
  })
  