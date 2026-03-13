"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  FileText,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Articles", icon: FileText, exact: false },
  { href: "/admin/media", label: "Médias", icon: ImageIcon, exact: false },
];

export default function AdminNav({
  isAdmin,
  userEmail,
}: {
  isAdmin: boolean;
  userEmail: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-background border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link href="/" className="text-xl font-bold font-serif text-foreground">
          Meilleure<span className="text-primary">Reno</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-0.5">Administration</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive(href, exact)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer utilisateur */}
      <div className="px-4 py-4 border-t border-border space-y-3">
        <div className="px-2">
          <p className="text-xs font-medium text-foreground truncate">
            {userEmail}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            {isAdmin ? "Administrateur" : "Éditeur"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}
