
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Users, Search, BarChart3, Zap, Leaf } from "lucide-react";
import Image from "next/image";
import FooterCTA from "@/components/landing/FooterCTA";

const values = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Conseil indépendant",
    description:
      "Nous ne vendons pas de travaux. Nos recommandations sont fondées uniquement sur vos besoins et les spécificités de votre logement."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Accompagnement humain",
    description:
      "Chaque projet est unique. Nous plaçons vos motivations et contraintes au cœur de notre démarche, du premier contact à la réception des travaux.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Sélection rigoureuse",
    description:
      "Nos artisans partenaires sont triés sur le volet. Deux devis mis en concurrence pour acheter au juste prix, en toute confiance.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Transparence totale",
    description:
      "Devis détaillés, plan de financement clair, suivi digital de chantier. Vous savez exactement où vous en êtes à chaque étape.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Expertise technique",
    description:
      "Thermique, finance, travaux, aides publiques — nos experts couvrent toutes les dimensions de votre projet de rénovation.",
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "Impact durable",
    description:
      "Réduire les factures d'énergie, améliorer le confort, valoriser le patrimoine : nous visons des résultats concrets et durables pour chaque foyer.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="pt-32 pb-0 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto">

          {/* Titre centré */}
          <div className="text-center space-y-6 mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
              Qui sommes-nous
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight max-w-4xl mx-auto">
              Expertise et{" "}
              <span className="italic text-primary">passion</span>{" "}
              pour votre rénovation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Vous faites face à l&apos;augmentation des coûts de l&apos;énergie, à un
              manque de confort dans votre logement ou au durcissement de la
              réglementation ?
            </p>
          </div>

          {/* Grande image bannière */}
          <div className="relative rounded-3xl overflow-hidden aspect-[16/6] shadow-2xl animate-in fade-in duration-1000">
            <Image
              src="/interieur.webp"
              alt="Rénovation Meilleure Réno"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
            <div className="absolute bottom-8 left-10 right-10">
              <p className="text-white/90 text-2xl font-semibold italic max-w-2xl">
                &quot;Par où commencer pour une rénovation efficace ?&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                Notre mission
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Clarté, transparence
                <br />
                et <span className="italic text-primary">conseils d&apos;experts</span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  C&apos;est cette mission que nous nous sommes donnée :{" "}
                  <strong className="text-foreground font-semibold">
                    vous apporter clarté, transparence et conseils d&apos;experts
                  </strong>{" "}
                  pour que vous puissiez prendre les bonnes décisions.
                </p>
                <p>
                  Nous sommes conscients que le marché de la rénovation
                  énergétique peut susciter des inquiétudes, en raison de la
                  présence de nombreux acteurs aux pratiques parfois
                  discutables.
                </p>
                <p className="font-semibold text-foreground">
                  Permettre à chacun d&apos;aborder son projet de rénovation en toute
                  confiance, avec la certitude de faire les bons choix et
                  d&apos;éviter les pièges — c&apos;est la raison d&apos;être de Meilleure Réno.
                </p>
              </div>
            </div>

            {/* Carte fondatrice */}
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <Card className="overflow-hidden border-border hover:shadow-xl transition-all duration-300">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src="/interieur.webp"
                    alt="Laura Bornert, Fondatrice"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <p className="text-white font-bold text-lg">Laura Bornert</p>
                    <p className="text-white/70 text-sm">Fondatrice de Meilleure Réno</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <blockquote className="italic text-muted-foreground leading-relaxed border-l-2 border-primary pl-4">
                    &quot;Notre objectif est que chaque projet de rénovation
                    énergétique se déroule avec succès et sérénité. Nous
                    veillons à ce que chaque décision soit réfléchie.&quot;
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── OBJECTIF COMMUN ── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Nous souhaitons que les Français puissent construire leur projet de rénovation énergétique de manière{" "}
                <span className="italic text-primary">éclairée, autonome</span>{" "}
                et gratuite.
              </h2>
              <Link href="/survey">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Commencer mon projet
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right duration-700">
              {[
                { number: "500+", label: "Chantiers réalisés" },
                { number: "95%", label: "Satisfaction client" },
                { number: "BPI", label: "Soutenu par BPIFrance" },
                { number: "A→Z", label: "Accompagnement complet" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-2xl p-6 text-center border border-white/10"
                >
                  <div className="text-4xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALEURS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
              Ce qui nous anime
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Nos valeurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des principes concrets qui guident chacune de nos décisions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-border hover:border-primary/50 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <CardHeader>
                  <div className="text-primary mb-2">{value.icon}</div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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