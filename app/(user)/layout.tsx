import Navbar from "@/components/Navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <Navbar />
      <div className="mx-12">{children}</div>
    </div>
  );
};

export default UserLayout;
