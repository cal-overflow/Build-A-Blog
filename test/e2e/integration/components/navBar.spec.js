
describe('Nav bar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('links to the home page correctly', () => {
    cy.contains('cal').click();
    cy.location('pathname').should('eq', '/');
  });

  it('links to the portfolio page correctly', () => {
    cy.contains('Portfolio').click();
    cy.location('pathname').should('eq', '/portfolio');
  });
  
  it('links to the cloud page correctly', () => {
    cy.contains('Cloud').click();
    cy.location('pathname').should('eq', '/cloud');
  });

  it('links to the blog page correctly', () => {
    cy.contains('Blog').click();
    cy.location('pathname').should('eq', '/blog');
  });
});
