"use client";

// components/auth/LoginForm.tsx
// Formulaire de connexion générique — utilisé par /admin/login et /auth/login

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/supabase/auth";
import type { UserRole } from "@/lib/types/auth";

type Props = {
  redirectTo: string;
  allowedRoles?: UserRole[];
  showResetLink?: boolean;
  showSignUpLink?: boolean;
  signUpUrl?: string;
};

export function LoginForm({
  redirectTo,
  allowedRoles,
  showResetLink = false,
  showSignUpLink = false,
  signUpUrl = "/auth/signup",
}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signIn(
        {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        },
        { allowedRoles, redirectTo },
      );

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="vous@exemple.fr"
          required
          autoComplete="email"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Mot de passe</Label>
          {showResetLink && (
            <a
              href="/auth/reset-password"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Mot de passe oublié ?
            </a>
          )}
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          disabled={isPending}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full rounded-full"
        disabled={isPending}
      >
        {isPending ? "Connexion…" : "Se connecter"}
      </Button>

      {showSignUpLink && (
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{" "}
          <a href={signUpUrl} className="text-primary hover:underline">
            Créer un compte
          </a>
        </p>
      )}
    </form>
  );
}
