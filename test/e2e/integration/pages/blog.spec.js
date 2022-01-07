describe('Blog page', () => {
  beforeEach(() => {
    cy.visit('/blog');
    cy.wait(500);
  });
  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows 10 post preview cards', () => {
    cy.get('#post-feed').find('.post-preview-card').should('have.length', 10);
  });
  
  it('shows more than 10 post preview cards when scrolling down the page', () => {
    cy.get('#post-feed').find('.post-preview-card').should('have.length', 10);

    cy.get('#footer-bar').scrollIntoView({duration: 1000 });

    cy.get('#post-feed').find('.post-preview-card').should('have.length.gt', 10);
  });
});