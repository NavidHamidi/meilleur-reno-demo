"use client";

import { useEffect } from "react";
import AuthGate from "@/components/auth/AuthGate";

export default function AuthGatePage() {
  useEffect(() => {
    // Récupérer le sessionId depuis localStorage et le sauvegarder dans sessionStorage
    const savedSession = localStorage.getItem("questionnaire_session");
    
    if (savedSession) {
      const sessionData = JSON.parse(savedSession);
      sessionStorage.setItem("pending_session_id", sessionData.sessionId);
      console.log("💾 Session ID transferred to sessionStorage:", sessionData.sessionId);
    } else {
      console.warn("⚠️ No questionnaire session found in localStorage");
    }
  }, []);

  return <AuthGate />;
}