import { ChangeEvent, useContext } from "react";
import { DictionaryContext } from "../../../context/dictionary-context";

const Search = () => {
  const contextValue = useContext(DictionaryContext);

  return (
    <div className="flex flex-col gap-y-6 p-4 border-4 border-sky-100 rounded-bl-[3rem] rounded-tr-[3rem] overflow-hidden">
      <form
        onSubmit={contextValue?.handleSubmit}
        className="p-6 flex flex-col gap-y-3"
        data-id="search-form"
      >
        <input
          className="border border-sky-800 rounded-lg px-4 py-2"
          type="text"
          placeholder="Search word..."
          value={contextValue?.searchWord}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            contextValue?.setSearchWord(e.target.value)
          }
          data-id="search-input-vocabulary"
        />
        <button
          type="submit"
          className="w-full sm:w-1/2 bg-sky-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out "
          data-id="search-submit-button"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
