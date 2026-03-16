"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Login", href: "/login" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-stone-800 tracking-tight">
          Järbo Råberg 3
        </Link>

        {/* Hamburger button */}
        <button
          className="flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-stone-800 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[7px]" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-stone-800 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-stone-800 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
          />
        </button>
      </div>

      {/* Slide-down menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"}`}
      >
        <nav className="py-4 px-6 flex flex-col gap-4 text-sm font-medium text-stone-600 border-t border-stone-100">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className={`transition-colors hover:text-stone-900 ${pathname === href ? "text-stone-900 font-semibold" : ""}`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={() => setIsOpen(false)}
            className="bg-stone-800 text-white px-4 py-2 rounded-full hover:bg-stone-700 transition-colors text-center"
          >
            Book now
          </Link>
        </nav>
      </div>
    </header>
  );
}
