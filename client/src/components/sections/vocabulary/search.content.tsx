import { useContext, useRef } from "react";
import axios from "axios";
import { DictionaryContext } from "../../../context/dictionary-context";
import { useQuery } from "@tanstack/react-query";
import { Heart, Loader2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { Input } from "../../ui/input";
import { toast } from "sonner";
import { Definitions, Meanings, Phonetics } from "../../../types/types";
import { addWordToList } from "../../../api/api-calls";

const SearchContent = () => {
  const { isSignedIn, user } = useUser();
  const contextValue = useContext(DictionaryContext);
  const searchedWord = contextValue?.savedWord;
  const formRef = useRef<HTMLFormElement>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["words", searchedWord],
    queryFn: async () => {
      if (searchedWord) {
        const response = await axios.get(
          `${import.meta.env.VITE_DICTIONARY_URL}${searchedWord}`
        );
        return response.data[0];
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = {
        userId: user?.id,
        word: formData.get("word"),
        meaning: formData.get("meaning"),
        link: formData.get("link"),
      };

      try {
        const response = await addWordToList(data);
        toast(response);
        formRef.current.reset();
      } catch (error) {
        toast("Error, try again later.");
        console.error("Error adding word:", error);
      }
    }
  };

  if (!searchedWord)
    return (
      <div className="md:min-h-screen flex justify-center mx-auto py-10 text-xl tracking-wide text-gray-500">
        'Type word and press Enter'
      </div>
    );
  if (isLoading)
    return (
      <div className="md:min-h-screen flex justify-center gap-x-2 mx-auto py-10 text-xl tracking-wide text-gray-500">
        Finding word <Loader2 className="animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="md:min-h-screen flex justify-center mx-auto py-10 text-xl tracking-wide text-gray-500">
        Could not find it. Are you sure it is written this way?
      </div>
    );

  const nounMeanings = data?.meanings.filter(
    (meaning: Meanings) => meaning.partOfSpeech === "noun"
  );

  return (
    <div className="flex flex-col gap-y-4 py-12 md:min-h-screen">
      <h4 className="text-sky-800 text-4xl font-semibold" data-id="word">
        {data?.word}
      </h4>
      <div>
        {data?.phonetics
          .slice(0, 1)
          .map((phonetic: Phonetics, index: number) => (
            <span key={index}>{phonetic.text}</span>
          ))}
      </div>
      {nounMeanings[0]?.definitions
        .slice(0, 3)
        .map((def: Definitions, index: number) => (
          <div key={index} className="mt-4">
            <ul>
              <li className="text-gray-500">{def.definition}</li>
            </ul>
          </div>
        ))}
      {data?.sourceUrls.slice(0, 1).map((sourceUrl: string, index: number) => (
        <div key={index} className="mt-4 flex items-center gap-x-2">
          <a className="text-secondary" href={sourceUrl} target="_blank">
            <button
              className="bg-sky-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out"
              data-id="details-button"
            >
              Details
            </button>
          </a>
          {isSignedIn && (
            <form ref={formRef} onSubmit={handleSubmit} data-id="add-word-form">
              <Input type="hidden" name="word" value={data?.word} />
              <Input
                type="hidden"
                name="meaning"
                value={nounMeanings[0]?.definitions[0]?.definition}
              />
              <Input type="hidden" name="link" value={data?.sourceUrls[0]} />
              <button
                className="bg-sky-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out"
                data-id="add-to-wordlist-button"
              >
                <Heart />
              </button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
