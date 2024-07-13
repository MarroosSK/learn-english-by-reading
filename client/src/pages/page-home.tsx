import { useEffect } from "react";

import {
  HomeHero,
  HomeAccountBenefits,
  HomeLearning,
  HomeTestimonials,
  HomeFaq,
} from "../components/sections";

function PageHome() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <HomeHero />
      <HomeLearning />
      <HomeAccountBenefits />
      <HomeTestimonials />
      <HomeFaq />
    </section>
  );
}

export default PageHome;
