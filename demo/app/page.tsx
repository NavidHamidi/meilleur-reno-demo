import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { getEstimatedTime, getTotalQuestions } from '@/lib/questions'

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">
            Audit de votre bien immobilier
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez en {getEstimatedTime()} minutes quels travaux énergétiques effectuer pour maximiser la valeur de votre bien et réduire vos coûts.
          </p>
        </div>

        {/* Bénéfices */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <Clock className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-lg">Rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Seulement {getEstimatedTime()} minutes pour obtenir votre diagnostic complet
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-lg">Actionnable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Recevez des recommandations concrètes et personnalisées
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CheckCircle className="w-10 h-10 text-primary mb-2" />
              <CardTitle className="text-lg">Gratuit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Aucun engagement, résultats instantanés et confidentiels
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Principal */}
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Prêt à commencer ?</CardTitle>
            <CardDescription className="text-base">
              {getTotalQuestions()} questions pour transformer votre stratégie digitale
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/survey">
              <Button size="lg" className="text-lg px-8 py-6">
                Démarrer l&apos;audit gratuit
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Footer info */}
        <p className="text-center text-sm text-muted-foreground">
          🔒 Vos données sont sécurisées et confidentielles
        </p>
      </div>
    </main>
  )
}
