import { NavLink } from "react-router-dom";
import homeReading from "@/assets/home-reading.webp";
import homeVocabulary from "@/assets/home-vocabulary.webp";

const HomeLearning = () => {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="max-w-7xl flex flex-col  gap-y-24 mx-auto py-32">
        <h2 className="w-2/3 text-stone-500 text-xl md:text-4xl flex flex-col items-center mx-auto font-semibold leading-relaxed">
          <span className="block w-full text-center">
            We provide you with the right tools to help you
          </span>
          <span className="block w-3/4 text-center">
            interact confidently in the real world.
          </span>
        </h2>

        {/* 1 */}
        <div className=" h-auto flex justify-between bg-white  rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden">
          <div className="hidden md:flex w-1/2 h-full relative overflow-hidden">
            <img
              src={homeReading}
              className="w-full h-auto relative z-0 rounded-lg scale-110 transition-all duration-300 hover:scale-100"
              alt="Reading image"
              loading="lazy"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col  justify-center text-2xl  p-6">
            <div className="flex flex-col items-start gap-y-4 px-6">
              <h3 className="text-stone-500 text-2xl font-bold">READING</h3>
              <p>
                Practise your reading and learn useful language to use at work
                or to communicate effectively with friends.
              </p>
              <NavLink to={"/reading"}>
                <button className="bg-sky-800 text-lg px-4 py-2 rounded-full hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out ">
                  Start reading
                </button>
              </NavLink>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="h-auto  flex justify-between bg-white  rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden">
          <div className="w-full md:w-1/2 flex flex-col justify-center text-2xl p-6">
            <div className="flex flex-col items-start gap-y-4 px-6">
              <h3 className="text-stone-500 text-2xl font-bold">VOCABULARY</h3>
              <p>
                Learn new words and improve your language level to be able to
                communicate in English effectively.
              </p>
              <NavLink to={"/vocabulary"}>
                <button className="bg-sky-800 text-lg px-4 py-2 rounded-full  hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out">
                  Check words
                </button>
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex w-1/2 h-full relative overflow-hidden">
            <img
              src={homeVocabulary}
              className="object-cover w-full h-full rounded-br-[3rem] scale-110 transition-all duration-300 hover:scale-100"
              alt="Vocabulary image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLearning;
