import { createClient } from "@/lib/supabase/supabaseServer";
import MediaLibrary from "@/components/admin/MediaLibrary";
import type { Media } from "@/lib/supabase/posts";

export default async function AdminMediaPage() {
  const supabase = await createClient();

  const { data: media } = await supabase
    .from("mr_media")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Médias</h1>
        <p className="text-muted-foreground mt-1">
          {media?.length ?? 0} fichier{(media?.length ?? 0) > 1 ? "s" : ""} uploadé{(media?.length ?? 0) > 1 ? "s" : ""}
        </p>
      </div>

      <MediaLibrary initialMedia={(media ?? []) as Media[]} />
    </div>
  );
}