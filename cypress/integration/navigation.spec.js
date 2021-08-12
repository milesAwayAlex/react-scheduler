describe('Navigation', () => {
  it('should visit root', () => {
    cy.visit('/');
  });
  it('should navigate to Tuesday', () => {
    cy.visit('/');
    cy.get('[data-testid=day]')
      .contains('Tuesday')
      .parent()
      .click()
      .should('have.class', 'day-list__item--selected');
  });
});
