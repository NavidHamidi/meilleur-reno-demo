import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import AdminNav from "@/components/admin/AdminNav";

export const metadata = { title: "Admin — MeilleureReno" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const role = user.user_metadata?.role as string;
  const isAdmin = role === "admin";

  return (
    <div className="min-h-screen bg-muted/20 flex">
      <AdminNav isAdmin={isAdmin} userEmail={user.email ?? ""} />
      <main className="flex-1 ml-60 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}