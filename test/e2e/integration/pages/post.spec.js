import Chance from "chance";

const chance = new Chance();

describe('Post page', () => {
  beforeEach(() => {
    cy.visit('/blog');
    cy.wait(500);
    cy.get('#post-feed').find('.post-preview-card').eq(chance.integer({min: 0, max: 9})).contains('Continue reading').click();
  });

  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows the post card', () => {
    cy.get('#post-card').should('be.visible');
  });

  it('shows the post title, feature image, and meta data', () => {
    cy.get('#post-title').should('be.visible');
    cy.get('#post-metadata').should('be.visible');
    cy.get('#post-feature-image').should('be.visible');
  });
  
  it('shows the post content', () => {
    cy.get('#post-content').should('be.visible');
  });
});