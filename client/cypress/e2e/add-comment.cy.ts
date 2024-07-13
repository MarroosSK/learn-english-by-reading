/// <reference types="cypress" />

describe("Article Comment Flow", () => {
  const articleId = 2; // ID článku, ktorý bude testovaný
  const category = "A1"; // Kategória článku

  before(() => {
    cy.visit(`/reading/${category}/${articleId}`);
  });

  it("should display sign-in message when trying to comment without being signed in", () => {
    cy.visit(`/reading/${category}/${articleId}`);
    cy.get('[data-id="comment-signin-message"]').should(
      "contain",
      "Please sign in to comment."
    );
  });

  it("should sign in and allow comment submission", () => {
    // Reload the page to apply the sign-in
    cy.visit(`/reading/${category}/${articleId}`);
    // Sign in
    cy.signIn();

    // Fill out the comment form
    cy.get('[data-id="comment-textarea"]').type("This is a test comment.");
    cy.get('[data-id="comment-submit-button"]').click();

    // Check for the success message
    cy.get(".toast").should("contain", "Comment added!");

    // Verify the comment appears in the list
    cy.get('[data-id="comment-list"]').should(
      "contain",
      "This is a test comment."
    );
  });

  after(() => {
    // Sign out after the tests
    cy.signOut();
  });
});
