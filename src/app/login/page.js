/* eslint-disable react/no-unescaped-entities */
import LoginForm from "@/components/authComponents/LoginForm";
import SocialLogin from "@/components/authComponents/SocialLogin";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="container gap-6 min-h-[calc(100vh-70px)] flex flex-col items-center justify-center">
      <LoginForm />
      <SocialLogin />
      <p className="my-3">
        Don't you have an account?
        <Link href="register" className="mx-2 underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default page;
