"use client";
import { Backpack, UserCircle2 } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

const Navbar = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();

  return (
    <div className="py-5  border-b">
      <div className="mx-12 flex justify-between">
        <Logo />
        <div className="flex gap-5">
          {isAuthenticated ? (
            <div className="flex items-center gap-5">
              <div className="space-x-5">
                <Link className={buttonVariants({variant:'ghost'})} href={''}>My Projects</Link>
                <Link className={buttonVariants({variant:'default'})} href={''}>New Project</Link>
              </div>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={user?.picture || ""}
                    alt={user?.given_name || "User"}
                  />
                  <AvatarFallback>
                    <UserCircle2 className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <LogoutLink>
                <Button variant="outline">Logout</Button>
              </LogoutLink>
            </div>
          ) : (
            <>
              <LoginLink>
                <Button variant="outline">Login</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Sign Up</Button>
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const Logo = () => {
  return (
    <div className="flex gap-3 items-center">
      <div className="h-10 w-10 rounded-sm flex justify-center items-center bg-primary">
        <Backpack scale={2} />
      </div>
      <div className="flex flex-col leading-none">
        <span>Campus</span>
        <span>Circle.</span>
      </div>
    </div>
  );
};
