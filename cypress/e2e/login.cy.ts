/// <reference types="cypress" />

describe('Login Page', () => {
  it('should render the login form', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('[data-testid="username"]').should('be.visible');
    cy.get('[data-testid="password"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  it('should login successfully', () => {
    let sendResponse;
    const trigger = new Promise((resolve) => {
      sendResponse = resolve;
    });

    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/login', (request) => {
      return trigger.then(() => {
        request.reply();
      });
    });

    cy.visit('http://localhost:5173/login');

    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="loading-indicator"]').should('be.visible');
    cy.get('[data-testid="login-button"]')
      .should('be.disabled')
      .should('contain.text', 'Iniciando Sesion')
      .then(() => sendResponse());
  });
});
