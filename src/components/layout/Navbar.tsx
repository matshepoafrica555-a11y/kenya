"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { useQuote } from "@/context/QuoteContext";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  Layers,
  Droplets,
  Paintbrush,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { openQuoteModal } = useQuote();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on page route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    {
      name: "Products",
      href: "/products",
      hasDropdown: true,
    },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
  ];

  const productCategories = [
    {
      name: "Tile Adhesives",
      slug: "tile-adhesives",
      desc: "Grip Master economy & Simba Grip C1, C2, C2TES1 grades",
      icon: Layers,
      items: ["Grip Master", "Grip Master Plus", "Simba Grip 555", "Simba Grip 777", "Simba Grip 818"],
    },
    {
      name: "Waterproofing",
      slug: "waterproofing",
      desc: "Ultraguard 2K cementitious & APP membranes",
      icon: Droplets,
      items: ["Ultraguard (25kg & 30kg)", "APP Membrane"],
    },
    {
      name: "Grout",
      slug: "grout",
      desc: "Tile Lit waterproof tile joint grout for durable seals",
      icon: Sparkles,
      items: ["Tile Lit Waterproof Grout"],
    },
    {
      name: "Plaster",
      slug: "plaster",
      desc: "Express Plaster ready-mix for effortless wall rendering",
      icon: Paintbrush,
      items: ["Express Plaster Ready Mix"],
    },
    {
      name: "Flooring",
      slug: "flooring",
      desc: "Cemora architectural microcement flooring systems",
      icon: ShieldCheck,
      items: ["Cemora Microcement Flooring"],
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-md py-2.5 border-b border-slate-200/80"
            : "bg-white py-3.5 border-b border-slate-100 shadow-sm"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href) ||
                    (link.href === "/blog" && pathname.startsWith("/insights"));

              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setProductsDropdownOpen(true)}
                    onMouseLeave={() => setProductsDropdownOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors ${
                        isActive
                          ? "text-[#0875C9] bg-blue-50/70"
                          : "text-[#172333] hover:text-[#0875C9] hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          productsDropdownOpen ? "rotate-180 text-[#0875C9]" : "text-slate-400"
                        }`}
                      />
                    </Link>

                    {/* Rich Products Dropdown */}
                    {productsDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 mt-1 grid grid-cols-5 gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
                        {productCategories.map((cat) => {
                          const IconComp = cat.icon;
                          return (
                            <Link
                              key={cat.name}
                              href={`/products?category=${encodeURIComponent(cat.name)}`}
                              className="group/item p-3 rounded-xl hover:bg-[#F5F8FC] border border-transparent hover:border-blue-100 transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="w-9 h-9 rounded-lg bg-blue-50 text-[#0875C9] flex items-center justify-center mb-2.5 group-hover/item:bg-[#0875C9] group-hover/item:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <h3 className="text-xs font-black text-[#172333] group-hover/item:text-[#0875C9] transition-colors">
                                  {cat.name}
                                </h3>
                                <p className="text-[11px] text-[#637083] mt-1 line-clamp-2 leading-snug">
                                  {cat.desc}
                                </p>
                              </div>
                              <span className="text-[10px] font-bold text-[#0875C9] mt-3 flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                View all <ArrowRight className="w-2.5 h-2.5" />
                              </span>
                            </Link>
                          );
                        })}

                        {/* Dropdown Footer */}
                        <div className="col-span-5 pt-3 mt-1 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                          <span className="text-slate-500 font-medium">
                            Need technical guidance for your project scope?
                          </span>
                          <button
                            onClick={() => openQuoteModal()}
                            className="font-bold text-[#0875C9] hover:underline flex items-center gap-1"
                          >
                            Speak with a Product Engineer <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                    isActive
                      ? "text-[#0875C9] bg-blue-50/70"
                      : "text-[#172333] hover:text-[#0875C9] hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => openQuoteModal()}
              className="btn-yellow px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openQuoteModal()}
              className="btn-yellow px-3 py-1.5 rounded-lg text-[11px] font-bold shadow-xs cursor-pointer"
            >
              QUOTE
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#0875C9] rounded-lg hover:bg-slate-100 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 animate-in slide-in-from-top-4 duration-200 pb-12 shadow-2xl">
          <div className="p-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold ${
                pathname === "/" ? "bg-blue-50 text-[#0875C9]" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold ${
                pathname === "/about" ? "bg-blue-50 text-[#0875C9]" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              About Us
            </Link>

            {/* Products Accordion in Mobile */}
            <div>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-bold ${
                    pathname.startsWith("/products") ? "text-[#0875C9]" : "text-slate-800"
                  }`}
                >
                  Products
                </Link>
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="p-1 text-slate-500"
                  aria-label="Toggle products categories"
                >
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      mobileProductsOpen ? "rotate-180 text-[#0875C9]" : ""
                    }`}
                  />
                </button>
              </div>

              {mobileProductsOpen && (
                <div className="pl-4 pr-2 py-2 space-y-1 bg-[#F5F8FC] rounded-xl mx-2 mb-2">
                  {productCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:text-[#0875C9] rounded-lg"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-xs font-bold text-[#0875C9] uppercase tracking-wider"
                  >
                    View All 10 Products →
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold ${
                pathname.startsWith("/blog") || pathname.startsWith("/insights")
                  ? "bg-blue-50 text-[#0875C9]"
                  : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-bold ${
                pathname === "/contact" ? "bg-blue-50 text-[#0875C9]" : "text-slate-800 hover:bg-slate-50"
              }`}
            >
              Contact Us
            </Link>

            {/* Mobile Quote Button */}
            <div className="pt-4 px-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openQuoteModal();
                }}
                className="w-full btn-yellow py-3.5 rounded-xl font-black text-center text-sm shadow-md"
              >
                REQUEST A QUOTE →
              </button>
            </div>

            {/* Mobile Contact Quick Links */}
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-900">Direct Contacts — Nairobi, Kenya</div>
              <a href="tel:+254757775555" className="flex items-center gap-2 text-slate-700 font-medium">
                <Phone className="w-3.5 h-3.5 text-[#0875C9]" /> 0757 775 555
              </a>
              <a href="mailto:simba@matshepo.com" className="flex items-center gap-2 text-slate-700 font-medium">
                <Mail className="w-3.5 h-3.5 text-[#0875C9]" /> simba@matshepo.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
