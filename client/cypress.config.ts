import { defineConfig } from "cypress";
import { clerkSetup } from "@clerk/testing/cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(_, config) {
      return clerkSetup({ config });
    },
    baseUrl: "http://localhost:5173/", //change for desired URL
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
