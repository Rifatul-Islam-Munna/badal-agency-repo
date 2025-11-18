import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <div className="  max-w-7xl mx-auto flex justify-between items-center py-8">
      <h1 className=" font-semibold text-4xl text-text-blue">Badal</h1>
      <div className=" flex justify-between items-center gap-6 text-text-blue">
        <Link href={"#"}>About</Link>
        <Link href={"#"}>Service</Link>
        <Link href={"#"}>Project</Link>
        <Link href={"#"}>Contact</Link>
      </div>
      <Button className=" font-normal text-xl px-12 py-4 rounded-full bg-soft-green hover:bg-soft-green/90 cursor-pointer">
        Lets Talk
      </Button>
    </div>
  );
};

export default NavBar;
