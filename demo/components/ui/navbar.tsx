"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  Home,
  Leaf,
  Euro,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Valeur Verte",
    href: "#",
    hasDropdown: true,
    children: [
      {
        label: "Isolation des combles",
        href: "/services/combles",
        icon: <Home className="w-4 h-4" />,
        description: "Jusqu'à 30 % de pertes évitées",
      },
      {
        label: "Isolation des murs",
        href: "/services/murs",
        icon: <Zap className="w-4 h-4" />,
        description: "ITE / ITI, artisans RGE",
      },
      {
        label: "Audit énergétique",
        href: "/services/audit",
        icon: <Leaf className="w-4 h-4" />,
        description: "Diagnostic & plan de travaux",
      },
      {
        label: "Aides & financement",
        href: "/services/aides",
        icon: <Euro className="w-4 h-4" />,
        description: "MaPrimeRénov', CEE, éco-PTZ",
      },
    ],
  },
  { label: "Comment ça marche", href: "/#process" },
  { label: "Témoignages", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/98 shadow-sm backdrop-blur-md border-b border-border"
            : "bg-white/90 backdrop-blur-sm",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                Meilleure<span className="text-primary">Reno</span>
              </span>
            </Link>

            {/* Navigation desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                        dropdownOpen && "text-foreground bg-muted/60",
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          dropdownOpen && "rotate-180",
                        )}
                      />
                    </button>

                    {/* Dropdown */}
                    <div
                      className={cn(
                        "absolute top-full left-0 mt-1 w-72 rounded-xl border border-border bg-white shadow-lg overflow-hidden transition-all duration-200 origin-top-left",
                        dropdownOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
                      )}
                    >
                      <div className="p-2">
                        {link.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/5 group/item transition-colors duration-150"
                          >
                            <div className="mt-0.5 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover/item:bg-primary group-hover/item:text-white transition-colors duration-150">
                              {child.icon}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-foreground group-hover/item:text-primary transition-colors duration-150">
                                {child.label}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {child.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="px-4 py-3 bg-muted/40 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          Artisans{" "}
                          <span className="font-semibold text-primary">
                            RGE certifiés
                          </span>{" "}
                          — dossiers d&apos;aides gérés pour vous
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                      pathname === link.href && "text-foreground bg-muted/60",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            {/* Actions desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/auth/login">
                <Button
                  size="sm"
                  className="text-sm font-medium rounded-full hover:shadow-md transition-shadow"
                >
                  Espace client
                </Button>
              </Link>
              <Link href="/survey">
                <Button
                  size="sm"
                  className="text-sm font-medium rounded-full px-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                  Simuler mes aides
                </Button>
              </Link>
            </div>

            {/* Burger mobile */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-muted/60 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 border-t border-border bg-white",
            mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="px-4 py-4 space-y-1">
            {/* Services avec sous-items */}
            <div>
              <button
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted/60 transition-colors"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                Nos services
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    dropdownOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  dropdownOpen ? "max-h-80 mt-1" : "max-h-0",
                )}
              >
                <div className="pl-3 space-y-1">
                  {NAV_LINKS[0].children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <span className="text-primary">{child.icon}</span>
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground bg-muted/60"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* CTA mobile */}
            <div className="pt-3 space-y-2 border-t border-border mt-2">
              <Link href="/auth/login" className="block">
                <Button variant="outline" size="sm" className="w-full rounded-full">
                  Espace client
                </Button>
              </Link>
              <Link href="/survey" className="block">
                <Button size="sm" className="w-full rounded-full">
                  <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                  Simuler mes aides gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer pour compenser la navbar fixed */}
      <div className="h-16 lg:h-18" />
    </>
  );
}
