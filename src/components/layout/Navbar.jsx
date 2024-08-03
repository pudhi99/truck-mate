"use client";
import React, { useContext, useEffect, useState } from "react";
import Logo from "./Logo";
import { ModeToggle } from "./theme/ModeToggle";
import LoginForm from "../authComponents/LoginForm";
import LoginDialog from "./LoginDialog";

import Logout from "../authComponents/Logout";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserContext } from "@/app/user-context";
import { useSession } from "next-auth/react";

function Navbar() {
  const { isLoggedIn } = useContext(UserContext);
  // const { data: session, status } = useSession();
  // useEffect(() => {
  //   console.log(status, "checking user");
  //   setUser(status === "authenticated");
  // }, [user, status]);
  return (
    <div className="bg-navbar backdrop-blur-sm px-3 md:px-0 sticky z-10 top-0">
      <div className="md:container h-16 w-full flex">
        <div className="w-1/2">
          <Logo />
        </div>
        <div className="w-1/2 h-full flex justify-between items-center">
          <div className="hidden md:block flex-1">
            <div className="flex gap-2">
              <div>
                <Link href="/market">
                  <Button variant="secondary" color="primary">
                    Market
                  </Button>
                </Link>
              </div>
              {isLoggedIn ? (
                <>
                  <div>
                    <Link href="/dashboard">
                      <Button variant="secondary" color="primary">
                        Dashboard
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <Link href="/profile">
                      <Button variant="secondary" color="primary">
                        Profile
                      </Button>
                    </Link>
                  </div>
                </>
              ) : null}
            </div>
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
