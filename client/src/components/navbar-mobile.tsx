import Hamburger from "hamburger-react";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";
import NavbarLink from "./navbar-link";
import { NavbarLinkI } from "../types/types";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { navbarData } from "../constants/navbar-data";

interface NavbarMobileI {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const NavbarMobile = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: NavbarMobileI) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));

  return (
    <div ref={ref} className="flex md:hidden">
      <Hamburger toggled={isOpen} toggle={setOpen} />
      {isOpen && (
        <div
          data-id="mobile-menu"
          className="fixed left-0 shadow-4xl right-0 z-[80px] top-[3.5rem] p-5 pt-0 bg-white border-b border-b-white/20"
        >
          <ul className="flex flex-col md:hidden items-center gap-2 py-5">
            {navbarData.map((link: NavbarLinkI) => (
              <div key={link.title} onClick={() => setOpen((prev) => !prev)}>
                <NavbarLink {...link} />
              </div>
            ))}
          </ul>
          <div className="flex flex-col md:hidden items-center gap-2">
            <input
              data-id="input-field"
              type="text"
              placeholder="type and press enter"
              className="px-4 py-2 rounded-md border border-stone-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <SignedOut>
              <button
                data-id="sign-in-btn"
                className="bg-sky-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out"
              >
                <SignInButton />
              </button>
            </SignedOut>
            <SignedIn>
              <button className="bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-red-800 transition-all ease-in-out">
                <SignOutButton />
              </button>
            </SignedIn>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;
