describe('Tags page', () => {
  let tagCount = 0;

  before(() => {
    cy.visit('/tags');
    cy.wait(500);
    
    cy.get('body').then(($body) => {
      if ($body.text().includes('There are not currently any tags')) {
        tagCount = 0;
      }
      else {
        cy.wait(1000); // ensure there's enough time to fetch content
        cy.get('body').find('.tag-preview-card').its('length').then((length) => {
          tagCount = length;
        });
      }
    });
  });

  beforeEach(() => {
    cy.visit('/tags');
    cy.wait(500);
  });

  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({ duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows a tag preview for each of the tags', () => {
      cy.get('body').find('.tag-preview-card').should('have.length', tagCount);
  });
});
