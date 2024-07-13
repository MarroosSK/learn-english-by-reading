/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      signOut(): Chainable<void>;
      signIn(): Chainable<void>;
    }
  }

  interface Clerk {
    loaded: boolean;
    client: {
      signIn: {
        create: (data: {
          identifier: string;
          password: string;
        }) => Promise<{ createdSessionId: string }>;
      };
    };
    setActive: (data: { session: string }) => Promise<void>;
  }

  interface Window {
    Clerk: Clerk;
  }
}

Cypress.Commands.add(`signOut`, () => {
  cy.log(`Sign out by clearing all cookies.`);
});

Cypress.Commands.add(`signIn`, () => {
  cy.log(`Signing in.`);

  cy.window()
    .should((window) => {
      expect(window).to.not.have.property(`Clerk`, undefined);
      expect(window.Clerk.loaded).to.eq(true);
    })
    .then(async (window) => {
      try {
        const res = await window.Clerk.client.signIn.create({
          identifier: Cypress.env(`test_user`),
          password: Cypress.env(`test_password`),
        });

        await window.Clerk.setActive({
          session: res.createdSessionId,
        });

        cy.log(`Finished Signing in.`);
      } catch (error) {
        cy.log(`Error during sign in`);
        throw error;
      }
    });
});
