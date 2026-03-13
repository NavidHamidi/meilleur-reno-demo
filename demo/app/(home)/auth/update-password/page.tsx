// ── app/auth/update-password/page.tsx ────────────────────────
// Nouveau mot de passe après clic sur le lien email (mode update)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export default function UpdatePasswordPage() {
  return (
    <main className="min-h-screen bg-muted/30 flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <p className="text-2xl font-bold font-serif">
            Meilleure<span className="text-primary">Reno</span>
          </p>
          <p className="text-sm text-muted-foreground">Choisissez un nouveau mot de passe</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Nouveau mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <ResetPasswordForm mode="update" />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}