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

  it('shows the introduction, portfolio preview, and blog preview cards', () => {
    cy.get('#introduction-card').should('be.visible');
    cy.get('#portfolio-preview-card').should('be.visible');
    cy.get('#blog-preview-card').should('be.visible');
  });

  describe('introduction card', () => {
    it('contains the headshot image', () => {
      cy.get('img').should('have.attr', 'src', 'headshot.png');
    });
  });

  describe('portfolio preview card', () => {
    it('contains a header that takes user to portfolio page on click', () => {
      cy.get('#portfolio-preview-card').contains('Portfolio').click();
      cy.location('pathname').should('eq', '/category/portfolio');
    });
    
    it('contains a link to the portfolio page', () => {
      cy.get('#portfolio-preview-card').contains('View my work').click();
      cy.location('pathname').should('eq', '/category/portfolio');
    });
  });

  describe('blog preview card', () => {
    it('contains a header that takes user to blog page on click', () => {
      cy.get('#blog-preview-card').contains('Blog').click();
      cy.location('pathname').should('eq', '/blog');
    });
    
    it('contains a link to the blog page', () => {
      cy.get('#blog-preview-card').contains('View my blog').click();
      cy.location('pathname').should('eq', '/blog');
    });
  });
});