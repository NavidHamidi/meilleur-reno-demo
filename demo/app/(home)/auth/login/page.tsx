// ── app/auth/login/page.tsx ──────────────────────────────────
// Login clients et prestataires avec reset + lien signup

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <p className="text-2xl font-bold font-serif">
            Meilleure<span className="text-primary">Reno</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Accédez à votre espace
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Connexion</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm
              redirectTo="/dashboard"
              allowedRoles={["client", "prestataire"]}
              showResetLink
              showSignUpLink
              signUpUrl="/auth/signup"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
