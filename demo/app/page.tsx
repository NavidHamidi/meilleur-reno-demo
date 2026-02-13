import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Home, Paintbrush, Users, Star } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border animate-in slide-in-from-top duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary tracking-tight"
          >
            MeilleurReno
          </Link>
          <div className="space-x-4">
            <Link href="/survey">
              <Button size="lg" className="rounded-full">
                Devis gratuit sous 24h
              </Button>
            </Link>
            <Link href="">
              <Button size="lg" className="rounded-full">
                Espace client
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-primary/5 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Votre rénovation d&apos;intérieur en toute simplicité
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Le meilleur de l&apos;accompagnement humain et de la technologie
                pour vos travaux de rénovation à Paris
              </p>
              <ul className="space-y-4">
                {[
                  "Travaux d'isolation efficaces",
                  "Décoration d'intérieure sur mesure",
                  "Accompagnement jusqu'à la fin du chantier",
                ].map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-lg animate-in fade-in slide-in-from-left duration-500"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/survey"
                className="inline-block animate-in fade-in slide-in-from-left duration-500"
                style={{ animationDelay: "600ms" }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Obtenir mes devis travaux
                </Button>
              </Link>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="aspect-[4/3] rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/interieur.webp"
                    alt="Rénovation d'intérieur"
                    width={800}
                    height={800}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Chantiers réalisés" },
              { number: "95%", label: "Satisfaction client" },
              { number: "24h", label: "Délai de réponse" },
              { number: "10+", label: "Années d'expérience" },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base opacity-90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Nos services de rénovation
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              De l&apos;isolation à la décoration, nous vous accompagnons sur
              tous vos projets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Home className="w-12 h-12" />,
                title: "Travaux d'isolation",
                description:
                  "Optimisez votre confort thermique et réduisez vos factures énergétiques grâce à nos solutions d'isolation performantes.",
                highlight: "Artisans RGE certifiés.",
              },
              {
                icon: <Paintbrush className="w-12 h-12" />,
                title: "Décoration d'intérieur",
                description:
                  "Travaux d'embellissement pour se sentir bien chez soi. Matériaux, finitions, harmonies : l'artisan vous accompagnera dans chaque choix.",
                highlight: "",
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Architecture partenaire",
                description:
                  "Si vous souhaitez aller plus loin, nous vous ferons découvrir nos",
                highlight:
                  "architectes partenaires sélectionnés pour la qualité de leurs réalisations.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-border hover:border-primary/50 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="text-primary mb-4">{service.icon}</div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}{" "}
                    {service.highlight && (
                      <span className="text-primary font-semibold">
                        {service.highlight}
                      </span>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      {/*</section>

      {/* Travaux d'embellissement Section 
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">*/} 
        <div className="max-w-7xl mx-auto mt-5">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: "/interior-design.jpg",
                title:
                  "Isolation des murs (ITE / ITI) – jusqu'à 25 % de pertes évitées",
                stats:
                  "Les murs représentent 20 à 25 % des déperditions thermiques d'un logement mal isolé.",
                description:
                  "L'isolation thermique par l'intérieur (ITI) ou par l'extérieur (ITE) de vos murs permet de limiter les pertes de chaleur, d'améliorer ainsi le confort contre les et de supprimer les ponts froids.",
                highlight:
                  "L'ITE est particulièrement performante car elle traite en profondeur les ponts thermiques et n'oblige ni pièce ni réduire la surface habitable.",
                footer:
                  "Ces travaux sont éligibles aux aides publiques sous conditions.",
              },
              {
                image: "/studio-arrangement-work.jpg",
                title:
                  "Isolation de la toiture et des combles – le poste n°1 des économies d'énergie",
                stats:
                  "La toiture est responsable de 25 à 30 % des pertes de chaleur d'un ou logement non isolé.",
                description:
                  "L'isolation de vos combles perdus ou aménageables est la fraction la plus rentable en rénovation énergétique, avec un gain immédiat sur les factures et le confort thermique.",
                highlight:
                  "Un isolant selon la configuration (soufflage, panneaux, rampants) et devant respecter les résistances thermiques minimales exigées pour l'obtention des aides.",
                footer: "",
              },
              {
                image: "/before-after.png",
                title: "Travaux d'embellissement pour se sentir bien chez soi",
                stats:
                  "Matériaux, finitions, harmonies : l'artisan vous accompagnera dans chaque choix,",
                description: "pour votre maison ou votre appartement.",
                highlight:
                  "Si vous souhaitez aller plus loin avec un projet d'architecture ou de décoration d'intérieur, nous vous ferons découvrir nos architectes partenaires sélectionnés pour la qualité de leurs réalisations.",
                footer: "",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden border-border hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-120"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">
                    {item.stats}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  {item.highlight && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.highlight}
                    </p>
                  )}
                  {item.footer && (
                    <p className="text-sm font-medium text-foreground pt-2">
                      {item.footer}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Un processus simple et transparent du début à la fin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                number: "1",
                title: "Audit gratuit",
                description:
                  "Remplissez notre questionnaire en ligne et recevez une première estimation de votre projet sous 24h",
              },
              {
                number: "2",
                title: "Devis détaillés",
                description:
                  "Nos artisans partenaires vous proposent des devis détaillés et transparents adaptés à vos besoins",
              },
              {
                number: "3",
                title: "Suivi de chantier",
                description:
                  "Nous vous accompagnons jusqu'à la fin de votre chantier pour garantir votre satisfaction totale",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Ils nous ont fait confiance
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                quote:
                  "Excellent service du début à la fin. L'équipe MeilleurReno a su nous guider dans nos choix et les artisans étaient vraiment professionnels. Notre appartement haussmannien a été magnifiquement rénové.",
                author: "Justine S.",
                project: "Rénovation complète - Paris 16e",
                initials: "JS",
                image: "/living-room.jpg",
              },
              {
                quote:
                  "Je recommande vivement ! Le suivi était impeccable et les devis très transparents. Trouver rapidement un professionnel adapté au besoin est alors très simple et sécurisé grâce à leur accompagnement.",
                author: "Marc C.",
                project: "Isolation thermique - Paris 7e",
                initials: "MC",
                image: "/living-room.jpg",
              },
              {
                quote:
                  "Service satisfaisant ! Notre rénovation a été menée avec professionnalisme et rigueur.",
                author: "Jean D..",
                project: "Isolation thermique - Paris 7e",
                initials: "JD",
                image: "/living-room.jpg",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden group animate-in fade-in slide-in-from-bottom duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.project}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/80 to-foreground/40" />
                </div>

                {/* Content Overlay */}
                <Card className="relative bg-transparent border-0 text-background shadow-none">
                  <CardHeader className="relative z-10">
                    <div className="flex gap-1 text-primary mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic leading-relaxed text-white">
                      &ldquo;{testimonial.quote}&rdquo;
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {testimonial.initials}
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-white/80">
                          {testimonial.project}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl opacity-90">
            Recevez vos devis travaux gratuits sous 24h et donnez vie à vos
            projets de rénovation
          </p>
          <Link href="/survey">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Obtenir mes devis gratuits
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-4">
                MeilleurReno
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Le partenaire de confiance pour tous vos projets de rénovation
                d&apos;intérieur à Paris. Accompagnement personnalisé, artisans
                qualifiés, devis transparents.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Rénovation appartement
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Isolation thermique
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Décoration intérieur
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Architecture
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Zones</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Paris 7e
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Paris 15e
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Paris 16e
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Île-de-France
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    À propos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Nos artisans
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="opacity-80 hover:opacity-100 hover:text-primary transition-all"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center text-sm opacity-70">
            © 2026 MeilleurReno. Tous droits réservés.
          </div>
        </div>
      </footer>
    </main>
  );
}
