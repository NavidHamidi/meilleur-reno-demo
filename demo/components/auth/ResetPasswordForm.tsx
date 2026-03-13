"use client";

// components/auth/ResetPasswordForm.tsx
// Deux modes : "request" (envoyer l'email) et "update" (nouveau mot de passe)

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword, updatePassword } from "@/lib/supabase/auth";

type Props =
  | { mode: "request" }
  | { mode: "update" };

export function ResetPasswordForm(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleRequest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await resetPassword(formData.get("email") as string);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    });
  }

  function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    startTransition(async () => {
      const result = await updatePassword(password);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  // ── Mode request ──────────────────────────────────────────
  if (props.mode === "request") {
    if (success) {
      return (
        <div className="text-center space-y-2 py-4">
          <p className="text-sm font-medium">Email envoyé ✓</p>
          <p className="text-sm text-muted-foreground">
            Si un compte existe avec cet email, vous recevrez un lien de
            réinitialisation dans quelques minutes.
          </p>
        </div>
      );
    }

    return (
      <form onSubmit={handleRequest} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="vous@exemple.fr"
            required
            disabled={isPending}
          />
        </div>

        {error && (
          <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <Button type="submit" className="w-full rounded-full" disabled={isPending}>
          {isPending ? "Envoi…" : "Envoyer le lien"}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          <a href="/auth/login" className="text-primary hover:underline">
            Retour à la connexion
          </a>
        </p>
      </form>
    );
  }

  // ── Mode update ───────────────────────────────────────────
  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Nouveau mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm">Confirmer le mot de passe</Label>
        <Input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          disabled={isPending}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full rounded-full" disabled={isPending}>
        {isPending ? "Mise à jour…" : "Mettre à jour le mot de passe"}
      </Button>
    </form>
  );
}