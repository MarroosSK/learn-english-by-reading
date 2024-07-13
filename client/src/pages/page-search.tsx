import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../api/api-calls";

interface SearchResult {
  id: string;
  title: string;
  body: string;
  imageUrl: string;
  difficulty: string;
  createdAt: string;
  userId: string;
}

const PageSearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => fetchSearchResults(query as string),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Error loading articles</p>
      </div>
    );
  }

  return (
    <div className="px-4  flex flex-col items-center mx-auto py-24 max-w-7xl">
      <h1 className="text-2xl md:text-4xl text-stone-500 font-bold mb-8">
        Search Results for <span className="text-sky-800">"{query}"</span>
      </h1>
      {data.length > 0 ? (
        <ul>
          {data.map((result: SearchResult, index: number) => (
            <li key={index} className="mb-4">
              <div className="p-4 border border-gray-300 rounded-md">
                <h2 className="text-xl font-semibold">{result.title}</h2>
                <a
                  href={`/reading/${result.difficulty}/${result.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-xl">No results found.</p>
      )}
    </div>
  );
};

export default PageSearch;
