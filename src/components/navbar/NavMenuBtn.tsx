import React, { Dispatch, SetStateAction } from "react";
import "@/styles/navMenuBtn.css";

const NavMenuBtn = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="menu-btn"
      aria-expanded={isOpen}
    >
      <span className="menu-btn-default">
        <span className="menu-line mld-1" />
        <span className="menu-line mld-2" />
      </span>
      <span className="menu-btn-close">
        <span className="menu-line mlc-1" />
        <span className="menu-line mlc-2" />
      </span>
    </button>
  );
};

export default NavMenuBtn;
