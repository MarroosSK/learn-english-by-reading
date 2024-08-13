import React from "react";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

import NavbarLink from "./navbar-link";
import { NavbarLinkI } from "../types/types";
import { navbarData } from "../constants/navbar-data";
import { Button } from "./ui/button";

interface NavbarDesktopI {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const NavbarDesktop = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: NavbarDesktopI) => {
  return (
    <>
      <div className="hidden md:flex lg:items-center gap-5 text-sm">
        {navbarData.map((link: NavbarLinkI) => (
          <NavbarLink
            key={link.title}
            {...link}
            data-id={`navbar-link-${link.title}`}
          />
        ))}
      </div>

      <div className="hidden md:flex items-center gap-x-2">
        <input
          type="text"
          placeholder="type and press enter"
          className="px-4 py-2 rounded-md border border-stone-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          data-id="search-input"
        />
        <SignedOut>
          <Button
            className="bg-sky-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-sky-800 transition-all ease-in-out"
            data-id="sign-in-btn"
            asChild
          >
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <Button
            className="bg-stone-800 text-lg px-4 py-2 rounded-md hover:bg-stone-300 text-white hover:text-red-800 transition-all ease-in-out"
            data-id="sign-out-btn"
            asChild
          >
            <SignOutButton />
          </Button>
        </SignedIn>
      </div>
    </>
  );
};

export default NavbarDesktop;
