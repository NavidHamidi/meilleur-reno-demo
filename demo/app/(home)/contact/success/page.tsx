import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ContactSuccessPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-700">

        {/* Icône */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
            Message envoyé
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Merci, on revient
            <br />
            vers vous <span className="italic text-primary">rapidement</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Votre demande a bien été reçue. Un expert Meilleure Réno vous
            contactera sous{" "}
            <strong className="text-foreground font-semibold">24h</strong>{" "}
            (jours ouvrés) pour échanger sur votre projet.
          </p>
        </div>

        {/* Séparateur décoratif */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-sm">En attendant</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="text-base px-8 py-5 rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              ← Retour à l&apos;accueil
            </Button>
          </Link>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-5 rounded-full transition-all w-full sm:w-auto"
            >
              Découvrir nos services
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}