import { logout } from "@/app/actions";
import React from "react";
import { Button } from "../ui/button";

function Logout() {
  return (
    <div>
      <form action={logout}>
        <Button className="mx-2" type="submit">
          Logout
        </Button>
      </form>
    </div>
  );
}

export default Logout;
