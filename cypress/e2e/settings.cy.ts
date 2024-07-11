import { login } from './utils.cy';

describe('Settings Page', () => {
  beforeEach(() => {
    login();
  });

  it('Should navigate to settings page and update settings', () => {
    cy.clock();
    cy.get('#openUserOptionsButton').click();
    cy.get(
      'body > sf-root > sf-feed > sf-header > header > div:nth-child(3) > div > div > ul > li:nth-child(2) > a',
    )
      .should('exist')
      .click();

    cy.waitUntil(() => cy.url().should('include', '/settings'));

    cy.get(
      'body > sf-root > sf-settings > div > div > form > div:nth-child(4) > input',
    )
      .should('have.value', '')
      .type('4521832497');
    cy.get(
      'body > sf-root > sf-settings > div > div > form > div.sf-settings__buttons > button.sf-button.primary',
    ).click();

    cy.get('.sf-span.sf-span__success')
      .should('exist')
      .should('have.text', 'Changes saved successfully');

    cy.tick(2500);

    cy.get('.sf-span.sf-span__success').should('not.exist');
  });
});
