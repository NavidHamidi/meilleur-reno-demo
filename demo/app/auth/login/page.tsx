'use client'

import LoginForm from "@/components/auth/LoginForm";

const onSuccess = () => {
    // Rediriger vers la page d'accueil ou une autre page après la connexion réussie
    window.location.href = "/";
}

export default function LoginPage() {
    return <LoginForm onSuccess={onSuccess} />;
}