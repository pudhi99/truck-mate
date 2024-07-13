import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "./theme/ModeToggle";

function Navbar() {
  return (
    <div className="bg-navbar">
      <div className="container h-16 sticky top-0 w-full flex">
        <div className="w-1/2">
          <Logo />
        </div>
        <div className="w-1/2 h-full flex justify-end items-center">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
