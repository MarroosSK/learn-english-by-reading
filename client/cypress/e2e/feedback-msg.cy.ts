/// <reference types="cypress" />

describe("Feedback Modal Flow", () => {
  before(() => {
    cy.visit("/");
  });

  it("should display sign-in message when opening feedback modal without being signed in", () => {
    cy.visit("/");
    cy.get('[data-id="feedback-trigger"]').first().click();
    cy.get('[data-id="feedback-modal-content"]').should(
      "contain",
      "Please sign in first"
    );
  });

  it("should sign in and allow feedback submission", () => {
    // Reload the page to apply the sign-in
    cy.visit("/");
    cy.get('[data-id="feedback-trigger"]').first().click();
    cy.get('[data-id="feedback-modal-content"]').should(
      "contain",
      "Please sign in first"
    );

    // Sign in
    cy.signIn();

    // Reload the page to apply the sign-in
    cy.visit("/");
    cy.get('[data-id="feedback-trigger"]').first().click();
    cy.get('[data-id="feedback-modal-content"]').should(
      "not.contain",
      "Please sign in first"
    );

    cy.get('[data-id="feedback-username-input"]').should(
      "have.value",
      " english3"
    );

    // Fill out the form
    cy.get('[data-id="feedback-body-textarea"]').type(
      "This is a test feedback message."
    );

    // Submit the form
    cy.get('[data-id="feedback-submit-button"]').click();

    // Check for the success message
    cy.get(".toast").should("contain", "Testimonial has been created.");
  });

  after(() => {
    // Sign out after the tests
    cy.signOut();
  });
});
