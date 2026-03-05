/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Eye, PenLine, Plus } from "lucide-react";
import { CATEGORY_LABELS, type PostCategory } from "@/lib/supabase/posts";

async function getDashboardStats(supabase: any) {
  const [
    { count: total },
    { count: published },
    { count: draft },
    { data: recent },
  ] = await Promise.all([
    supabase.from("mr_posts").select("*", { count: "exact", head: true }),
    supabase.from("mr_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("mr_posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("mr_posts").select("id, title, status, category, updated_at").order("updated_at", { ascending: false }).limit(5),
  ]);

  return { total, published, draft, recent };
}

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { total, published, draft, recent } = await getDashboardStats(supabase);

  const stats = [
    { label: "Articles total", value: total ?? 0, icon: FileText },
    { label: "Publiés", value: published ?? 0, icon: Eye },
    { label: "Brouillons", value: draft ?? 0, icon: PenLine },
  ];

  return (
    <div className="space-y-8 max-w-4xl">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Interface de gestion du blog.</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="border-border">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Articles récents */}
      <Card className="border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold">Dernières modifications</CardTitle>
          <Link href="/admin/posts" className="text-sm text-primary hover:underline">
            Voir tout →
          </Link>
        </CardHeader>
        <CardContent className="space-y-1">
          {(recent ?? []).length === 0 && (
            <p className="text-sm text-muted-foreground py-4 text-center">
              Aucun article pour l&aposinstant.{" "}
              <Link href="/admin/posts/new" className="text-primary hover:underline">
                Créer le premier →
              </Link>
            </p>
          )}
          {(recent ?? []).map((post: any) => (
            <Link
              key={post.id}
              href={`/admin/posts/${post.id}/edit`}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${
                  post.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {post.status === "published" ? "Publié" : "Brouillon"}
                </span>
                <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                  {post.title}
                </span>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 ml-4">
                {CATEGORY_LABELS[post.category as PostCategory]}
              </span>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}