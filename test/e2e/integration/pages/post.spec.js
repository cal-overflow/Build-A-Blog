import Chance from "chance";

const chance = new Chance();


describe('Post page', () => {
  let postCount = 0;

  before(() => {
    cy.visit('/blog');
    cy.wait(500);
    
    cy.get('body').then(($body) => {
      if ($body.text().includes('No posts have been written')) {
        postCount = 0;
      }
      else {
        cy.wait(1000); // ensure there's enough time to fetch content
        cy.get('#post-feed').find('.post-preview-card').its('length').then((length) => {
          postCount = length;
        });
      }
    });
  });

  beforeEach(() => {
    if (postCount > 0) {
      cy.visit('/blog');
      cy.wait(500);
      cy.get('#post-feed').find('.post-preview-card').eq(chance.integer({ min: 0, max: (postCount - 1) })).contains('Continue reading').click();
    }
    else cy.log('Cannot test post page since no posts exist. Skipping test');
  });
  
  it('shows the menu and footer bar', () => {
    if (postCount > 0) {
      cy.get('#nav-bar').should('be.visible');
      cy.get('#footer-bar').scrollIntoView({duration: 500 });
      cy.get('#footer-bar').should('be.visible');
    }
  });

  it('shows the post card', () => {
    if (postCount > 0) {
      cy.get('#post-card').should('be.visible');
    }
  });
  
  it('shows the post title, feature image, and meta data', () => {
    if (postCount > 0) {
      cy.get('#post-title').should('be.visible');
      cy.get('#post-metadata').should('be.visible');
      cy.get('#post-feature-image').should('be.visible');
    }
  });
  
  it('shows the post content', () => {
    if (postCount > 0) {
      cy.get('#post-content').should('be.visible');
    }
  });
});
