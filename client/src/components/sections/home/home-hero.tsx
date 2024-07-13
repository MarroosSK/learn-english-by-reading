import homeBg from "@/assets/home-bg.webp";

const HomeHero = () => {
  return (
    <div className="relative">
      <img
        src={homeBg}
        height="600px"
        width="600px"
        className="w-full h-[600px] object-cover"
        alt="Study Background"
        loading="lazy"
      />
      <h1
        data-id="hero-home-heading"
        className="absolute bottom-10 left-6 z-[10] p-6 bg-white text-stone-500 text-2xl sm:text-4xl md:text-5xl font-bold rounded-lg w-1/2"
      >
        Study English online.
      </h1>
    </div>
  );
};

export default HomeHero;
