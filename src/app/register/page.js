import React from "react";

import Link from "next/link";
import RegistrationForm from "@/components/authComponents/RegistrationForm";
import SocialLogin from "@/components/authComponents/SocialLogin";

const RegisterPage = () => {
  return (
    <div className="container gap-6 min-h-[calc(100vh-70px)] flex flex-col items-center justify-center">
      <RegistrationForm />
      <SocialLogin />
      <p className="">
        Already have an account?
        <Link href="/login" className="mx-2 underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
