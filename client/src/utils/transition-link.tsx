import React, { ReactNode } from "react";
import { NavLink, NavLinkProps, useNavigate } from "react-router-dom";

interface TransitionLinkI extends NavLinkProps {
  children: ReactNode;
  to: string;
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const TransitionLink = ({ children, to, ...props }: TransitionLinkI) => {
  const navigate = useNavigate();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();

    const main = document.getElementById("layout-main");
    main?.classList.add("page-transition");
    await sleep(200);
    navigate(to);
    await sleep(200);
    main?.classList.remove("page-transition");
  };

  return (
    <NavLink to={to} {...props} onClick={handleTransition}>
      {children}
    </NavLink>
  );
};

export default TransitionLink;
