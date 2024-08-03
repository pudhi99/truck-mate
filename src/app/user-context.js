"use client";

import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null); // Store user data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user); // Set user data from session
      setIsLoggedIn(true); // User is logged in
    } else {
      setUser(null); // Clear user data if not authenticated
      setIsLoggedIn(false); // User is not logged in
    }
  }, [session, status]); // Update when session or status changes

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
