import ContactModal from "../../modals/contact-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

const Question1 = () => (
  <AccordionItem value="1">
    <AccordionTrigger className="text-left text-stone-500 font-bold leading-relaxed">
      What is point of StudyEnglish?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p className="text-gray-500">
        Main goal of StudyEnglish is to improve english of anyone, who is
        willing to give it a try.
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question2 = () => (
  <AccordionItem value="2">
    <AccordionTrigger className="text-left text-stone-500 font-bold  leading-relaxed">
      Wll articles be updated?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p className="text-gray-500">
        Yes, we do plan add more articles over time.
      </p>
    </AccordionContent>
  </AccordionItem>
);

const Question3 = () => (
  <AccordionItem value="3">
    <AccordionTrigger className="text-left text-stone-500 font-bold  leading-relaxed">
      Is it for free?
    </AccordionTrigger>
    <AccordionContent className="prose max-w-none dark:prose-invert">
      <p className="text-gray-500">
        Definitely, everything here is for FREE. If you decide to create an
        account, you get some benefits.
      </p>
    </AccordionContent>
  </AccordionItem>
);

const HomeFaq = () => (
  <section
    id="faq"
    className="max-w-7xl px-4 flex items-center justify-center mx-auto   space-y-12 py-24 sm:py-32"
  >
    <div className="grid items-center gap-12 lg:grid-cols-3">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-stone-500">
          Frequently Asked Questions
        </h2>
        <div className="mx-auto text-lg text-gray-500 leading-loose">
          If you did not find your answer, feel free to contact
          <span className="pl-1">
            <ContactModal />.
          </span>
        </div>
      </div>

      <div className="col-span-2">
        <Accordion type="single" collapsible>
          <Question1 />
          <Question2 />
          <Question3 />
        </Accordion>
      </div>
    </div>
  </section>
);

export default HomeFaq;
