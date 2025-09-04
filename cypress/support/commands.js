// COMMANDS

import LoginPage from './pages/LoginPage'
import UserApiService from './api/UserApiService'

// UI COMMANDS 

const loginUi = (action) => {
  const page = new LoginPage()
  page.visit() 
  page.validatePageLoaded() 
  page[action]()
}

Cypress.Commands.add('loginUiValidUser', () => {
  cy.ensureValidUserExists().then(() => {
    const page = new LoginPage()
    page.visit() 
    page.validatePageLoaded() 
    page.loginValidUser()
  })
})

Cypress.Commands.add('loginUiInvalidUser', () => loginUi('loginInvalidUser'))
Cypress.Commands.add('loginUiEmptyEmail', () => loginUi('loginEmptyEmail'))
Cypress.Commands.add('loginUiEmptyPassword', () => loginUi('loginEmptyPassword'))

