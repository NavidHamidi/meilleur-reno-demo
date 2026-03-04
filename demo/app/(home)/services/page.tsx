import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ClipboardList,
  Banknote,
  HardHat,
  MonitorSmartphone,
  FileText,
  MessageCircleQuestion,
} from "lucide-react";
import ProjectProcess from "@/components/landing/ProjectProcess";
import FooterCTA from "@/components/landing/FooterCTA";
import { projectProcess1 } from "@/lib/projectProcess";

const services = [
  {
    icon: <ClipboardList className="w-8 h-8" />,
    number: "01",
    title: "Audit de votre logement et de vos attentes",
    badge: "Étape clé · Gratuit en ligne",
    description:
      "Tout commence par un audit de votre logement et de vos attentes. Chez Meilleure Réno, nous savons combien ce projet est important et touche à votre intimité : vos souvenirs, votre décoration, votre art de vivre, votre patrimoine.",
    highlight:
      "Nous plaçons vos motivations et vos contraintes au cœur de notre démarche pour construire ensemble le projet qui vous convient le mieux.",
    cta: { label: "Je réalise mon audit gratuit", href: "/survey" },
  },
  {
    icon: <Banknote className="w-8 h-8" />,
    number: "02",
    title: "Un plan de financement adapté à votre situation",
    badge: "Parcours personnalisé · MAR · Banque",
    description:
      "Selon votre situation — propriétaire résidence principale, secondaire, bailleur, occupant — Meilleure Réno vous explique les étapes à suivre et établit un plan de financement adapté à votre trésorerie disponible.",
    highlight:
      "En fonction de votre parcours, nous pouvons vous mettre en relation avec nos partenaires diagnostiqueurs, MAR (Mon Accompagnateur Rénov') et banque.",
    cta: null,
  },
  {
    icon: <HardHat className="w-8 h-8" />,
    number: "03",
    title: "Des entreprises de confiance recommandées",
    badge: "2 devis · Mise en concurrence · RGE",
    description:
      "Dans un marché de la rénovation en pleine mutation, il est souvent difficile de trouver des acteurs fiables, disponibles et adaptés à votre projet.",
    highlight:
      "Meilleure Réno réalise un travail rigoureux de sélection et vous propose deux entreprises permettant une mise en concurrence pour acheter au juste prix.",
    cta: null,
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8" />,
    number: "04",
    title: "Votre parcours digitalisé pour le suivi de chantier",
    badge: "Espace client · CIL · Étapes structurées",
    description:
      "Votre espace client vous guide de la planification à la réalisation grâce à des étapes structurées et des fiches conseils : analyse des devis, contrôle qualité, réception des travaux.",
    highlight:
      "Depuis le 1er janvier 2023, le Carnet d'Information du Logement (CIL) est obligatoire. Votre espace client l'intègre automatiquement.",
    cta: { label: "Créer mon espace client", href: "#" },
  },
  {
    icon: <FileText className="w-8 h-8" />,
    number: "05",
    title: "Simplifier vos démarches de demandes d'aides",
    badge: "MaPrimeRénov' · CEE · Éco-PTZ",
    description:
      "Pour beaucoup, l'obtention des aides peut se transformer en véritable parcours du combattant. Chez Meilleure Réno, nous faisons de cette problématique notre spécialité.",
    highlight:
      "Nous prenons en charge cette démarche en qualité de mandataire administratif (frais de dossier uniquement pour l'obtention des CEE).",
    cta: null,
  },
  {
    icon: <MessageCircleQuestion className="w-8 h-8" />,
    number: "06",
    title: "Une question précise sur votre projet ?",
    badge: "Service premium · 20 € à 250 €",
    description:
      "Nos experts (en thermique, finance, travaux…) sont là pour répondre à vos questions précises via notre service premium.",
    highlight:
      "Exemples : Comment choisir une pompe à chaleur adaptée à mon logement ? Quelles précautions pour éviter l'humidité après isolation ?",
    cta: { label: "Poser ma question", href: "/contact" },
  },
];

export default function DecouvrirNosServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-foreground/5 -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                Nos services
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                C&apos;est{" "}
                <span className="italic text-primary">
                  &quot;chez moi&quot;
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Avec Meilleure Réno, bénéficiez d&apos;un accompagnement{" "}
                <strong className="text-foreground font-semibold">
                  de A à Z
                </strong>{" "}
                pour construire{" "}
                <strong className="text-foreground font-semibold">VOTRE</strong>{" "}
                projet de rénovation énergétique.
              </p>
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-700">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Trop souvent, les acteurs du marché cherchent à vous proposer ce
                qu&apos;ils ont à vendre, en abordant votre logement comme un
                simple objet technique.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Entre les vendeurs de pompes à chaleur et les promoteurs de la
                rénovation d&apos;ampleur, comment faire le tri ? Quelle
                solution répond vraiment à{" "}
                <strong className="text-foreground font-semibold">
                  vos besoins
                </strong>{" "}
                ?
              </p>
              <Link href="/survey">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Je réalise mon audit gratuit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
              Ce que nous faisons
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Des services pensés pour{" "}
              <span className="italic text-primary">chaque étape</span>
            </h2>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="grid md:grid-cols-[auto_1fr_auto] gap-0">
                  {/* Numéro */}
                  <div className="hidden md:flex items-center justify-center w-24 bg-muted/40 border-r border-border">
                    <span className="text-5xl font-bold text-muted-foreground/30 font-serif">
                      {service.number}
                    </span>
                  </div>

                  {/* Contenu */}
                  <div className="p-6 md:p-8 space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="text-primary mt-1 shrink-0">
                        {service.icon}
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {service.badge}
                        </span>
                        <h3 className="text-xl font-bold">{service.title}</h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed pl-12">
                      {service.description}
                    </p>
                    <p className="pl-12 text-sm font-medium text-foreground border-l-2 border-primary/40 ml-12 pl-4 leading-relaxed">
                      {service.highlight}
                    </p>
                  </div>

                  {/* CTA optionnel */}
                  {service.cta && (
                    <div className="flex items-center justify-center p-6 border-t md:border-t-0 md:border-l border-border bg-muted/20">
                      <Link href={service.cta.href}>
                        <Button
                          variant="outline"
                          className="rounded-full whitespace-nowrap"
                        >
                          {service.cta.label} →
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <ProjectProcess steps={projectProcess1} />
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <FooterCTA />
      </section>
    </main>
  );
}
