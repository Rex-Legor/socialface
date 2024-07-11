import { login } from './utils.cy';

describe('Feed Page', () => {
  beforeEach(() => {
    cy.viewport(1000, 600);
    login();
  });

  it('Should display first 5 posts', () => {
    cy.get('.sf-feed__content__posts sf-post').should('have.length', 5);
  });

  it('Should interact with the header', () => {
    // buttons should be visible since the default window resolution set by cypress is 1000x660
    cy.get('#openMenuButton').should('have.css', 'display', 'block');

    cy.get('#openFriendsButton').should('have.css', 'display', 'block');

    /** Checking open menu sidebar funcitonality */
    cy.get('[data-test-id="menu-sidebar"]').should(
      'have.css',
      'display',
      'none',
    );

    cy.get('#openMenuButton').click();

    cy.get('[data-test-id="menu-sidebar"]').should(
      'have.css',
      'display',
      'block',
    );

    cy.get('#openMenuButton').click();

    cy.get('[data-test-id="menu-sidebar"]').should(
      'have.css',
      'display',
      'none',
    );

    /** Checking open friends sidebar funcionality */
    cy.get('[data-test-id="friends-sidebar"]').should(
      'have.css',
      'display',
      'none',
    );

    cy.get('#openFriendsButton').click();

    cy.get('[data-test-id="friends-sidebar"]').should(
      'have.css',
      'display',
      'block',
    );

    cy.get('#openFriendsButton').click();

    cy.get('[data-test-id="friends-sidebar"]').should(
      'have.css',
      'display',
      'none',
    );

    /** Checking open user options functionality */
    cy.get('.sf-header__section__profile__options').should('not.exist');
    cy.get('#openUserOptionsButton').click();
    cy.get('.sf-header__section__profile__options').should('exist');

    /** Header buttons should get hidden when there's enough space to display menu and friends sidebars */

    cy.viewport(1280, 800);
    cy.get('#openMenuButton').should('have.css', 'display', 'none');
    cy.get('#openFriendsButton').should('have.css', 'display', 'none');

    cy.get('[data-test-id="menu-sidebar"]').should(
      'have.css',
      'display',
      'block',
    );

    cy.get('[data-test-id="friends-sidebar"]').should(
      'have.css',
      'display',
      'block',
    );
  });

  it('Should be able to like a post', () => {
    cy.get(
      '.sf-feed__content__posts sf-post:nth-child(1) .sf-post__footer__actions > button:nth-child(1)',
    ).should('have.css', 'color', 'rgb(128, 128, 128)');

    cy.get(
      '.sf-feed__content__posts sf-post:nth-child(1) .sf-post__footer__actions > button:nth-child(1)',
    ).click();

    cy.waitUntil(() =>
      cy
        .get(
          '.sf-feed__content__posts sf-post:nth-child(1) .sf-post__footer__actions > button:nth-child(1)',
        )
        .should('have.css', 'color', 'rgb(88, 174, 218)'),
    );
  });

  it('Should be able to comment a post', () => {
    cy.get(
      'body > sf-root > sf-feed > div > section.sf-feed__content > div > sf-post:nth-child(1) > div > div.sf-post__footer > div.sf-post__footer__comment > input',
    ).type('This is a comment');
    cy.get(
      'body > sf-root > sf-feed > div > section.sf-feed__content > div > sf-post:nth-child(1) > div > div.sf-post__footer > div.sf-post__footer__comment > button',
    ).click();
    cy.waitUntil(() =>
      cy
        .get(
          'body > sf-root > sf-feed > div > section.sf-feed__content > div > sf-post:nth-child(1) > div > div.sf-post__footer > div.sf-post__footer__comment_list > ul > li',
        )
        .should('exist')
        .should('contain.text', 'This is a comment'),
    );
  });
});
