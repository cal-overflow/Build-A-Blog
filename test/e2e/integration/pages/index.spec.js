describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows the introduction card and two page-preview cards', () => {
    cy.get('#introduction-card').should('be.visible');
    cy.get('.page-preview-card').should('have.length', 2);
    cy.get('.page-preview-card').eq(0).should('be.visible');
    cy.get('.page-preview-card').eq(1).should('be.visible');
  });

  describe('introduction card', () => {
    it('contains the headshot image', () => {
      cy.get('#introduction-card img').should('be.visible');
    });

    it('contains the greeting', () => {
      if (Cypress.env('NUXT_ENV_FULL_NAME')) {
        cy.get('#greeting').should('be.visible');
      }
      else cy.log('Full name environment variable not detected. Skipping test');
    });
  });

  describe('portfolio preview card', () => {
    it('contains a link to the portfolio page', () => {
      cy.get('.page-preview-card').eq(0).contains('View my work').click();
      cy.location('pathname').should('eq', '/category/portfolio');
    });
  });

  describe('blog preview card', () => {
    it('contains a link to the blog page', () => {
      cy.get('.page-preview-card').eq(1).contains('View my blog').click();
      cy.location('pathname').should('eq', '/blog');
    });
  });
});
