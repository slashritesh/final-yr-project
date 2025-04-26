import { Backpack } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="py-5  border-b">
      <div className="mx-12 flex justify-between">
        <Logo />
      <div className="flex gap-5">
        <Button variant={'outline'}>Login</Button>
        <Button>Sign Up</Button>
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
