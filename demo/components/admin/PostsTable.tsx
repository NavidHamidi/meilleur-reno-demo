"use client";

import { useState } from "react";
import Link from "next/link";
import { togglePostStatus, deletePost, CATEGORY_LABELS, type PostCategory } from "@/lib/supabase/posts";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published";
  category: PostCategory;
  published_at: string | null;
  updated_at: string;
  read_time_min: number;
};

export default function PostsTable({
  posts: initialPosts,
  isAdmin,
}: {
  posts: PostRow[];
  isAdmin: boolean;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleToggle(post: PostRow) {
    setLoadingId(post.id);
    try {
      const updated = await togglePostStatus(post.id, post.status);
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, status: updated.status, published_at: updated.published_at } : p
        )
      );
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(post: PostRow) {
    if (!confirm(`Supprimer "${post.title}" ? Cette action est irréversible.`)) return;
    setLoadingId(post.id);
    try {
      await deletePost(post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    } finally {
      setLoadingId(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-2xl">
        <p className="mb-3">Aucun article pour l&apos;instant.</p>
        <Link href="/admin/posts/new">
          <Button className="rounded-full">Créer le premier article</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-background">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Titre</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Catégorie</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Statut</th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Modifié</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-muted/30 transition-colors group">
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-foreground">{post.title}</span>
                  {post.status === "published" && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-mono">/blog/{post.slug}</span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {CATEGORY_LABELS[post.category]}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                  post.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    post.status === "published" ? "bg-green-500" : "bg-amber-500"
                  }`} />
                  {post.status === "published" ? "Publié" : "Brouillon"}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground text-xs">
                {new Date(post.updated_at).toLocaleDateString("fr-FR", {
                  day: "numeric", month: "short", year: "numeric",
                })}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1 justify-end">
                  {/* Toggle publié/brouillon */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-foreground"
                    disabled={loadingId === post.id}
                    onClick={() => handleToggle(post)}
                    title={post.status === "published" ? "Dépublier" : "Publier"}
                  >
                    {post.status === "published"
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />
                    }
                  </Button>

                  {/* Éditer */}
                  <Link href={`/admin/posts/${post.id}/edit`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      title="Modifier"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>

                  {/* Supprimer (admin seulement) */}
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-destructive"
                      disabled={loadingId === post.id}
                      onClick={() => handleDelete(post)}
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}