import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PostsTable from "@/components/admin/PostsTable";
export default async function AdminPostsPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { data: user } = await supabase.auth.getUser();
  const isAdmin = user.user?.user_metadata?.role === "admin";

  const { data: posts } = await supabase
    .from("mr_posts")
    .select("id, title, slug, status, category, published_at, updated_at, read_time_min, author_name")
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="text-muted-foreground mt-1">{posts?.length ?? 0} article{(posts?.length ?? 0) > 1 ? "s" : ""} au total</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="rounded-full gap-2">
            <Plus className="w-4 h-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      <PostsTable posts={posts ?? []} isAdmin={isAdmin} />
    </div>
  );
}