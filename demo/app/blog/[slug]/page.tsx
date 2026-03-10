/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/supabaseServer";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowLeft, Calendar } from "lucide-react";
import {
  CATEGORY_LABELS,
  type PostCategory,
  type PostWithCover,
} from "@/lib/supabase/posts";
import PostContent from "@/components/blog/PostContent";
import FooterCTA from "@/components/landing/FooterCTA";

// ── Génération des métadonnées SEO ────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("mr_posts_published")
    .select("title, excerpt, meta_title, meta_description, cover_image_url")
    .eq("slug", slug)
    .single();

  if (!post) return { title: "Article introuvable" };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : [],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("mr_posts_published")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!post) notFound();

  // Articles similaires (même catégorie, hors article courant)
  const { data: related } = await supabase
    .from("mr_posts_published")
    .select(
      "id, title, slug, excerpt, category, published_at, read_time_min, cover_image_url",
    )
    .eq("category", post.category)
    .neq("slug", slug)
    .limit(3);

  const p = post as PostWithCover;

  return (
    <main className="min-h-screen bg-background">
      {/* ── HERO IMAGE ── */}
      {p.cover_image_url && (
        <div className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden">
          <Image
            src={p.cover_image_url}
            alt={p.cover_image_alt ?? p.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
      )}

      {/* ── CONTENU ── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête article */}
        <div
          className={`space-y-6 ${p.cover_image_url ? "-mt-24 relative z-10" : "pt-32"}`}
        >
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au blog
          </Link>

          {/* Catégorie */}
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
            {CATEGORY_LABELS[p.category as PostCategory]}
          </span>

          {/* Titre */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {p.title}
          </h1>

          {/* Extrait */}
          <p className="text-xl text-muted-foreground leading-relaxed">
            {p.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-8 border-b border-border">
            <span className="font-medium text-foreground">{p.author_name}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            {p.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(p.published_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {p.read_time_min} min de lecture
            </span>
          </div>
        </div>

        {/* Corps de l'article (rendu Tiptap JSON) */}
        <div className="py-10">
          <PostContent content={p.content} />
        </div>

        {/* CTA inline */}
        <div className="my-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
            Vous avez un projet ?
          </p>
          <h2 className="text-2xl font-bold tracking-tight">
            Faites estimer votre rénovation gratuitement
          </h2>
          <p className="text-muted-foreground">
            Un expert Meilleure Réno vous répond sous 24h.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
          >
            Je démarre mon projet →
          </Link>
        </div>
      </div>

      {/* ── ARTICLES SIMILAIRES ── */}
      {related && related.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 mt-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Dans la même catégorie
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item: any) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="group block bg-background rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {item.cover_image_url && (
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={item.cover_image_url}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-2">
                    <span className="text-xs font-semibold tracking-wider uppercase text-primary">
                      {CATEGORY_LABELS[item.category as PostCategory]}
                    </span>
                    <h3 className="font-bold leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                      <Clock className="w-3 h-3" />
                      {item.read_time_min} min
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA FOOTER ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <FooterCTA />
      </section>
    </main>
  );
}
