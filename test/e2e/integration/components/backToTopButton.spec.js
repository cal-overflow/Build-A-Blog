describe('Back to Top button', () => {
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
    cy.visit('/blog');
    cy.wait(500);
  });
  
  it('is invisible at the top of the page', () => {
    cy.get('#back-to-top-button').should('not.be.visible');
  });

  describe('after scrolling down the page', () => {
    beforeEach(() => {
      if (postCount > 10) {
        cy.get('#footer-bar').scrollIntoView({duration: 500 });
      }
      else cy.log('Not enough posts to test backToTopButton on. Skipping test');
    });

    it('is visible', () => {
      if (postCount > 10) {
        cy.wait(500);
        cy.get('#back-to-top-button').should('be.visible');
      }
    });

    describe('clicking the button', () => {
      beforeEach(() => {
        if (postCount > 10) {
          cy.wait(500);
          cy.get('#back-to-top-button').click();
        }
      });

      it('scrolls to the top of the page after click', () => {
        if (postCount > 0) {
          cy.get('#nav-bar').should('be.visible');
          cy.window().its('scrollY').should('equal', 0);
        }
      });

      it('is invisible again', () => {
        if (postCount > 0) {
          cy.get('#back-to-top-button').should('not.be.visible');
        }
      });
    });

  });
});
