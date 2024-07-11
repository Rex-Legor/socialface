import { login } from './utils.cy';

describe('Authentication Pages', () => {
  it('Should NOT be able to navigate to feed, profile or settings before authenticating', () => {
    cy.clock();
    cy.visit('/feed');
    cy.tick(500);
    cy.url().should('include', '/login');
    cy.visit('/profile');
    cy.tick(500);
    cy.url().should('include', '/login');
    cy.visit('/settings');
    cy.tick(500);
    cy.url().should('include', '/login');
  });

  it('Should signup', () => {
    cy.clock();
    cy.visit('/signup');
    cy.waitUntil(() => cy.url().should('include', '/signup'));

    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > div:nth-child(2) > input',
    ).type('Rex');
    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > div:nth-child(3) > input',
    ).type('Legorreta');
    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > div:nth-child(4) > input',
    ).type('test@mail.com');
    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > div.sf-input.sf-datepicker > input',
    ).type('1993-02-20');

    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > div.sf-input.sf-autocomplete > span',
    ).should('not.exist'); // span error should not be visible

    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > button.sf-button.primary',
    ).click();
    cy.tick(500); // wait a few seconds assuming an api call could have been made
    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > div.sf-input.sf-autocomplete > span',
    ).should('exist');
    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > div.sf-input.sf-autocomplete > input',
    ).type('Mexico');
    cy.get(
      'body > sf-root > sf-signup > div > div:nth-child(1) > form > button.sf-button.primary',
    ).click();

    cy.waitUntil(() => cy.url().should('include', '/feed'));
  });

  it('Should reset password', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3000/auth/reset-password',
    }).as('resetPassword');

    cy.visit('/forgot-password');
    cy.waitUntil(() => cy.url().should('include', '/forgot-password'));

    /** assert with invalid email */
    cy.get(
      'body > sf-root > sf-forgot-password > div > div:nth-child(1) > form > div.sf-input > input',
    ).type('nonexistingmail@mail.com');
    cy.get(
      'body > sf-root > sf-forgot-password > div > div:nth-child(1) > form > button',
    ).click();

    cy.wait('@resetPassword').then(({ response }) => {
      assert.strictEqual(response?.statusCode, 400);
    });

    /** assert with valid email */
    cy.get(
      'body > sf-root > sf-forgot-password > div > div:nth-child(1) > form > span',
    ).should('have.text', "This email doesn't exist");

    cy.get(
      'body > sf-root > sf-forgot-password > div > div:nth-child(1) > form > div.sf-input > input',
    ).clear();
    cy.get(
      'body > sf-root > sf-forgot-password > div > div:nth-child(1) > form > div.sf-input > input',
    ).type('rex@mail.com');

    cy.get(
      'body > sf-root > sf-forgot-password > div > div:nth-child(1) > form > button',
    ).click();

    cy.wait('@resetPassword').then(({ response }) => {
      assert.equal(response?.statusCode, 200);
    });

    cy.get(
      'body > sf-root > sf-forgot-password > div > div:nth-child(1) > form > span',
    ).should('have.text', 'We sent the reset instructions to your email');
  });

  it('Should login and then logout', () => {
    login();
    cy.get('#openUserOptionsButton').click();
    cy.get(
      'sf-header > header > div:nth-child(3) > div > div > ul > li:nth-child(3) > a',
    ).click();

    cy.waitUntil(() => cy.url().should('include', '/login'));
  });
});
