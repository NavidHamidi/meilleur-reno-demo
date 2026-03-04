"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, GraduationCap } from "lucide-react";
import Image from "next/image";

type ContactFormValues = {
  nom: string;
  prenom: string;
  email: string;
  tel?: string;
  projet: string;
  consent: boolean;
};

export default function ContactPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    defaultValues: { consent: false },
  });

  const consentValue = watch("consent");

  const onSubmit = async (_data: ContactFormValues) => {
    // TODO: brancher votre API ici
    console.log(_data);
    router.push("/contact/success");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ── HERO COMPACT ── */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-primary/5 to-transparent -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
              <span className="inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                Nous contacter
              </span>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
                Une première étape
                <br />
                en toute <span className="italic text-primary">simplicité</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Remplissez le formulaire ci-contre et un expert Meilleure Réno
                vous recontacte sous{" "}
                <strong className="text-foreground font-semibold">24h</strong>{" "}
                pour construire votre projet.
              </p>

              <div className="space-y-4 pt-4">
                {[
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    title: "Zone d'intervention",
                    detail: "Paris & Île-de-France",
                  },
                  {
                    icon: <Clock className="w-5 h-5" />,
                    title: "Délai de réponse",
                    detail: "Réponse garantie sous 24h (jours ouvrés)",
                  },
                  {
                    icon: <GraduationCap className="w-5 h-5" />,
                    title: "Nos experts",
                    detail:
                      "Thermique, finance, travaux · MAR · Diagnostiqueurs · Banque",
                  },
                ].map((info, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      {info.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{info.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {info.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image déco */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl animate-in fade-in slide-in-from-right duration-700 hidden lg:block">
              <Image
                src="/interieur.webp"
                alt="Rénovation intérieure"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { number: "500+", label: "Chantiers réalisés" },
                    { number: "95%", label: "Satisfaction client" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-white text-center"
                    >
                      <div className="text-3xl font-bold text-primary">
                        {stat.number}
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="max-w-4xl mx-auto">
            <Card className="border-border shadow-xl animate-in fade-in slide-in-from-bottom duration-700">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-2xl font-bold">
                  Votre projet en détail
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Tous les champs nous aident à mieux vous accompagner.
                </p>
              </CardHeader>

              <CardContent className="pt-8 space-y-8">
                {/* Coordonnées */}
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4">
                    Vos coordonnées
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        placeholder="Dupont"
                        {...register("nom", { required: "Le nom est requis" })}
                        className={
                          errors.nom
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.nom && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.nom.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        placeholder="Marie"
                        {...register("prenom", {
                          required: "Le prénom est requis",
                        })}
                        className={
                          errors.prenom
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.prenom && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.prenom.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="marie@exemple.fr"
                        {...register("email", {
                          required: "L'email est requis",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Adresse email invalide",
                          },
                        })}
                        className={
                          errors.email
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tel">Téléphone</Label>
                      <Input
                        required={false}
                        id="tel"
                        type="tel"
                        placeholder="06 00 00 00 00"
                        {...register("tel", {
                          required: false,
                          pattern: {
                            value: /^[0-9\s\+\-\.]{8,15}$/,
                            message: "Numéro de téléphone invalide",
                          },
                        })}
                        className={
                          errors.tel
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }
                      />
                      {errors.tel && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.tel.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Projet */}
                <div className="space-y-2">
                  <Label htmlFor="projet">Décrivez votre projet</Label>
                  <Textarea
                    id="projet"
                    placeholder="Décrivez votre projet et/ou votre besoin…"
                    className={`min-h-[100px] ${errors.projet ? "border-destructive focus-visible:ring-destructive" : ""}`}
                    {...register("projet", {
                      required: "Merci de décrire votre projet",
                      minLength: {
                        value: 20,
                        message:
                          "Merci d'être un peu plus précis (20 caractères minimum)",
                      },
                    })}
                  />
                  {errors.projet && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.projet.message}
                    </p>
                  )}
                </div>

                {/* Consentement + submit */}
                <div className="space-y-4 pt-2 border-t border-border">
                  <div
                    className={`flex items-start gap-3 rounded-xl p-4 transition-colors ${
                      errors.consent
                        ? "bg-destructive/10 border border-destructive/30"
                        : "bg-muted/40"
                    }`}
                  >
                    <Checkbox
                      id="consent"
                      checked={consentValue}
                      onCheckedChange={(checked) =>
                        setValue("consent", !!checked, { shouldValidate: true })
                      }
                      className="mt-0.5"
                    />
                    <input
                      type="hidden"
                      {...register("consent", {
                        validate: (v) =>
                          v === true || "Vous devez accepter pour continuer",
                      })}
                    />
                    <Label
                      htmlFor="consent"
                      className="text-sm font-normal text-muted-foreground leading-relaxed cursor-pointer"
                    >
                      Je consens à ce que mes données soient utilisées pour que
                      Meilleure Réno puisse me répondre.
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="text-xs text-destructive">
                      {errors.consent.message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full text-lg py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? "Envoi en cours…" : "Envoyer ma demande →"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </section>
    </main>
  );
}
