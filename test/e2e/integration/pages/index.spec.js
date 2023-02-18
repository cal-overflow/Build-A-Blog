describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
  });

  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({ duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows the introduction card and three page-preview cards', () => {
    cy.get('#introduction-card').should('be.visible');
    cy.get('.page-preview-card').should('have.length', 3);
    cy.get('.page-preview-card').eq(0).should('be.visible');
    cy.get('.page-preview-card').eq(1).should('be.visible');
    cy.get('.page-preview-card').eq(2).should('be.visible');
  });

  describe('introduction card', () => {
    it('contains the headshot image', () => {
      cy.get('#introduction-card img').should('be.visible');
    });
  });

  describe('portfolio preview card', () => {
    it('contains a link to the portfolio page', () => {
      cy.contains('View my work').click();
      cy.location('pathname').should('eq', '/portfolio');
    });
  });

  describe('blog preview card', () => {
    it('contains a link to the blog page', () => {
      cy.contains('View my blog').click();
      cy.location('pathname').should('eq', '/blog');
    });
  });

  describe('cloud preview card', () => {
    it('contains a link to the cloud page', () => {
      cy.contains('Learn more').click();
      cy.location('pathname').should('eq', '/cloud');
    });
  });
});
