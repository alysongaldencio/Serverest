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

// API COMMANDS



const apiUrl = Cypress.env('apiUrl') || 'https://serverest.dev'

const requestLogin = (user, failOnStatusCode = true) =>
cy.request({
  method: 'POST',
  url: `${apiUrl}/login`,
  body: { email: user.email, password: user.password },
  headers: { 'Content-Type': 'application/json' },
  failOnStatusCode,
})




Cypress.Commands.add('loginAPIValidUser', () =>
cy.fixture('data/users').then(({ validUser }) =>
  requestLogin(validUser).then((res) => {
    expect(res.status).to.eq(200)
    expect(res.body).to.have.property('authorization')
    return res.body.authorization
  })
)
)




Cypress.Commands.add('checkUserExists', (email) => {
const userService = new UserApiService()
return userService.checkUserExists(email)
})




Cypress.Commands.add('registerUser', (userData) => {
const userService = new UserApiService()
return userService.createUser(userData).then((res) => cy.wrap(res.body))
})




Cypress.Commands.add('ensureValidUserExists', () =>
cy.fixture('data/users').then(({ validUser }) =>
  cy.checkUserExists(validUser.email).then((exists) => {
    if (!exists) cy.registerUser(validUser)
    return cy.wrap({ message: 'Usuário garantido' })
  })
)
)




Cypress.Commands.add('ensureInvalidUserDoesNotExist', () =>
cy.fixture('data/users').then(({ invalidUser }) =>
  cy.checkUserExists(invalidUser.email).then((exists) => {
    if (exists) {
      // If the user exists, find the ID and delete it to ensure it's invalid
      const userService = new UserApiService()
      userService.findUserIdByEmail(invalidUser.email).then((userId) => {
        userService.deleteUser(userId)
        cy.log('"Invalid user removed from API to ensure valid test"')
      })
    } else {
      cy.log('Invalid user confirmed: does not exist in API')
    }
    return cy.wrap({ message: 'Invalid user guaranteed' })
  })
)
)




Cypress.Commands.add('authenticatedRequest', (method, endpoint, body = null) =>
cy.loginAPIValidUser().then((token) =>
  cy.request({
    method,
    url: `${apiUrl}${endpoint}`,
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body,
  })
)
)













