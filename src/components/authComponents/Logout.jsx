"use client";
import { logout } from "@/app/actions";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { UserContext } from "@/app/user-context";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(UserContext);
  const onSubmit = (event) => {
    event.preventDefault();
    try {
      const response = logout();
      setIsLoggedIn(false);
      router.push("/");
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <Button className="mx-2" type="submit">
          Logout
        </Button>
      </form>
    </div>
  );
}

export default Logout;
