// ── app/auth/reset-password/page.tsx ────────────────────────
// Demande de reset (mode request)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <p className="text-2xl font-bold font-serif">
            Meilleure<span className="text-primary">Reno</span>
          </p>
          <p className="text-sm text-muted-foreground">Réinitialisation du mot de passe</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mot de passe oublié</CardTitle>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm mode="request" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

