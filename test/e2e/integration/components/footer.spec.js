describe('Footer bar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
    cy.get('#footer-bar').scrollIntoView({ duration: 500 });
  });

  it('links to the blog page correctly', () => {
    cy.get('#footer-bar').contains('Blog').click();
    cy.location('pathname').should('eq', '/blog');
  });
  
  it('links to the portfolio page correctly', () => {
    cy.get('#footer-bar').contains('Portfolio').click();
    cy.location('pathname').should('eq', '/portfolio');
  });

  it('links to the home page correctly', () => {
    cy.get('#footer-bar').contains('Contact').click();
    cy.location('pathname').should('eq', '/contact');
  });

  it('links to Youtube channel correctly', () => {
    cy.get('#footer-bar > div > #youtube-link').should('have.attr', 'href', 'https://youtube.com');
  });
  
  it('links to Github profile correctly', () => {
    cy.get('#footer-bar > div > #github-link').should('have.attr', 'href', 'https://github.com/cal-overflow/portfolio');
  });
});
