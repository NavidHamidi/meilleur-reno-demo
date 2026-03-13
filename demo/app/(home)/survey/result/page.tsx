/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { linkSessionToUser } from "@/lib/supabase/auth";
import { updateSession } from "@/lib/supabase/surveySession";

export default function SurveyResultPage() {
  const router = useRouter();
  const [isLinking, setIsLinking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function linkSessionAndRedirect() {
    try {
      // 1. Récupérer l'utilisateur connecté
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        console.error("❌ No user found");
        setError("Utilisateur non connecté");
        setIsLinking(false);
        return;
      }

      console.log("✅ User authenticated:", user.id);

      // 2. Récupérer le sessionId depuis sessionStorage (sauvegardé par AuthGate)
      const pendingSessionId = sessionStorage.getItem("pending_session_id");

      if (!pendingSessionId) {
        console.error("❌ No pending session ID found");
        setError("Session introuvable");
        setIsLinking(false);
        return;
      }

      console.log("📦 Found pending session:", pendingSessionId);

      // 3. Lier la session à l'utilisateur
      console.log("🔗 Linking session to user...");
      const linkResult = await linkSessionToUser(pendingSessionId, user.id);

      if (!linkResult.success) {
        console.error("❌ Error linking session:", linkResult.error);
        // Continuer quand même - l'utilisateur pourra voir ses résultats
      } else {
        console.log("✅ Session linked successfully");
      }

      // 4. Marquer la session comme complétée
      await updateSession(pendingSessionId, {
        completed: true,
        completed_at: new Date().toISOString(),
      });

      // 5. Nettoyer sessionStorage
      sessionStorage.removeItem("pending_session_id");
      console.log("🗑️ Cleaned up sessionStorage");

      // 6. Nettoyer localStorage aussi (questionnaire terminé)
      localStorage.removeItem("questionnaire_session");

      // 7. Rediriger vers la vraie page de résultats avec le sessionId
      console.log("✅ Redirecting to results...");
      router.push(`/dashboard/survey/result?session=${pendingSessionId}`);
    } catch (err: any) {
      console.error("❌ Error in linkSessionAndRedirect:", err);
      setError(err.message || "Une erreur est survenue");
      setIsLinking(false);
    }
  }

  if (isLinking) {
    linkSessionAndRedirect();
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-destructive text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold">Erreur</h1>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <h2 className="text-xl font-semibold">Finalisation en cours...</h2>
        <p className="text-muted-foreground">
          Nous préparons vos résultats personnalisés
        </p>
        <div className="mt-6 space-y-2 text-sm text-muted-foreground">
          <p>✓ Authentification réussie</p>
          <p>✓ Sauvegarde de votre questionnaire</p>
          <p className="animate-pulse">⏳ Génération des recommandations...</p>
        </div>
      </div>
    </div>
  );
}
