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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const LoginDialog = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <HamburgerMenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <Link href={"/market"}>
              <DropdownMenuItem>Market</DropdownMenuItem>
            </Link>
            {isLoggedIn ? (
              <>
                <Link href={"/dashboard"}>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <Link href={"/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>{" "}
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoggedIn ? (
        <Logout />
      ) : (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mx-2" variant="outline">
                SignIn
              </Button>
            </DialogTrigger>
            <DialogContent className="md:w-fit">
              <DialogHeader>
                <DialogTitle className="text-center">
                  Login / SignUp
                </DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="account" className="md:w-[400px]">
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
