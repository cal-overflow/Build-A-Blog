describe('Footer bar', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait(500);
    cy.get('#footer-bar').scrollIntoView({duration: 500 });
  });

  it('links to the blog page correctly', () => {
    cy.get('#footer-bar').contains('Blog').click();
    cy.location('pathname').should('eq', '/blog');
  });
  
  it('links to the portfolio page correctly', () => {
    cy.get('#footer-bar').contains('Portfolio').click();
    cy.location('pathname').should('eq', '/category/portfolio');
  });

  it('links to the home page correctly', () => {
    cy.get('#footer-bar').contains('Contact').click();
    cy.location('pathname').should('eq', '/contact');
  });

  it('links to Youtube channel correctly', () => {
    if (Cypress.env('NUXT_ENV_YOUTUBE_CHANNEL_URL')) {
      cy.get('#footer-bar > div > #youtube-link').should('have.attr', 'href', 'https://www.youtube.com/channel/UCTfscxyX4CI9SnWdFqK4FJw');
    }
    else cy.log('No Youtube channel url environment variable detected. Skipping Test');
  });
  
  it('links to Github profile correctly', () => {
    if (Cypress.env('NUXT_ENV_GITHUB_PROFILE_URL')) {
      cy.get('#footer-bar > div > #github-link').should('have.attr', 'href', 'https://github.com/ChristianLisle');
    }
    else cy.log('No GitHub profile URL environment variable detected. Skipping Test');
  });
});
