"use client";

// components/auth/SignUpForm.tsx
// Formulaire d'inscription — client ou prestataire selon le prop `role`

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/supabase/auth";
import type { UserRole } from "@/lib/types/auth";

type Props = {
  role: Extract<UserRole, "client" | "prestataire">;
  showCompanyFields?: boolean;
};

export function SignUpForm({ role, showCompanyFields = false }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await signUp({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        role,
        companyName: formData.get("companyName") as string || undefined,
        siret: formData.get("siret") as string || undefined,
      }, "/survey/result");

      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            required
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            required
            disabled={isPending}
          />
        </div>
      </div>

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
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="new-password"
          minLength={8}
          disabled={isPending}
        />
        <p className="text-xs text-muted-foreground">Minimum 8 caractères</p>
      </div>

      {showCompanyFields && (
        <>
          <div className="space-y-2">
            <Label htmlFor="companyName">
              Raison sociale{" "}
              <span className="text-muted-foreground text-xs">(optionnel)</span>
            </Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="siret">
              SIRET{" "}
              <span className="text-muted-foreground text-xs">(optionnel)</span>
            </Label>
            <Input
              id="siret"
              name="siret"
              type="text"
              pattern="[0-9]{14}"
              placeholder="14 chiffres"
              disabled={isPending}
            />
          </div>
        </>
      )}

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full rounded-full" disabled={isPending}>
        {isPending ? "Création du compte…" : "Créer mon compte"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Déjà un compte ?{" "}
        <a href="/auth/login" className="text-primary hover:underline">
          Se connecter
        </a>
      </p>
    </form>
  );
}