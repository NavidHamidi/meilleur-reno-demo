import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Zap, Euro, Leaf } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/ui/footer";
import { testimonial2 } from "@/lib/testimonials";
import TestimonialSection from "@/components/landing/Testimonial";
import StatBar from "@/components/landing/StatBar";
import ProjectProcess from "@/components/landing/ProjectProcess";
import FooterCTA from "@/components/landing/FooterCTA";
import { projectProcess2 } from "@/lib/projectProcess";

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-primary/5 to-transparent -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Réduisez vos factures grâce à la rénovation énergétique
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Jusqu&apos;à 70 % d&apos;aides financières pour vos travaux
                d&apos;isolation à Paris. Nous gérons tout, du dossier à la fin
                du chantier.
              </p>
              <ul className="space-y-4">
                {[
                  "Jusqu'à 70 % de subventions sur vos travaux",
                  "Économisez jusqu'à 1 500 € par an sur vos factures",
                  "Artisans RGE certifiés, dossiers d'aides pris en charge",
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
                  Calculer mes économies
                </Button>
              </Link>
            </div>

            <div className="relative animate-in fade-in slide-in-from-right duration-700">
              <div className="aspect-[4/3] rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/worker.jpg"
                    alt="Rénovation énergétique et isolation"
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
        <StatBar />
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Nos travaux de rénovation énergétique
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions d&apos;isolation performantes, éligibles aux aides
              de l&apos;État, pour réduire vos dépenses énergétiques
              durablement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Isolation thermique",
                description:
                  "Toiture, murs, planchers : nous isolons votre logement de A à Z pour stopper les pertes de chaleur et améliorer votre confort toute l'année.",
                highlight:
                  "Artisans RGE certifiés, travaux éligibles à MaPrimeRénov'.",
              },
              {
                icon: <Euro className="w-12 h-12" />,
                title: "Gestion des aides financières",
                description:
                  "MaPrimeRénov', CEE, éco-PTZ, TVA à 5,5 %... Nous identifions toutes les aides auxquelles vous avez droit et constituons vos dossiers à votre place.",
                highlight: "",
              },
              {
                icon: <Leaf className="w-12 h-12" />,
                title: "Audit énergétique",
                description:
                  "Nous évaluons les performances de votre logement et vous proposons un plan de travaux priorisé pour",
                highlight:
                  "maximiser vos économies d'énergie et améliorer votre étiquette DPE.",
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

        {/* Travaux détaillés */}
        <div className="max-w-7xl mx-auto mt-5">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: "/isolation-mur.jpg",
                title:
                  "Isolation des murs (ITE / ITI) – jusqu'à 25 % de pertes évitées",
                stats:
                  "Les murs représentent 20 à 25 % des déperditions thermiques d'un logement mal isolé.",
                description:
                  "L'isolation thermique par l'intérieur (ITI) ou par l'extérieur (ITE) supprime les ponts froids, améliore le confort et réduit vos factures de chauffage dès la première année.",
                highlight:
                  "L'ITE est particulièrement efficace car elle traite les ponts thermiques en profondeur sans réduire votre surface habitable.",
                footer:
                  "Ces travaux sont éligibles aux aides publiques sous conditions.",
              },
              {
                image: "/aide.jpg",
                title:
                  "Isolation de la toiture et des combles – le poste n°1 des économies d'énergie",
                stats:
                  "La toiture est responsable de 25 à 30 % des pertes de chaleur d'un logement non isolé.",
                description:
                  "L'isolation de vos combles perdus ou aménageables est l'investissement le plus rentable en rénovation énergétique, avec un retour sur investissement souvent inférieur à 3 ans.",
                highlight:
                  "Selon votre configuration (soufflage, panneaux, rampants), nous choisissons l'isolant adapté pour respecter les exigences thermiques ouvrant droit aux aides.",
                footer: "",
              },
              {
                image: "/audit.jpg",
                title:
                  "Avant / Après : des résultats concrets sur vos factures",
                stats:
                  "En moyenne, nos clients réduisent leur consommation énergétique de 40 à 60 % après travaux.",
                description:
                  "Grâce à un plan de rénovation sur mesure, nous vous aidons à passer d'une étiquette énergie D ou E à B ou C, augmentant ainsi la valeur de votre bien.",
                highlight:
                  "Un logement bien isolé, c'est jusqu'à 1 500 € d'économies par an et un confort thermique retrouvé été comme hiver.",
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
        <ProjectProcess steps={projectProcess2} />
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <TestimonialSection testimonial={testimonial2} />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <FooterCTA />
      </section>

      <Footer />
    </main>
  );
}
