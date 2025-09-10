# Serverest - Automated Tests with Cypress

Automated tests for the [Serverest](https://front.serverest.dev) application using Cypress, including E2E login tests and CRUD operations via API.

## 🚀 Features

- **E2E Tests**: Login interface with field validations and error messages
- **API Tests**: Complete user CRUD operations (Create, Read, Update, Delete)
- **Page Object Model**: Organized selectors and interface actions
- **Service Layer**: Specialized services for API operations

## 📋 Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## 🎯 Usage

### Run all tests
```bash
npm run cy:run
```

### Open Cypress interface
```bash
npm run cy:open
```

### Run specific tests
```bash
# UI tests only
npm run test:login

# API tests only
npm run test:users
```

## 📁 Project Structure

```
cypress/
├── e2e/
│   ├── login-ui/
│   │   └── login.cy.js             # Interface tests
│   └── users-api/
│       └── users.cy.js             # API tests
├── support/
│   ├── api/
│   │   ├── ApiClient.js           # HTTP client
│   │   └── UserApiService.js      # User service
│   ├── pages/
│   │   └── LoginPage.js           # Page Object
│   └── commands.js                # Custom commands
└── fixtures/
    └── data/users.json            # Test data
```

## 🧪 Available Commands

### E2E
- `cy.loginUiValidUser()` - Login with valid user
- `cy.loginUiInvalidUser()` - Login with invalid user
- `cy.loginUiEmptyEmail()` - Test with empty email
- `cy.loginUiEmptyPassword()` - Test with empty password

### API
- `cy.loginAPIValidUser()` - API login (returns token)
- `cy.authenticatedRequest()` - Authenticated request
- `cy.registerUser()` - Create user
- `cy.checkUserExists()` - Check if user exists

## 📝 Usage Examples

### E2E Test
```javascript
it('Should log in with valid credentials', () => {
  cy.loginUiValidUser()
  cy.url().should('not.include', '/login')
})
```

### API Test
```javascript
it('Should create a new user', () => {
  const newUser = UserApiService.generateUniqueUser('test')
  cy.registerUser(newUser).then((response) => {
    expect(response.message).to.include('sucesso')
  })
})
```

## ⚙️ Configuration

The project uses the following configurations:

- **Base URL**: https://front.serverest.dev
- **API URL**: https://serverest.dev
- **Viewport**: 1280x720

## 📊 Test Data

Test data is located in `cypress/fixtures/data/users.json`:

```json
{
  "validUser": {
    "nome": "Usuário Teste",
    "email": "alyson114@gmail.com",
    "password": "12345678",
    "administrador": "true"
  },
  "invalidUser": {
    "email": "invalid@teste.com",
    "password": "passworderror"
  }
}
```

## 🔧 NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run cy:open` | Open Cypress interface |
| `npm run cy:run` | Run all tests |
| `npm run test:login` | Run login E2E tests only |
| `npm run test:users` | Run users CRUD tests only |

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Serverest API](https://serverest.dev/)
- [Cypress API Testing](https://docs.cypress.io/guides/guides/network-requests)

## 👨‍💻 Author

**Alyson Galdencio**

---

⭐ If this project was helpful, consider giving it a star!

---

# Serverest - Testes Automatizados com Cypress

Testes automatizados para a aplicação [Serverest](https://front.serverest.dev) usando Cypress, incluindo testes E2E de login e operações CRUD via API.

## 🚀 Funcionalidades

- **Testes E2E**: Login na interface com validações de campos e mensagens de erro
- **Testes API**: Operações CRUD completas de usuários (Create, Read, Update, Delete)
- **Page Object Model**: Organização dos seletores e ações da interface
- **Service Layer**: Serviços especializados para operações de API

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🛠️ Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>

# Instale as dependências
npm install
```

## 🎯 Como usar

### Executar todos os testes
```bash
npm run cy:run
```

### Abrir interface do Cypress
```bash
npm run cy:open
```

### Executar testes específicos
```bash
# Apenas testes UI
npm run test:login

# Apenas testes API
npm run test:users
```

## 📁 Estrutura do Projeto

```
cypress/
├── e2e/
│   ├── login-ui/
│   │   └── login.cy.js             # Testes de interface
│   └── users-api/
│       └── users.cy.js             # Testes de API
├── support/
│   ├── api/
│   │   ├── ApiClient.js           # Cliente HTTP
│   │   └── UserApiService.js      # Serviço de usuários
│   ├── pages/
│   │   └── LoginPage.js           # Page Object
│   └── commands.js                # Comandos personalizados
└── fixtures/
    └── data/users.json            # Dados de teste
```

## 🧪 Comandos Disponíveis

### E2E
- `cy.loginUiValidUser()` - Login com usuário válido
- `cy.loginUiInvalidUser()` - Login com usuário inválido
- `cy.loginUiEmptyEmail()` - Teste com email vazio
- `cy.loginUiEmptyPassword()` - Teste com senha vazia

### API
- `cy.loginAPIValidUser()` - Login via API (retorna token)
- `cy.authenticatedRequest()` - Requisição autenticada
- `cy.registerUser()` - Criar usuário
- `cy.checkUserExists()` - Verificar se usuário existe

## 📝 Exemplo de Uso

### Teste E2E
```javascript
it('Should log in with valid credentials', () => {
  cy.loginUiValidUser()
  cy.url().should('not.include', '/login')
})
```

### Teste API
```javascript
it('Should create a new user', () => {
  const newUser = UserApiService.generateUniqueUser('test')
  cy.registerUser(newUser).then((response) => {
    expect(response.message).to.include('sucesso')
  })
})
```

## ⚙️ Configuração

O projeto usa as seguintes configurações:

- **Base URL**: https://front.serverest.dev
- **API URL**: https://serverest.dev
- **Viewport**: 1280x720


## 📊 Dados de Teste

Os dados de teste estão em `cypress/fixtures/data/users.json`:

```json
{
  "validUser": {
    "nome": "Usuário Teste",
    "email": "alyson114@gmail.com",
    "password": "12345678",
    "administrador": "true"
  },
  "invalidUser": {
    "email": "invalid@teste.com",
    "password": "passworderror"
  }
}
```

## 🔧 Scripts NPM

| Script | Descrição |
|--------|-----------|
| `npm run cy:open` | Abre interface do Cypress |
| `npm run cy:run` | Executa todos os testes |
| `npm run test:login` | Executa apenas testes E2E de login |
| `npm run test:users` | Executa apenas testes CRUD de usuários |

## 📚 Recursos

- [Documentação do Cypress](https://docs.cypress.io/)
- [Serverest API](https://serverest.dev/)
- [Cypress API Testing](https://docs.cypress.io/guides/guides/network-requests)

## 👨‍💻 Autor

**Alyson Galdencio**

---

⭐ Se este projeto foi útil, considere dar uma estrela!