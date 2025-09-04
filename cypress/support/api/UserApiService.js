import ApiClient from './ApiClient'

/**
 * UserApiService - Service for user operations
 * Contains business logic and test data generation
 * Does NOT depend on Page Objects - uses ApiClient directly
 */
class UserApiService {
  constructor() {
    this.apiClient = new ApiClient()
  }

  /**
   * Generate unique user for tests
   * @param {string} prefix - Prefix for name and email
   * @param {boolean} admin - Whether the user is an administrator
   * @returns {Object} User data
   */
  static generateUniqueUser(prefix = 'user', admin = false) {
    const timestamp = Date.now()
    return {
      nome: `${prefix} Teste`,
      email: `${prefix}.${timestamp}@exemplo.com`,
      password: '12345678',
      administrador: admin.toString()
    }
  }

  /**
   * Generate user for deletion
   * @param {string} prefix - Prefix for name and email
   * @returns {Object} User data
   */
  static generateUserForDeletion(prefix = 'delete') {
    return this.generateUniqueUser(prefix, false)
  }

  /**
   * Generate user for complete CRUD flow
   * @param {string} prefix - Prefix for name and email
   * @returns {Object} User data
   */
  static generateUserForCrudFlow(prefix = 'crud.completo') {
    return this.generateUniqueUser(prefix, false)
  }

  /**
   * Find user ID by email
   * @param {string} email - User email
   * @returns {Cypress.Chainable} User ID
   */
  findUserIdByEmail(email) {
    return this.apiClient.get('/usuarios').then((response) => {
      const user = response.body.usuarios.find(u => u.email === email)
      expect(user).to.not.be.undefined
      return user._id
    })
  }

  /**
   * Create user
   * @param {Object} userData - User data
   * @returns {Cypress.Chainable} Creation response
   */
  createUser(userData) {
    return this.apiClient.post('/usuarios', userData)
  }

  /**
   * List all users
   * @returns {Cypress.Chainable} List of users
   */
  getAllUsers() {
    return this.apiClient.get('/usuarios')
  }

  /**
   * Get user by email
   * @param {string} email - User email
   * @returns {Cypress.Chainable} Found user
   */
  getUserByEmail(email) {
    return this.apiClient.get('/usuarios', { qs: { email } })
  }

  /**
   * Update user
   * @param {string} userId - User ID
   * @param {Object} userData - New user data
   * @returns {Cypress.Chainable} Update response
   */
  updateUser(userId, userData) {
    return this.apiClient.authenticatedRequest('PUT', `/usuarios/${userId}`, userData)
  }

  /**
   * Delete user
   * @param {string} userId - User ID
   * @returns {Cypress.Chainable} Deletion response
   */
  deleteUser(userId) {
    return this.apiClient.authenticatedRequest('DELETE', `/usuarios/${userId}`)
  }

  /**
   * Check if user exists
   * @param {string} email - User email
   * @returns {Cypress.Chainable} Boolean indicating if exists
   */
  checkUserExists(email) {
    return this.getUserByEmail(email).then((response) => {
      return response.status === 200 && response.body.usuarios?.length > 0
    })
  }



  /**
   * Create updated user data
   * @param {Object} originalUser - Original user
   * @param {string} newName - New name
   * @returns {Object} Updated user data
   */
  static generateUpdatedUser(originalUser, newName = 'User updated CRUD') {
    return {
      ...originalUser,
      nome: newName,
      administrador: 'true'
    }
  }

  /**
   * Execute complete CRUD flow
   * @param {string} prefix - Prefix for test data
   * @returns {Cypress.Chainable} Flow result
   */
  performCrudFlow(prefix = 'crud') {
    const userData = UserApiService.generateUserForCrudFlow(prefix)
    let userId = null

    // CREATE
    return this.createUser(userData).then((createResponse) => {
      expect(createResponse.status).to.eq(201)
      
      // READ
      return this.findUserIdByEmail(userData.email)
    }).then((id) => {
      userId = id
      
      // UPDATE
      const updatedUser = UserApiService.generateUpdatedUser(userData, 'User CRUD Updated')
      return this.updateUser(userId, updatedUser)
    }).then((updateResponse) => {
      expect(updateResponse.status).to.eq(200)
      
      // DELETE
      return this.deleteUser(userId)
    }).then((deleteResponse) => {
      expect(deleteResponse.status).to.eq(200)
      
      // Verify if it was deleted
      return this.checkUserExists(userData.email).then((exists) => {
        expect(exists).to.be.false
        return { message: 'Complete CRUD flow executed successfully' }
      })
    })
  }
}

export default UserApiService