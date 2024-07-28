import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import Logout from "@/components/authComponents/Logout";
import LoadForm from "@/components/contractor/LoadForm";
const Dashboard = async () => {
  const session = await auth();
  console.log(session, "checking session");
  if (!session?.user) redirect("/");
  return (
    <div className="flex flex-col items-center w-full">
      <LoadForm />
    </div>
  );
};

export default Dashboard;
