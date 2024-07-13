describe("Adding Word to Word List", () => {
  beforeEach(() => {
    // Before each test, visit the vocabulary page
    cy.visit("/vocabulary");
  });

  it("should allow signed-in user to add a word to their list", () => {
    cy.signIn();

    // Verify the initial message
    cy.contains("Type word and press Enter").should("be.visible");

    // Simulate searching for a word
    const searchedWord = "example";
    cy.get('[data-id="search-input-vocabulary"]').type(
      searchedWord + "{enter}"
    );

    // Wait for data to load
    cy.get('[data-id="loader"]').should("not.exist");

    // Verify the word is displayed
    cy.get('[data-id="word"]').should("contain", searchedWord);

    // Verify the add-to-wordlist button is visible and click it
    cy.get('[data-id="add-to-wordlist-button"]').should("be.visible").click();

    // Verify success message (works 1x as word example will be added to list, to re-run test delete word from list)
    cy.get(".toast")
      .should("be.visible")
      .and("contain", "Word added to the list!");
  });

  after(() => {
    cy.signOut();
  });
});
