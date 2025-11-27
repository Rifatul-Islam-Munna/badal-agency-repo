"use client";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d3d4d] text-white rounded-t-3xl mt-12">
      {/* Contact Information Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Email */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              <Mail className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xl font-light opacity-90">Email Address</p>
              <a
                href="mailto:info@badalagency.com"
                className="text-2xl font-normal hover:text-[#a8c547] transition-colors"
              >
                info@badalagency.com
              </a>
            </div>
          </div>

          {/* WhatsApp 1 */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xl font-light opacity-90">whatsapp</p>
              <a
                href="https://wa.me/8801907565617"
                className="text-2xl font-normal hover:text-[#a8c547] transition-colors"
              >
                +8801907565617
              </a>
            </div>
          </div>

          {/* WhatsApp 2 */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7" />
            </div>
            <div>
              <p className="text-xl font-lightopacity-90">whatsapp</p>
              <a
                href="https://wa.me/8801793956816"
                className="text-2xl font-normal hover:text-[#a8c547] transition-colors"
              >
                +8801793956816
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-[2px] bg-[#a8c547]" />
      </div>

      {/* Navigation Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src={"/logo-white.png"}
              width={150}
              height={1500}
              alt="text"
            />
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-12">
            <Link
              href="#about"
              className=" text-xl hover:text-[#a8c547] transition-colors"
            >
              About
            </Link>
            <Link
              href="#services"
              className=" text-xl hover:text-[#a8c547] transition-colors"
            >
              Services
            </Link>
            <Link
              href="#projects"
              className=" text-xl hover:text-[#a8c547] transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className=" text-xl hover:text-[#a8c547] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-[#a8c547] hover:border-[#a8c547] transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-[#a8c547] hover:border-[#a8c547] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-6">
        <div className="h-[2px] bg-[#a8c547]" />
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto px-6 py-6">
        <p className="text-center font-normal text-xl opacity-90">
          © 2025 - All rights reserved by Badal and team
        </p>
      </div>
    </footer>
  );
}
