export const login = () => {
  const email = Cypress.env('EMAIL');
  const password = Cypress.env('PASSWORD');
  cy.visit('/');
  cy.waitUntil(() => cy.url().should('include', '/login'), {
    timeout: 5000,
  });
  cy.get(
    'body > sf-root > sf-login > div > div:nth-child(2) > form > div:nth-child(2) > input',
  ).type(email);
  cy.get(
    'body > sf-root > sf-login > div > div:nth-child(2) > form > div:nth-child(3) > input',
  ).type(password);
  cy.get(
    'body > sf-root > sf-login > div > div:nth-child(2) > form > button.sf-button.primary',
  ).click();
  cy.waitUntil(() => cy.url().should('include', '/feed'), {
    timeout: 5000,
  });
};
