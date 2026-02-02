"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { questions } from "@/lib/questions";
import { SurveyResponse } from "@/lib/types/db";
import { getResponsesBySessionId } from "@/lib/supabase/surveyResponse";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session");
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  useEffect(() => {
    if (sessionId) {
      getResponsesBySessionId(sessionId as string).then((response) => {
        if (response.ok && response.data) {
          setResponses(response.data);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [sessionId]);

  // Fonction pour générer des hypothèses basées sur les réponses
  const generateHypotheses = () => {
    // Cette fonction sera personnalisée selon tes critères
    // Pour l'instant, c'est un exemple
    return [
      {
        title: "Travaux de rénovation des façades recommandés",
        description:
          "Justiofication",
        impact: "high",
        icon: TrendingUp,
      },
      {
        title: "Travaux remplacement chauffage",
        description:
          "Pas de chauffage basé sur les énergies fossiles pourrait réduire vos coûts énergétiques de 20%.",
        impact: "medium",
        icon: Lightbulb,
      },
      {
        title: "Eligibilité aux subventions gouvernementales",
        description:
          "Ma ¨Prime Renov'",
        impact: "medium",
        icon: TrendingUp,
      },
    ];
  };

  const hypotheses = generateHypotheses();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyse de vos réponses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 py-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Votre Audit est Terminé !</h1>
          <p className="text-xl text-muted-foreground">
            Voici vos résultats personnalisés et nos recommandations
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Questions répondues</CardDescription>
              <CardTitle className="text-3xl">{responses.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Opportunités identifiées</CardDescription>
              <CardTitle className="text-3xl">{hypotheses.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Potentiel de croissance</CardDescription>
              <CardTitle className="text-3xl text-primary">+35%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Hypothèses et recommandations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Nos Recommandations Clés</h2>

          {hypotheses.map((hypothesis, index) => {
            const Icon = hypothesis.icon;
            const impactColors = {
              high: "bg-primary/10 text-primary border-primary/20",
              medium: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
              low: "bg-blue-500/10 text-blue-600 border-blue-500/20",
            };

            return (
              <Card
                key={index}
                className={`border-l-4 ${impactColors[hypothesis.impact as keyof typeof impactColors]}`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-background">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {hypothesis.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {hypothesis.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              Prêt à passer à l&apos;action ?
            </CardTitle>
            <CardDescription className="text-base">
              Discutons de votre stratégie digitale et de comment nous pouvons
              vous aider
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Button size="lg">Prendre rendez-vous</Button>
            <Button size="lg" variant="outline">
              Télécharger le rapport
            </Button>
          </CardContent>
        </Card>

        {/* Détails des réponses */}
        <details className="border rounded-lg p-4">
          <summary className="cursor-pointer font-semibold">
            Voir le détail de mes réponses
          </summary>
          <div className="mt-4 space-y-4">
            {responses.map((response) => {
              const question = questions.find(
                (q) => q.id === response.question_id,
              );
              return (
                <div
                  key={response.id}
                  className="border-l-2 border-primary/20 pl-4"
                >
                  <p className="font-medium">{question?.question}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {Array.isArray(response.answer)
                      ? response.answer.join(", ")
                      : response.answer}
                  </p>
                </div>
              );
            })}
          </div>
        </details>
      </div>
    </div>
  );
}
