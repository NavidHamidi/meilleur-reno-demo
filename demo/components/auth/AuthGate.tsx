"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function AuthGate() {
  useEffect(() => {
    // Sauvegarder le sessionId dans sessionStorage pour le récupérer après auth
    const savedSession = localStorage.getItem("questionnaire_session");
    
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      sessionStorage.setItem("pending_session_id", sessionData.sessionId);
      console.log("💾 Session ID saved for post-auth linking:", sessionData.sessionId);
    } else {
      console.warn("⚠️ No questionnaire session found");
    }
  }, []);

  const benefits = [
    "Accédez à vos résultats détaillés",
    "Recommandations personnalisées",
    "Estimation budgétaire précise",
    "Suivi de vos projets de rénovation",
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        {/* Partie gauche - Motivation */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Questionnaire terminé !
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">
              Vos résultats sont prêts ! 🎉
            </h1>
            <p className="text-xl text-muted-foreground">
              Créez votre compte gratuit pour accéder à votre audit complet
            </p>
          </div>

          <div className="space-y-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-base">{benefit}</p>
              </motion.div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              ✨ <span className="font-semibold">100% gratuit</span> • Aucune
              carte bancaire requise
            </p>
          </div>
        </motion.div>

        {/* Partie droite - Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LoginForm
            redirectTo="/survey/result"
            allowedRoles={["client", "prestataire"]}
            showResetLink={true}
            showSignUpLink={true}
            signUpUrl="/auth/signup"
          />
        </motion.div>
      </div>
    </div>
  );
}