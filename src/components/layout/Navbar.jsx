import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "./theme/ModeToggle";
import LoginForm from "../authComponents/LoginForm";
import LoginDialog from "./LoginDialog";
import { auth } from "@/auth";
import Logout from "../authComponents/Logout";

async function Navbar() {
  const session = await auth();
  return (
    <div className="bg-navbar">
      <div className="container h-16 sticky top-0 w-full flex">
        <div className="w-1/2">
          <Logo />
        </div>
        <div className="w-1/2 h-full flex justify-end items-center">
          {/* {!!session?.user === true ? <Logout /> : <LoginDialog />} */}
          <LoginDialog />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
