describe('Categories page', () => {
  let categoryCount = 0;

  before(() => {
    cy.visit('/categories');
    cy.wait(500);
    
    cy.get('body').then(($body) => {
      if ($body.text().includes('There are not currently any categories')) {
        categoryCount = 0;
      }
      else {
        cy.wait(1000); // ensure there's enough time to fetch content
        cy.get('body').find('.category-preview-card').its('length').then((length) => {
          categoryCount = length;
        });
      }
    });
  });

  beforeEach(() => {
    cy.visit('/categories');
    cy.wait(500);
  });

  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({ duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows a category preview for each of the categories', () => {
      cy.get('body').find('.category-preview-card').should('have.length', categoryCount);
  });
});
