/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUp, signIn, signInWithGoogle, resetPassword } from "@/lib/supabase/auth";

interface AuthGateProps {
  onSuccess: (userId: string) => void;
  sessionId?: string;
}

export default function LoginForm({ onSuccess, sessionId }: AuthGateProps) {
  const [mode, setMode] = useState<"signup" | "signin" | "forgot-password">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (mode === "signup") {
        const result = await signUp({ email, password, fullName });
        if (result.success && result.user) {
          console.log("✅ User created:", result.user.id);
          onSuccess(result.user.id);
        } else {
          setError(result.error || "Erreur lors de l'inscription");
        }
      } else {
        const result = await signIn({ email, password });
        if (result.success && result.user) {
          console.log("✅ User signed in:", result.user.id);
          onSuccess(result.user.id);
        } else {
          setError(result.error || "Erreur de connexion");
        }
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signInWithGoogle();
      if (!result.success) {
        setError(result.error || "Erreur de connexion Google");
        setIsLoading(false);
      }
      // Redirection automatique vers Google, pas besoin de onSuccess ici
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResetSuccess(false);
    setIsLoading(true);

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setResetSuccess(true);
        setEmail("");
      } else {
        setError(result.error || "Erreur lors de l'envoi du lien de réinitialisation");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Partie droite - Formulaire */}

      <Card className="shadow-2xl border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            {mode === "signup"
              ? "Créer mon compte"
              : mode === "signin"
                ? "Se connecter"
                : "Réinitialiser mon mot de passe"}
          </CardTitle>
          <CardDescription>
            {mode === "signup"
              ? "Moins d'une minute pour accéder à vos résultats"
              : mode === "signin"
                ? "Bon retour parmi nous !"
                : "Entrez votre adresse email pour recevoir un lien de réinitialisation"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Formulaire de réinitialisation de mot de passe */}
          {mode === "forgot-password" && (
            <>
              {resetSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      ✓ Un lien de réinitialisation a été envoyé à votre adresse email.
                      Vérifiez votre boîte de réception et suivez les instructions.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setMode("signin");
                      setResetSuccess(false);
                      setError("");
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Retour à la connexion
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="vous@exemple.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
                    >
                      <p className="text-sm text-destructive">{error}</p>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Envoyer le lien de réinitialisation
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={() => {
                      setMode("signin");
                      setError("");
                    }}
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Retour à la connexion
                  </Button>
                </form>
              )}
            </>
          )}

          {/* Formulaire de signup/signin */}
          {mode !== "forgot-password" && (
            <>
              {/* Bouton Google */}
              {/*
              <Button
                type="button"
                variant="outline"
                className="w-full h-11"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {mode === "signup"
                  ? "Continuer avec Google"
                  : "Se connecter avec Google"}
              </Button>
              */}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {/*Ou avec email*/}
                  </span>
                </div>
              </div>

              {/* Formulaire Email */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Nom complet (optionnel)
                    </label>
                    <Input
                      type="text"
                      placeholder="Jean Dupont"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="vous@exemple.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Mot de passe</label>
                    {mode === "signin" && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode("forgot-password");
                          setError("");
                        }}
                        className="text-xs text-primary hover:underline"
                        disabled={isLoading}
                      >
                        Mot de passe oublié ?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      disabled={isLoading}
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {mode === "signup" && (
                    <p className="text-xs text-muted-foreground">
                      Minimum 6 caractères
                    </p>
                  )}
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-3 bg-destructive/10 border border-destructive/20 rounded-md"
                  >
                    <p className="text-sm text-destructive">{error}</p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Chargement...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {mode === "signup" ? "Créer mon compte" : "Se connecter"}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Toggle Sign In / Sign Up */}
              <div className="text-center text-sm">
                {mode === "signup" ? (
                  <p className="text-muted-foreground">
                    Vous avez déjà un compte ?{" "}
                    <button
                      onClick={() => {
                        setMode("signin");
                        setError("");
                      }}
                      className="text-primary font-semibold hover:underline"
                      disabled={isLoading}
                    >
                      Se connecter
                    </button>
                  </p>
                ) : (
                  <p className="text-muted-foreground">
                    Pas encore de compte ?{" "}
                    <button
                      onClick={() => {
                        setMode("signup");
                        setError("");
                      }}
                      className="text-primary font-semibold hover:underline"
                      disabled={isLoading}
                    >
                      S&apos;inscrire gratuitement
                    </button>
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
