// Import Clerk testing utility
import { setupClerkTestingToken } from "@clerk/testing/cypress";

// Cypress E2E Test for Navbar
describe("Navbar E2E tests", () => {
  beforeEach(() => {
    cy.viewport("iphone-6");
    cy.visit("/");
  });

  it("should open and close the mobile menu", () => {
    cy.get(".hamburger-react").should("exist");
    cy.get(".hamburger-react").click();
    cy.get('[data-id="mobile-menu"]').should("exist").and("be.visible");
    cy.get(".hamburger-react").click();
    cy.wait(500);
    cy.get('[data-id="mobile-menu"]').should("not.exist");
  });

  it("should navigate to a link from the mobile menu", () => {
    cy.get(".hamburger-react").click();
    cy.get('[data-id="mobile-menu"]').should("exist").and("be.visible");
    cy.get('[data-id="mobile-menu"] .flex-col .group').first().click();
    cy.url().should("include", "/reading");
  });

  it("should perform a search from the mobile menu", () => {
    cy.get(".hamburger-react").click();
    cy.get('[data-id="mobile-menu"]').should("exist").and("be.visible");
    cy.get('[data-id="mobile-menu"] input[type="text"]').type(
      "test search{enter}"
    );
    cy.url().should("include", "search?query=test%20search");
  });

  it("should show sign in button when signed out", () => {
    cy.get(".hamburger-react").click();
    cy.get('[data-id="mobile-menu"]').should("exist").and("be.visible");
    cy.get('[data-id="mobile-menu"]').should("contain", "Sign in");
  });

  it("should show sign out button when signed in", () => {
    setupClerkTestingToken();

    cy.get(".hamburger-react").click();
    cy.get('[data-id="mobile-menu"]').should("exist").and("be.visible");
    cy.get('[data-id="mobile-menu"]').should("contain", "Sign in");

    cy.get('[data-id="sign-in-btn"]')
      .first()
      .should("contain", "Sign in")
      .click({ force: true });

    cy.visit("/");
    cy.signIn();
    cy.visit("/");

    cy.get(".hamburger-react").click();
    cy.get('[data-id="mobile-menu"]').should("exist").and("be.visible");
    cy.get('[data-id="mobile-menu"]').should("contain", "Sign out");
  });
});

export {};
