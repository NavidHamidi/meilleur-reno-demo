
// ── app/auth/signup/page.tsx ─────────────────────────────────
// Choix du type de compte puis formulaire adapté

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpForm } from "@/components/auth/SignupForm";

type Props = {
  searchParams: { type?: "client" | "prestataire" };
};

export default function SignUpPage({ searchParams }: Props) {
  const type = searchParams.type ?? "client";
  const isPrestataire = type === "prestataire";

  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <p className="text-2xl font-bold font-serif">
            Meilleure<span className="text-primary">Reno</span>
          </p>
          <p className="text-sm text-muted-foreground">
            {isPrestataire ? "Rejoignez notre réseau de prestataires" : "Créez votre espace client"}
          </p>
        </div>

        {/* Sélecteur de type de compte */}
        <div className="flex rounded-full border overflow-hidden">
          <a
            href="/auth/signup?type=client"
            className={`flex-1 text-center text-sm py-2 transition-colors ${
              !isPrestataire
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Particulier / Entreprise
          </a>
          <a
            href="/auth/signup?type=prestataire"
            className={`flex-1 text-center text-sm py-2 transition-colors ${
              isPrestataire
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Prestataire
          </a>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Créer un compte</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm
              role={type}
              showCompanyFields={isPrestataire}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
