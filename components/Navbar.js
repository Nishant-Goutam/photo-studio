"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Icons for the menu

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full z-50 h-16 px-6 md:px-10 md:py-3 bg-black/20 backdrop-blur-md text-white">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* LOGO */}
        <Link href="/" className="flex items-center h-full">
          <div className="relative h-10 w-32">
            <Image
              src="/ManiLogo.jpg"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* DESKTOP NAV (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-8 uppercase text-xs tracking-[0.2em] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-gray-400 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* MOBILE HAMBURGER ICON */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 h-screen bg-black z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-serif"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} // Close menu when link is clicked
                className="hover:text-gray-400"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
