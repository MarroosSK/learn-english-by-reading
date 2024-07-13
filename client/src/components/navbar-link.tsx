import { useLocation } from "react-router-dom";
import { NavbarLinkI } from "../types/types";
import { cn } from "../lib/utils";
import TransitionLink from "../utils/transition-link";

const NavbarLink = ({ ...link }: NavbarLinkI) => {
  const { pathname } = useLocation();

  return (
    <TransitionLink
      to={link.path}
      className={cn(
        "relative group transition duration-300 text-stone-500",
        pathname === link.path && "text-sky-800 font-bold"
      )}
    >
      {link.title}
      <span className="text-sky-800 absolute top-0 left-1/2 w-0 h-0.5 bg-current transition-all duration-500 group-hover:left-0 group-hover:w-1/2"></span>
      <span className="text-sky-800 absolute top-0 right-1/2 w-0 h-0.5 bg-current transition-all duration-500 group-hover:right-0 group-hover:w-1/2"></span>
    </TransitionLink>
  );
};

export default NavbarLink;
