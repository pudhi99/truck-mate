import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Logout from "@/components/authComponents/Logout";
const Dashboard = async () => {
  const session = await auth();
  if (!session?.user) redirect("/");
  return (
    <div className="flex flex-col items-center w-full">
      <h1>Welcome to Dashboard</h1>
      <h1>{session?.user?.name}</h1>
      <Image
        src={session?.user?.image}
        alt="user logo"
        height={70}
        width={70}
        className="rounded-full"
      />
      <Logout />
    </div>
  );
};

export default Dashboard;
