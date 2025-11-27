"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RainbowButton } from "@/components/ui/rainbow-button";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#work" },
    { name: "Service", href: "#work" },
    { name: "Project", href: "#work" },
    { name: "Contact", href: "#work" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100/50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4  ">
        {/* Logo */}
        <div className="relative w-32 md:w-40 shrink-0">
          <Image
            src="/logo.png"
            width={200}
            height={60}
            className="w-full h-auto object-contain"
            alt="Agency Logo"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-base lg:text-lg font-medium text-text-blue hover:text-soft-green transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        {/* Added flex, items-center, justify-center, and leading-none to fix text alignment */}
        <button className="hidden md:inline-flex h-12 px-16 rounded-full bg-soft-green hover:bg-soft-green/90 text-white text-lg font-normal items-center justify-center transition-transform hover:scale-105 active:scale-95">
          <a
            className=" w-full h-full flex justify-center items-center"
            href="mailto:badaldotagency@gmail.com"
          >
            Lets Talk
          </a>
        </button>

        {/* Mobile Menu (Shadcn Sheet) */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-text-blue hover:bg-transparent hover:text-soft-green p-0"
              >
                <Menu className="h-8 w-8" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] border-l-gray-100 px-3"
            >
              <SheetHeader className="text-left border-b border-gray-100 pb-6 mb-6">
                <SheetTitle>
                  <div className="w-32 relative">
                    <Image
                      src="/agency-logo.png"
                      width={150}
                      height={50}
                      className="w-full h-auto object-contain"
                      alt="Agency Logo"
                    />
                  </div>
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl font-medium text-text-blue hover:text-soft-green transition-colors py-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-4">
                  <Button
                    className="w-full h-12 rounded-full bg-soft-green hover:bg-soft-green/90 text-white text-lg font-normal inline-flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Lets Talk
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
