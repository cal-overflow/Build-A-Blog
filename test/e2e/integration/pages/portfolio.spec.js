describe('Portfolio page', () => {
  beforeEach(() => {
    cy.visit('/portfolio');
    cy.wait(500);
  });
  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({ duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows at least 10 post preview cards', () => {
    cy.get('#post-feed').find('.post-preview-card').should('have.length.gte', 10);
  });
});
