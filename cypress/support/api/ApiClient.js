/**
 * ApiClient - HTTP requests abstraction layer
 * Responsible for encapsulating all API operations
 */
class ApiClient {
  constructor() {
    this.baseUrl = Cypress.env('apiUrl') || 'https://serverest.dev'
  }

  /**
   * Execute generic HTTP request
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Cypress.Chainable} Request response
   */
  request(method, endpoint, options = {}) {
    const config = {
      method,
      url: `${this.baseUrl}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      failOnStatusCode: false,
      ...options
    }

    return cy.request(config)
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Cypress.Chainable} Request response
   */
  get(endpoint, options = {}) {
    return this.request('GET', endpoint, options)
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} body - Request body
   * @param {Object} options - Request options
   * @returns {Cypress.Chainable} Request response
   */
  post(endpoint, body = null, options = {}) {
    return this.request('POST', endpoint, { body, ...options })
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} body - Request body
   * @param {Object} options - Request options
   * @returns {Cypress.Chainable} Request response
   */
  put(endpoint, body = null, options = {}) {
    return this.request('PUT', endpoint, { body, ...options })
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Cypress.Chainable} Request response
   */
  delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, options)
  }

  /**
   * Authenticated request
   * @param {string} method - HTTP method
   * @param {string} endpoint - API endpoint
   * @param {Object} body - Request body
   * @param {Object} options - Request options
   * @returns {Cypress.Chainable} Request response
   */
  authenticatedRequest(method, endpoint, body = null, options = {}) {
    return cy.loginAPIValidUser().then((token) => {
      return this.request(method, endpoint, {
        body,
        headers: { Authorization: token },
        ...options
      })
    })
  }
}

export default ApiClient
