describe('Appointments', () => {
  beforeEach(() => {
    cy.request('/api/debug/reset');
    cy.visit('/');
    cy.contains('Monday');
  });
  it('shoild be able to book an interview', () => {
    cy.get('[alt=Add]')
      .filter((i) => i === 0)
      .click();
    cy.get('[data-testid=student-name-input]').type('Their Name');
    cy.get('[alt="Sylvia Palmer"]').click();
    cy.contains('Save').click();
    cy.contains('article', 'Their Name').contains('Sylvia Palmer');
  });
  it('shoild be able to edit an interview', () => {
    cy.get('[alt=Edit]')
      .filter((i) => i === 0)
      .invoke('show')
      .click();
    cy.get('[data-testid=student-name-input]')
      .clear()
      .type('Washington Irving');
    cy.get('[alt="Tori Malcolm"]').click();
    cy.contains('Save').click();
    cy.contains('article', 'Washington Irving').contains('Tori Malcolm');
  });
  it('shoild be able to delete an interview', () => {
    cy.get('[alt=Delete]')
      .filter((i) => i === 0)
      .invoke('show')
      .click();
    cy.contains('Confirm').click();
    cy.contains('DELETING',).should('exist');
    cy.contains('DELETING').should('not.exist');
    cy.get('[alt=Add]').should('have.length', 3);
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
