// app/admin/layout.tsx
// Protection gérée par le middleware — le layout récupère juste la session

import { createServerClient } from "@/lib/supabase/server";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Admin — MeilleureReno" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const role = user?.user_metadata?.role as string;
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-muted/20 flex">
      <AdminNav isAdmin={isAdmin} userEmail={user?.email ?? ""} />
      <main className="flex-1 ml-60 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}