import { useEffect } from "react";
import ReadingTabs from "../components/sections/reading/reading-tabs";
import Sidebar from "../components/sidebar";
import ReadingHero from "../components/sections/reading/reading-hero";

function PageReading() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <ReadingHero />
      <div className="max-w-7xl mx-auto px-4 m-4">
        <div className="grid md:grid-cols-12 gap-5 p-4 m-2">
          <div className="md:col-span-9 p-4">
            <p className=" text-stone-500 text-lg md:text-2xl font-semibold">
              Here you can find articles to practise your reading skills.
              Reading will help you to improve your understanding of the
              language and build your vocabulary. Articles are categorized, pick
              desired category and start reading.
            </p>
            <ReadingTabs />
          </div>
          <aside className="md:col-span-3 md:pt-0 p-2  ">
            <Sidebar />
          </aside>
        </div>
      </div>
    </section>
  );
}

export default PageReading;
