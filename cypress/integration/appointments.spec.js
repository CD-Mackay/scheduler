const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants")

describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit('/');
    cy.contains("Monday");
  });


  it("Should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
      cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
      cy.get("[alt='Sylvia Palmer']").click();
      cy.contains("Save").click();
      cy.contains(".appointment__card--show", "Lydia Miller-Jones");
      cy.contains(".appointment__card--show", "Sylvia Palmer");
  })
  it("Should edit an interview", () => {
    cy.get("[alt=Edit]")
    .first()
    .click({force: true});
    cy.get("[data-testid=student-name-input]").clear().type("Connor Mackay")
    cy.get("[alt='Tori Malcolm']")
    .click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Connor Mackay");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })
  it("Should cancel an interview", () => {
    cy.get("[alt=Delete]")
    .first()
    .click({force: true});
    cy.get('.appointment__actions > :nth-child(2)') 
       .click();
       cy.get('.day-list__item--selected > .text--light').contains("5 spots remaining");
       cy.get("Archie Cohen").should('not.exist');
  })
})