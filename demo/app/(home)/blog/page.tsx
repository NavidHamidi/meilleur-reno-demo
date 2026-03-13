import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import FooterCTA from "@/components/landing/FooterCTA";
import { getAllPosts } from "@/lib/supabase/posts";

/* ── DONNÉES ─────────────────────────────────────────────────────── */

const categories = [
  "Tous les articles",
  "Aides & Financement",
  "Isolation",
  "Chauffage",
  "DPE & Audit",
  "Rénovation globale",
];
/*
const featuredPost = {
  slug: "maprimerénov-2026-guide-complet",
  category: "Aides & Financement",
  title: "MaPrimeRénov' 2026 : le guide complet pour ne rien rater",
  excerpt:
    "Parcours accompagné, parcours par geste, nouvelles exclusions… Le dispositif a beaucoup évolué. On fait le point sur ce qui change vraiment pour votre projet de rénovation cette année.",
  image: "/interieur.webp",
  date: "28 février 2026",
  readTime: "8 min",
  author: "Laura Bornert",
};

const posts = [
  {
    slug: "isolation-combles-pertes-chaleur",
    category: "Isolation",
    title: "Isolation des combles : pourquoi c'est le chantier n°1 à prioriser",
    excerpt:
      "25 à 30 % des déperditions thermiques passent par la toiture. Combles perdus, aménageables, sarking : on vous explique quelle technique choisir selon votre logement.",
    image: "/studio-arrangement-work.jpg",
    date: "14 février 2026",
    readTime: "6 min",
  },
  {
    slug: "dpe-comprendre-etiquette",
    category: "DPE & Audit",
    title: "Lire son DPE en 5 minutes : tout ce que les étiquettes vous disent vraiment",
    excerpt:
      "Entre la lettre énergétique et la lettre climatique, les consommations en kWh et les émissions de CO₂… le DPE contient plus d'infos qu'il n'y paraît.",
    image: "/before-after.png",
    date: "3 février 2026",
    readTime: "5 min",
  },
  {
    slug: "pompe-chaleur-air-eau-tout-savoir",
    category: "Chauffage",
    title: "Pompe à chaleur air/eau : avantages, coûts et aides disponibles en 2026",
    excerpt:
      "La PAC air/eau est le système de chauffage décarbonné le plus financé par l'État. On vous détaille les conditions d'éligibilité, les montants selon vos revenus et les points de vigilance.",
    image: "/interior-design.jpg",
    date: "20 janvier 2026",
    readTime: "7 min",
  },
  {
    slug: "renovation-ampleur-par-ou-commencer",
    category: "Rénovation globale",
    title: "Rénovation d'ampleur : par où commencer quand on ne sait pas par où commencer",
    excerpt:
      "Audit, plan de financement, choix des travaux, sélection d'un MAR… L'ordre des étapes change tout. On vous donne la feuille de route claire que vous cherchez.",
    image: "/living-room.jpg",
    date: "9 janvier 2026",
    readTime: "9 min",
  },
  {
    slug: "cee-certificats-economies-energie",
    category: "Aides & Financement",
    title: "CEE : cette aide méconnue peut financer une partie importante de vos travaux",
    excerpt:
      "Les Certificats d'Économies d'Énergie sont cumulables avec MaPrimeRénov' et souvent sous-exploités. On explique comment les activer sans effort supplémentaire.",
    image: "/interieur.webp",
    date: "22 décembre 2025",
    readTime: "5 min",
  },
  {
    slug: "isolation-murs-ite-iti-choisir",
    category: "Isolation",
    title: "ITE ou ITI : quelle isolation des murs choisir pour votre appartement parisien ?",
    excerpt:
      "En immeuble haussmannien, l'isolation par l'extérieur est souvent impossible. Voici comment l'isolation par l'intérieur peut quand même être très efficace.",
    image: "/before-after.png",
    date: "5 décembre 2025",
    readTime: "6 min",
  },
];
*/
/* ── COMPOSANTS ──────────────────────────────────────────────────── */

function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
      {label}
    </span>
  );
}

/* ── PAGE ────────────────────────────────────────────────────────── */

export default async function BlogPage() {
  const posts = await getAllPosts();
  const featuredPost = posts.length > 0 ? posts[0] : {
    slug: "maprimerénov-2026-guide-complet",
    category: "Aides & Financement",
    title: "MaPrimeRénov' 2026 : le guide complet pour ne rien rater",
    excerpt: "Le guide ultime pour maximiser les aides financières disponibles en 2026.",
    cover_image_url: "/maprimerenov-2026-guide-complet.jpg",
    author_name: "Jean Dupont",
    published_at: "2026-01-15",
    read_time_min: 10,
  };
  return (
    <main className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-primary/5 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
              Le blog Meilleure Réno
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              Des conseils{" "}
              <span className="italic text-primary">clairs</span>
              <br />
              pour rénover juste
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Aides financières, isolation, chauffage, DPE… Nos experts démystifient
              la rénovation énergétique pour que vous puissiez prendre les bonnes
              décisions.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTRES CATÉGORIES ── */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`shrink-0 text-sm font-medium px-4 py-1.5 rounded-full transition-all border ${
                  i === 0
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARTICLE VEDETTE ── */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <Card className="overflow-hidden border-border hover:shadow-2xl transition-all duration-500 animate-in fade-in duration-700">
              <div className="grid lg:grid-cols-2">

                {/* Image */}
                <div className="relative h-72 lg:h-auto overflow-hidden">
                  <Image
                    src={featuredPost.cover_image_url ?? "/interieur.webp"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20 lg:bg-gradient-to-t lg:from-background/20" />
                </div>

                {/* Contenu */}
                <CardContent className="flex flex-col justify-center p-8 lg:p-12 space-y-5">
                  <div className="flex items-center gap-3">
                    <CategoryBadge label={featuredPost.category} />
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      Article à la une
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featuredPost.author_name}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span>{featuredPost.published_at}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.read_time_min}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* ── GRILLE D'ARTICLES ── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Derniers articles</h2>
            <span className="text-sm text-muted-foreground">{posts.length} articles</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <Card
                  className="h-full overflow-hidden border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.cover_image_url ?? "/studio-arrangement-work.jpg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardHeader className="pb-3 pt-5 px-5">
                    <CategoryBadge label={post.category} />
                    <h3 className="text-lg font-bold leading-snug mt-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="px-5 pb-5 space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-1 border-t border-border">
                      <span>{post.published_at}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.read_time_min} min
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination / Load more */}
          <div className="flex justify-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-10 border-foreground/30 hover:border-foreground transition-all"
            >
              Charger plus d&apos;articles
            </Button>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER BAND ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
            Newsletter
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Les actus rénovation,{" "}
            <span className="italic text-primary">directement chez vous</span>
          </h2>
          <p className="text-muted-foreground">
            Aides, changements réglementaires, conseils pratiques… Un email clair,
            deux fois par mois. Pas de spam.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.fr"
              className="flex-1 h-12 px-4 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <Button className="rounded-full px-6 h-12 shrink-0">
              S&apos;inscrire →
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <FooterCTA />
      </section>


    </main>
  );
}