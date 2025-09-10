import LoginPage from '../../support/pages/LoginPage'

describe('Login UI Tests - Serverest', () => {

  // Valid login
  it('Should log in with valid credentials', () => {
    cy.loginUiValidUser()
    cy.url().should('not.include', '/login')
    cy.log('Login bem-sucedido')
  })

  // Invalid login
  it('Should display errors with invalid credentials', () => {
    cy.ensureInvalidUserDoesNotExist()
    cy.loginUiInvalidUser()
    cy.get('.alert span').should('be.visible')
    const loginPage = new LoginPage()
    loginPage.checkLoginError('Email e/ou senha inválidos')
  })

  // Email blank
  it('Should display an alert when the email is blank', () => {
    cy.loginUiEmptyEmail()
    cy.get('.alert span').should('be.visible')
    const loginPage = new LoginPage()
    loginPage.checkLoginError('Email é obrigatório')
  })

  // Password blank
  it('Should display an alert when the password is blank', () => {
    cy.loginUiEmptyPassword()
    cy.get('.alert span').should('be.visible')
    const loginPage = new LoginPage()
    loginPage.checkLoginError('Password é obrigatório')
  })
  
})