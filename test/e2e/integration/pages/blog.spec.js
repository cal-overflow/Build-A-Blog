describe('Blog page', () => {
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

  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows at most 10 post preview cards', () => {
    cy.get('#post-feed').find('.post-preview-card').should('have.length.lte', 10);
  });
  
  describe('given there are 10 posts rendered initially', () => {
    it('shows greater than or exactly 10 post preview cards when scrolling down the page', () => {
      if (postCount === 10) {
          cy.get('#post-feed').find('.post-preview-card').should('have.length', 10);
      
          cy.get('#footer-bar').scrollIntoView({duration: 1000 });
      
          cy.get('#post-feed').find('.post-preview-card').should('have.length.gte', 10);
      }
    });
  });
});
