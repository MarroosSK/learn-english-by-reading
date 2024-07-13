import { NavLink } from "react-router-dom";
import ContactModal from "./modals/contact-modal";

const Footer = () => {
  return (
    <>
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-start lg:gap-8">
            <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
              <div className="col-span-2">
                <div>
                  <NavLink to="/">
                    <h2 className="text-2xl font-bold text-stone-500">
                      StudyEnglish
                    </h2>
                  </NavLink>

                  <p className="mt-4 text-gray-500">
                    Study English by reading articles, improving vocabulary and
                    checking grammar.
                  </p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-stone-500">LEARN</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <NavLink
                      to="/reading"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Reading{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/vocabulary"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Vocabulaty{" "}
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-stone-500">HELP</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <NavLink
                      to="/"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      FAQ{" "}
                    </NavLink>
                  </li>

                  <li>
                    <ContactModal />
                  </li>
                </ul>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <p className="font-medium text-stone-500">Account</p>

                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <NavLink
                      to="/profile"
                      className="text-gray-700 transition hover:opacity-75"
                    >
                      {" "}
                      Profile{" "}
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-100 pt-8">
            <div className="sm:flex sm:justify-between">
              <p className="text-xs text-gray-500">
                &copy; 2024. StudyEnglish. All rights reserved.
              </p>

              <ul className="mt-8 flex flex-wrap justify-start gap-4 text-xs sm:mt-0 lg:justify-end">
                <li>
                  <NavLink
                    to="/terms"
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
