import { useQuery } from "@tanstack/react-query";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { cn } from "../../../lib/utils";
import FeedbackModal from "../../modals/feedback-modal";
import { Loader2 } from "lucide-react";
import { fetchTestimonials } from "../../../api/api-calls";
import { TestimonialI } from "../../../types/types";

export const HomeTestimonials = () => {
  const {
    data: allTestimonials,
    error,
    isLoading,
    refetch,
  } = useQuery<TestimonialI[]>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });

  if (isLoading)
    return (
      <div className="bg-stone-100 w-full h-screen flex items-center justify-center text-stone-500">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (error)
    return (
      <div className="bg-stone-100 w-full h-screen flex items-center justify-center text-stone-500">
        Error loading testimonials
      </div>
    );

  return (
    <section
      id="testimonials"
      className="w-full bg-stone-100 relative space-y-12 py-24 sm:py-32"
    >
      <div className="space-y-6 text-center">
        <h2 className="text-4xl font-bold text-stone-500">Testimonials</h2>
        <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-500">
          If you have anything to say, let us know{" "}
          <FeedbackModal refetchTestimonials={refetch} />.
        </p>
      </div>

      <Splide
        aria-label="Testimonials Slider"
        options={{
          rewind: true,
          perPage: 3,
          pagination: false,
          drag: "free",
          gap: "2rem",
          breakpoints: {
            1200: { perPage: 3 },
            992: { perPage: 2 },
            768: { perPage: 2 },
            576: { perPage: 1 },
          },
        }}
        className="max-w-6xl px-4 mx-auto"
      >
        {allTestimonials &&
          allTestimonials.map((testimonial, index) => (
            <SplideSlide key={index}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg bg-secondary-accent p-5 text-primary shadow-lg bg-white"
                )}
              >
                <div className="space-y-8">
                  <blockquote className="italic leading-relaxed text-gray-500">
                    &ldquo;{testimonial.body}&rdquo;
                  </blockquote>
                  <h4 className="mt-3 font-bold text-stone-500">
                    {testimonial.username}
                  </h4>
                </div>
              </div>
            </SplideSlide>
          ))}
      </Splide>
    </section>
  );
};

export default HomeTestimonials;
