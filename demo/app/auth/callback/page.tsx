"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";
import { linkSessionToUser } from "@/lib/supabase/auth";

export default function AuthCallback() {
  const router = useRouter();

  const handleCallback = async () => {
    try {
      // Récupérer le hash de l'URL (contient les tokens OAuth)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");

      if (accessToken) {
        // Échanger le token pour une session
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: hashParams.get("refresh_token") || "",
        });

        if (error) {
          console.error("Error setting session:", error);
          router.push("/questionnaire?error=auth_failed");
          return;
        }

        if (data.user) {
          console.log("OAuth successful:", data.user.id);

          // Récupérer la session du questionnaire depuis localStorage
          const savedSession = localStorage.getItem("questionnaire_session");

          if (savedSession) {
            const sessionData = JSON.parse(savedSession);

            // Lier la session au nouvel utilisateur
            await linkSessionToUser(sessionData.sessionId, data.user.id);

            // Marquer comme complété
            await supabase
              .from("questionnaire_sessions")
              .update({
                completed: true,
                completed_at: new Date().toISOString(),
              })
              .eq("id", sessionData.sessionId);

            // Nettoyer localStorage
            localStorage.removeItem("questionnaire_session");

            // Rediriger vers les résultats
            router.push(`/results?session=${sessionData.sessionId}`);
          } else {
            // Pas de session sauvegardée, rediriger vers l'accueil
            router.push("/");
          }
        }
      } else {
        console.error("No access token in URL");
        router.push("/questionnaire?error=no_token");
      }
    } catch (error) {
      console.error("Callback error:", error);
      router.push("/questionnaire?error=callback_failed");
    }
  };

  useEffect(() => {
    handleCallback();
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="text-muted-foreground">Connexion en cours...</p>
        <p className="text-sm text-muted-foreground">
          Vous allez être redirigé vers vos résultats
        </p>
      </div>
    </div>
  );
}
