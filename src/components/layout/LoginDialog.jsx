"use client";
/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SocialLogin from "../authComponents/SocialLogin";
import LoginForm from "../authComponents/LoginForm";
import RegistrationForm from "../authComponents/RegistrationForm";
import { UserContext } from "@/app/user-context";
import Logout from "../authComponents/Logout";

const LoginDialog = () => {
  const { user } = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(user);
  useEffect(() => {
    setIsLoggedIn(user);
  }, [user]);
  console.log(user, "checking user context");
  return (
    <>
      {isLoggedIn ? (
        <Logout />
      ) : (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mx-2" variant="outline">
                Login / SignUp
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:w-fit">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Login / SignUp
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">SignUp</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="signup">
                  <RegistrationForm />
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <SocialLogin />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default LoginDialog;
