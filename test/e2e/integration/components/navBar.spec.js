
describe('Nav bar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('links to the home page correctly', () => {
    if (Cypress.env('NUXT_ENV_FULL_NAME')) {
      cy.contains(Cypress.env('NUXT_ENV_FULL_NAME')).click();
      cy.location('pathname').should('eq', '/');
    }
    else {
      throw new Error('Required Environment Variable NUXT_ENV_FULL_NAME is incorrectly set');
    }
  });

  it('links to the blog page correctly', () => {
    cy.contains('Blog').click();
    cy.location('pathname').should('eq', '/blog');
  });
  
  it('links to the portfolio page correctly', () => {
    cy.contains('Portfolio').click();
    cy.location('pathname').should('eq', '/category/portfolio');
  });
});
