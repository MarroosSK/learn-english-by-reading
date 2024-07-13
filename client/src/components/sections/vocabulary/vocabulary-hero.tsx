import vocabularyBg from "@/assets/vocabulary-bg.webp";

const VocabularyHero = () => {
  return (
    <div className="relative ">
      <img
        src={vocabularyBg}
        height="600px"
        width="600px"
        className="w-full h-[600px] object-cover"
        alt="Vocabulary Background"
        loading="lazy"
      />
      <h1 className="absolute bottom-32 left-6 z-[10] p-6 bg-white text-stone-500 text-xl sm:text-4xl md:text-5xl font-bold rounded-lg w-1/2">
        VOCABULARY
      </h1>
    </div>
  );
};

export default VocabularyHero;
