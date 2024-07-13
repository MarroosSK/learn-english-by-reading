import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../components/ui/sonner";
import { DictionaryContextProvider } from "../context/dictionary-context";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <DictionaryContextProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
          </QueryClientProvider>
        </DictionaryContextProvider>
      </ClerkProvider>
    </>
  );
};

export default Providers;
