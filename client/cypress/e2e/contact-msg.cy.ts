/// <reference types="cypress" />

describe("Contact Modal Flow", () => {
  before(() => {
    cy.visit("/");
  });

  it("should display sign-in message when opening contact modal without being signed in", () => {
    cy.visit("/");
    cy.get('[data-id="support-trigger"]').first().click();
    cy.get('[data-id="contact-modal-content"]').should(
      "contain",
      "Please sign in first"
    );
  });

  it("should sign in and allow message submission", () => {
    cy.visit("/");
    cy.get('[data-id="support-trigger"]').first().click();
    cy.get('[data-id="contact-modal-content"]').should(
      "contain",
      "Please sign in first"
    );

    // Sign in
    cy.signIn();

    // Reload the page to apply the sign-in
    cy.visit("/");
    cy.get('[data-id="support-trigger"]').first().click(); // Kliknite na prvý element
    cy.get('[data-id="contact-modal-content"]').should(
      "not.contain",
      "Please sign in first"
    );

    cy.get('input[name="postId"]').type("Test Title");
    cy.get('textarea[name="comment"]').type("This is a test message.");

    cy.get('button[type="submit"]').click();

    cy.get(".toast").should("contain", "Message has been sent.");
  });

  after(() => {
    cy.signOut();
  });
});
