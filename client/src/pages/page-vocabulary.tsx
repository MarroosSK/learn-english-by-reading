import { useEffect } from "react";
import Search from "../components/sections/vocabulary/search";
import SearchContent from "../components/sections/vocabulary/search.content";
import VocabularyHero from "../components/sections/vocabulary/vocabulary-hero";

const PageVocabulary = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="min-h-screen">
      <VocabularyHero />
      <div className="max-w-7xl mx-auto px-4 m-4">
        <div className="md:grid md:grid-cols-12 sm:gap-5 p-4 m-2">
          <div className="md:col-span-9 p-4">
            <p className=" text-stone-500 text-lg sm:text-2xl font-semibold">
              Here you can search for meaning of word you don't understand from
              text.
            </p>
            <SearchContent />
          </div>
          <aside className="md:col-span-3 md:pt-0 p-2  ">
            <Search />
          </aside>
        </div>
      </div>
    </section>
  );
};

export default PageVocabulary;
