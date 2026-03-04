import AuthGate from "@/components/auth/AuthGate";

const onSuccess = () => {
    // Rediriger vers la page d'accueil ou une autre page après la connexion réussie
    window.location.href = "/";
}

export default function LoginPage() {
    return <AuthGate onSuccess={onSuccess} sessionId="" />;
}