import "@splidejs/react-splide/css/skyblue";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { Layout } from "./layout/layout.tsx";
import {
  PageHome,
  PageProfile,
  PageReading,
  PageReadingArticle,
  PageReadingCategories,
  PageSearch,
  PageTerms,
  PageVocabulary,
} from "./pages";
import Providers from "./provider/providers.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,

    children: [
      // HOME
      {
        path: "/",
        element: <PageHome />,
      },
      // PROFILE
      {
        path: "/profile",
        element: <PageProfile />,
      },
      // READING
      {
        path: "/reading",
        element: <PageReading />,
      },
      {
        path: "/reading/:category",
        element: <PageReadingCategories />,
      },
      {
        path: "/reading/:category/:id",
        element: <PageReadingArticle />,
      },
      //VOCABULARY
      {
        path: "/vocabulary",
        element: <PageVocabulary />,
      },
      // SEARCH
      {
        path: "/search",
        element: <PageSearch />,
      },
      //TERMS
      {
        path: "/terms",
        element: <PageTerms />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
);
