"use client";

import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const RegistrationForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`/api/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log(response);
      if (!response.ok) {
        const { error } = await response.json();
        console.log(error);
        setErrorMessage(error);
      } else {
        const { message } = await response.json();
        console.log(message);
      }
      response.status === 201 && router.push("/");
    } catch (e) {
      console.log(e.message);
      setErrorMessage(e.message);
    }
  }

  return (
    <>
      <Card>
        <form className="" onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Name</Label>
              <Input type="text" name="name" id="name" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" id="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Register</Button>
          </CardFooter>
        </form>
      </Card>

      {/* <p className="text-red-500 text-base text-center">{errorMessage}</p> */}
    </>
  );
};

export default RegistrationForm;
