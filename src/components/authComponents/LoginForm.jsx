"use client";
import { doCredentialLogin, doSocialLogin } from "@/app/actions";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserContext } from "@/app/user-context";
import { InputOtp } from "./InputOtp";
import bcrypt from "bcryptjs";
import { toast } from "../ui/use-toast";
function LoginForm() {
  const { setIsLoggedIn } = useContext(UserContext);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(""); // State to hold email for OTP
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [value, setValue] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (!!response.error) {
        console.error(response.error);
        setError(response.error.message);
      } else {
        setIsLoggedIn(true);
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  const generateOtp = async () => {
    if (!email) {
      setError("Please enter your email to generate OTP.");
      return;
    } else {
      setError("");
    }

    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    setOtp(generatedOtp); // Store the OTP in state

    try {
      const response = await fetch(`/api/email`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, otp: generatedOtp }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        setError(error);
      } else {
        const { message } = await response.json();
        console.log(message);
        toast({
          description: "Enter Your OTP",
        });
        setShowOtpInput(true);
      }

      response.status === 201 && router.push("/");
    } catch (e) {
      setError(e.message);
    }
  };

  const ValidateOTP = async () => {
    if (value != otp) {
      setError("OTP is not correct");
      return;
    } else {
      setShowPasswordInput(true);
      toast({
        description: "OTP matched",
      });
      setError("");
    }
  };
  const submitPassword = async () => {
    const hashedPassword = await bcrypt.hash(password, 5);
    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: hashedPassword }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("Updated user:", updatedUser);
        toast({
          description: "user updated successfully",
        });
        setShowForgetPassword(false);
        // Handle successful update, e.g., show a success message
      } else {
        const { error } = await response.json();
        console.error("Error updating profile:", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        });
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      setError("Error updating password");
      console.error("Error updating profile:", error);
    }
  };
  return (
    <>
      {showForgetPassword ? (
        <Card>
          <CardHeader>
            <CardTitle>Reset password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <Button
              className="bg-secondary"
              type="button"
              onClick={() => generateOtp()}
            >
              Generate Otp
            </Button>
            {showOtpInput && (
              <>
                <div className="space-y-1 ">
                  <InputOtp value={value} setValue={setValue} />
                </div>
                <div className="text-center">
                  <Button
                    className="bg-secondary"
                    type="button"
                    onClick={() => ValidateOTP()}
                  >
                    Validate OTP
                  </Button>
                </div>
              </>
            )}
            {showPasswordInput && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <Button type="button" onClick={() => submitPassword()}>
                  Submit
                </Button>
              </>
            )}
            <div className="space-y-1">
              <Button
                variant="link"
                type="button"
                onClick={() => setShowForgetPassword(false)}
              >
                Login
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <form className="" onSubmit={onSubmit}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue="admin@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  defaultValue="12345"
                />
              </div>
              <div className="space-y-1">
                <Button
                  variant="link"
                  type="button"
                  onClick={() => setShowForgetPassword(true)}
                >
                  Forgot password
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      )}
      <div className="text-xl text-red-500">{error}</div>
      {/* <SocialLogin /> */}
    </>
  );
}

export default LoginForm;
