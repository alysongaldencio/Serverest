import UserApiService from '../../../support/api/UserApiService'

describe('API Tests - Serverest', () => {
  
  let userApiService

  beforeEach(() => {
    userApiService = new UserApiService()
    cy.fixture('data/users').as('usersData')
    cy.ensureValidUserExists()
  })

  // Create user with registerUser
  it('Should create a new user using registerUser command', function() {
    const newUser = UserApiService.generateUniqueUser('crud', true)
    
    cy.registerUser(newUser).then((response) => {
      expect(response.message).to.include('sucesso')
      cy.checkUserExists(newUser.email).should('be.true')
    })
  })

  // List all users
  it('Should list all users using authenticatedRequest', function() {
    cy.authenticatedRequest('GET', '/usuarios').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.usuarios.length).to.be.greaterThan(0)
      const testUser = response.body.usuarios.find(u => u.email === this.usersData.validUser.email)
      expect(testUser).to.exist
    })
  })

  // Update valid user
  it('Should update user data using authenticatedRequest', function() {
    userApiService.findUserIdByEmail(this.usersData.validUser.email).then((userId) => {
      const updatedUser = UserApiService.generateUpdatedUser(this.usersData.validUser, 'Usuário Atualizado CRUD')
      
      cy.authenticatedRequest('PUT', `/usuarios/${userId}`, updatedUser).then((response) => {
        expect(response.status).to.eq(200)
      })
      
      cy.authenticatedRequest('GET', `/usuarios/${userId}`).its('body.nome').should('eq', updatedUser.nome)
    })
  })

  // Delete valid user
  it('Should delete a user using authenticatedRequest', () => {
    const userToDelete = UserApiService.generateUserForDeletion('delete')
    
    cy.authenticatedRequest('POST', '/usuarios', userToDelete).then(() => {
      userApiService.findUserIdByEmail(userToDelete.email).then((userId) => {
        cy.authenticatedRequest('DELETE', `/usuarios/${userId}`).then((response) => {
          expect(response.status).to.eq(200)
        })
        cy.checkUserExists(userToDelete.email).should('be.false')
      })
    })
  })

  // Complete CRUD flow using Service
  it('Should perform complete CRUD operations in sequence using Service', () => {
    userApiService.performCrudFlow('crud.completo').then((result) => {
      expect(result.message).to.include('Complete CRUD flow executed successfully')
    })
  })
})