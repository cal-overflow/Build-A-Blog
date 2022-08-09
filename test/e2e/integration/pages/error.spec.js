import Chance from "chance";

const chance = new Chance();

describe('Error page', () => {
  let path;

  beforeEach(() => {
    path = `/${chance.string({pool: 'abcdef'})}`;
    cy.visit(path);
    cy.wait(500);
  });

  it('shows the menu and footer bar', () => {
    cy.get('#nav-bar').should('be.visible');
    cy.get('#footer-bar').scrollIntoView({duration: 500 });
    cy.get('#footer-bar').should('be.visible');
  });

  it('shows the error header, info, and "more info" card', () => {
    cy.get("#error-header-card").should('be.visible');
    cy.get('#error-main-info-card').should('be.visible');
    cy.get('#error-more-info-card').should('be.visible');
  });

  describe('clicking the "Take me home" link', () => {
    beforeEach(() => {
      cy.contains('Take me home').click();
      cy.wait(250);
    });

    it('opens the home page', () => {
      cy.location('pathname').should('eq', '/');
    });
  });

  describe('clicking the "reach out to me" link', () => {
    beforeEach(() => {
      cy.contains('reach out to me').click();
      cy.wait(250);
    });

    it('opens the cotact page with the Error information filled out', () => {
      cy.location('pathname').should('eq', '/contact');
      cy.contains('Error information 🤓');

      cy.get('[name="statusCode"]').should('have.value', 404);
      cy.get('[name="path"]').should('have.value', path);
    });
  });
});
