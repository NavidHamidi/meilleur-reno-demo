import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FooterCTA() {
    return (
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="text-xl opacity-90">
            Recevez vos devis travaux gratuits sous 24h et bénéficiez d&apos;un
            accompagnement personnalisé à chaque étape.
          </p>
          <Link href="/survey">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Obtenir mes devis gratuits
            </Button>
          </Link>
        </div>
    )
}