import { supabase } from "@/lib/supabase/supabase";

// ── Types ─────────────────────────────────────────────────────────────────

export type PostStatus = "draft" | "published";
export type PostCategory =
  | "aides-financement"
  | "isolation"
  | "chauffage"
  | "dpe-audit"
  | "renovation-globale";

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  "aides-financement": "Aides & Financement",
  isolation: "Isolation",
  chauffage: "Chauffage",
  "dpe-audit": "DPE & Audit",
  "renovation-globale": "Rénovation globale",
};

export type Post = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: object; // Tiptap JSON
  category: PostCategory;
  status: PostStatus;
  published_at: string | null;
  cover_image_id: string | null;
  read_time_min: number;
  author_name: string;
  meta_title: string | null;
  meta_description: string | null;
  created_by: string | null;
  updated_by: string | null;
};

export type PostWithCover = Post & {
  cover_image_url: string | null;
  cover_image_alt: string | null;
};

export type Media = {
  id: string;
  created_at: string;
  filename: string;
  storage_path: string;
  public_url: string;
  mime_type: string;
  size_bytes: number;
  alt: string;
  caption: string | null;
  width: number | null;
  height: number | null;
};

export type CreatePostInput = Omit<
  Post,
  "id" | "created_at" | "updated_at" | "created_by" | "updated_by"
>;

export type UpdatePostInput = Partial<CreatePostInput>;

// ── Utilitaires ───────────────────────────────────────────────────────────

export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Posts — lecture publique ───────────────────────────────────────────────

/** Tous les articles publiés (via la vue, avec cover_image_url) */
export async function getPublishedPosts(): Promise<PostWithCover[]> {
  const { data, error } = await supabase
    .from("mr_posts_published")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data as PostWithCover[];
}

/** Un article publié par slug */
export async function getPublishedPostBySlug(
  slug: string
): Promise<PostWithCover | null> {
  const { data, error } = await supabase
    .from("mr_posts_published")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data as PostWithCover;
}

/** Articles publiés par catégorie */
export async function getPublishedPostsByCategory(
  category: PostCategory
): Promise<PostWithCover[]> {
  const { data, error } = await supabase
    .from("mr_posts_published")
    .select("*")
    .eq("category", category)
    .order("published_at", { ascending: false });

  if (error) throw error;
  return data as PostWithCover[];
}

// ── Posts — lecture CMS (admin/editor) ────────────────────────────────────

/** Tous les articles (brouillons inclus) — réservé CMS */
export async function getAllPosts(): Promise<PostWithCover[]> {
  const { data, error } = await supabase
    .from("mr_posts")
    .select(
      `*, mr_media!cover_image_id(public_url, alt)`
    )
    .order("updated_at", { ascending: false });

  if (error) throw error;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data ?? []).map((row: any) => ({
    ...row,
    cover_image_url: row.mr_media?.public_url ?? null,
    cover_image_alt: row.mr_media?.alt ?? null,
  }));
}

/** Un article par ID — réservé CMS */
export async function getPostById(id: string): Promise<PostWithCover | null> {
  const { data, error } = await supabase
    .from("mr_posts")
    .select(`*, mr_media!cover_image_id(public_url, alt)`)
    .eq("id", id)
    .single();

  if (error) return null;

  return {
    ...data,
    cover_image_url: data.mr_media?.public_url ?? null,
    cover_image_alt: data.mr_media?.alt ?? null,
  } as PostWithCover;
}

// ── Posts — écriture ──────────────────────────────────────────────────────

export async function createPost(
  input: CreatePostInput
): Promise<Post> {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("mr_posts")
    .insert({ ...input, created_by: user?.id, updated_by: user?.id })
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

export async function updatePost(
  id: string,
  input: UpdatePostInput
): Promise<Post> {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("mr_posts")
    .update({ ...input, updated_by: user?.id })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Post;
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from("mr_posts").delete().eq("id", id);
  if (error) throw error;
}

/** Bascule le statut draft ↔ published */
export async function togglePostStatus(
  id: string,
  currentStatus: PostStatus
): Promise<Post> {
  const newStatus: PostStatus =
    currentStatus === "published" ? "draft" : "published";

  return updatePost(id, {
    status: newStatus,
    published_at:
      newStatus === "published" ? new Date().toISOString() : undefined,
  });
}

// ── Media ─────────────────────────────────────────────────────────────────

/** Upload une image dans Supabase Storage et crée l'entrée mr_media */
export async function uploadMedia(
  file: File,
  alt: string
): Promise<Media> {
  const { data: { user } } = await supabase.auth.getUser();
  const ext = file.name.split(".").pop();
  const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  // 1. Upload dans Storage
  const { error: uploadError } = await supabase.storage
    .from("mr-media")
    .upload(path, file, { contentType: file.type, upsert: false });

  if (uploadError) throw uploadError;

  // 2. Récupérer l'URL publique
  const { data: urlData } = supabase.storage
    .from("mr-media")
    .getPublicUrl(path);

  // 3. Créer l'entrée en base
  const { data, error } = await supabase
    .from("mr_media")
    .insert({
      filename: file.name,
      storage_path: path,
      public_url: urlData.publicUrl,
      mime_type: file.type,
      size_bytes: file.size,
      alt,
      uploaded_by: user?.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Media;
}

export async function deleteMedia(media: Media): Promise<void> {
  await supabase.storage.from("mr-media").remove([media.storage_path]);
  await supabase.from("mr_media").delete().eq("id", media.id);
}

export async function getAllMedia(): Promise<Media[]> {
  const { data, error } = await supabase
    .from("mr_media")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Media[];
}