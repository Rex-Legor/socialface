import { login } from './utils.cy';

describe('Profile Page', () => {
  beforeEach(() => {
    login();
  });

  it('Should navigate to profile page', () => {
    cy.clock();

    cy.get('#openUserOptionsButton').click();
    cy.tick(500); // wait for dom to update

    cy.get(
      'body > sf-root > sf-feed > sf-header > header > div:nth-child(3) > div > div > ul > li:nth-child(1) > a',
    )
      .should('exist')
      .click();

    cy.waitUntil(() => cy.url().should('include', '/profile'));

    cy.get('.sf-profile__content__posts sf-post').should('have.length', 4);
    cy.get(
      'body > sf-root > sf-profile > div > section.sf-profile__container > div.sf-profile__content > div.sf-profile__content__posts > h3',
    ).should('contain.text', 'My posts');
  });
});
