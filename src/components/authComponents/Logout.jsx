import { logout } from "@/app/actions";
import React from "react";

function Logout() {
  return (
    <div>
      <form action={logout}>
        <button className="bg-slate-500 rounded-md p-3" type="submit">
          Logout
        </button>
      </form>
    </div>
  );
}

export default Logout;
