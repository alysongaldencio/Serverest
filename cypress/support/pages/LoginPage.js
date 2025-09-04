class LoginPage {
  // Elements 
  elements = {
    emailInput: () => cy.get('input[type="email"]'),
    passwordInput: () => cy.get('input[type="password"]'),
    loginButton: () => cy.get('button[type="submit"]')
  }

  // Actions
  visit() {
    cy.visit('/login', { timeout: 30000 })
    cy.url().should('include', '/login')
    this.elements.emailInput().should('be.visible')
    this.elements.passwordInput().should('be.visible')
    this.elements.loginButton().should('be.visible')
  }

  fillEmail(email) {
    this.elements.emailInput().clear()
    if (email) {
      this.elements.emailInput().type(email)
    }
  }

  fillPassword(password) {
    this.elements.passwordInput().clear()
    if (password) {
      this.elements.passwordInput().type(password)
    }
  }

  clickLoginButton() {
    this.elements.loginButton().click()
  }

  login(email, password) {
    this.fillEmail(email)
    this.fillPassword(password)
    this.clickLoginButton()
  }

  // Methods for login using JSON data
  loginValidUser() {
    cy.fixture('data/users').then((usersData) => {
      this.login(usersData.validUser.email, usersData.validUser.password)
    })
  }

  loginInvalidUser() {
    cy.fixture('data/users').then((usersData) => {
      this.login(usersData.invalidUser.email, usersData.invalidUser.password)
    })
  }

  loginEmptyEmail() {
    cy.fixture('data/users').then((usersData) => {
      this.login('', usersData.validUser.password)
    })
  }

  loginEmptyPassword() {
    cy.fixture('data/users').then((usersData) => {
      this.login(usersData.validUser.email, '')
    })
  }

  // Additional validation to ensure that the page is fully loaded
  validatePageLoaded() {
    cy.url().should('include', '/login')
    this.elements.emailInput().should('be.visible').and('be.enabled')
    this.elements.passwordInput().should('be.visible').and('be.enabled')
    this.elements.loginButton().should('be.visible').and('be.enabled')
    cy.log(' Página de login carregada e elementos validados')
  }

  checkLoginError(message) {
    cy.url().should('include', '/login')
    cy.get('.alert span').should('contain', message)
  }


}

export default LoginPage
