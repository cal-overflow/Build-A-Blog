describe('Footer bar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
    cy.get('#footer-bar').scrollIntoView({ duration: 500 });
  });

  it('links to the Contact page correctly', () => {
    cy.get('#footer-bar').contains('Contact').click();
    cy.location('pathname').should('eq', '/contact');
  });

  it('links to Youtube channel correctly', () => {
    cy.get('#footer-bar > div > #youtube-link').should('have.attr', 'href', 'https://www.youtube.com/@cal-overflow');
  });
  
  it('links to Github profile correctly', () => {
    cy.get('#footer-bar > div > #github-link').should('have.attr', 'href', 'https://github.com/cal-overflow');
  });
});
