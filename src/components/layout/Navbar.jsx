import React from "react";
import Logo from "./Logo";
import { ModeToggle } from "./theme/ModeToggle";
import LoginForm from "../authComponents/LoginForm";
import LoginDialog from "./LoginDialog";
import { auth } from "@/auth";
import Logout from "../authComponents/Logout";
import { Button } from "../ui/button";
import Link from "next/link";

async function Navbar() {
  const session = await auth();
  return (
    <div className="bg-navbar px-3 md:px-0">
      <div className="md:container  h-16 sticky top-0 w-full flex">
        <div className="w-1/2">
          <Logo />
        </div>
        <div className="w-1/2 h-full flex justify-between items-center">
          {/* {!!session?.user === true ? <Logout /> : <LoginDialog />} */}
          <div className="hidden md:block flex-1">
            <Link href="/market/hyderabad">
              <Button variant="secondary" color="primary">
                Market
              </Button>
            </Link>
          </div>
          <div className="flex w-full  justify-end">
            <LoginDialog />
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
