describe('Back to Top button', () => {
  beforeEach(() => {
    cy.visit('/blog');
    cy.wait(500);
  });
  
  it('is invisible at the top of the page', () => {
    cy.get('#back-to-top-button').should('not.be.visible');
  });

  describe('after scrolling down the page', () => {
    beforeEach(() => {
      cy.get('#footer-bar').scrollIntoView({duration: 500 });
    });

    it('is visible', () => {
      cy.wait(500);
      cy.get('#back-to-top-button').should('be.visible');
    });

    describe('clicking the button', () => {
      beforeEach(() => {
        cy.wait(500);
        cy.get('#back-to-top-button').click();
      });

      it('scrolls to the top of the page after click', () => {
        cy.get('#nav-bar').should('be.visible');
        cy.window().its('scrollY').should('equal', 0);
      });

      it('is invisible again', () => {
        cy.get('#back-to-top-button').should('not.be.visible');
      });
    });

  });
});
