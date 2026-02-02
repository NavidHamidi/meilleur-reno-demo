"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  questions,
  getEstimatedTime,
  getTotalQuestions,
} from "@/lib/questions";
import { createSession, updateSession } from "@/lib/supabase/surveySession";
import { createorUpdateResponse } from "@/lib/supabase/surveyResponse";

export default function SurveyFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState<string>("");
  const [direction, setDirection] = useState(0);
  const textTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  
  const saveAnswer = async (questionId: string, answer: string | string[]) => {
    if (!sessionId) return;

    console.log("💾 Saving answer:", { questionId, answer, sessionId });
    const res = await createorUpdateResponse({
      session_id: sessionId,
      question_id: questionId,
      answer: answer,
    });

    if (!res.ok) {
      console.error("❌ Error saving answer:", res.message);
    } else {
      console.log("✅ Answer saved successfully:", res.data);
    }
  };

  useEffect(() => {
    // Créer une session au démarrage
    createSession().then((response) => {
      if (response.ok && response.data.length > 0) {
        setSessionId(response.data[0].id);
      }
    });
  }, []);

  useEffect(() => {
    // Sauvegarder automatiquement la progression
    if (sessionId) {
      updateSession(sessionId, { current_step: currentStep });
    }
  }, [currentStep, answers, sessionId]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / getTotalQuestions()) * 100;
  const timeRemaining = Math.max(
    0,
    getEstimatedTime() -
      Math.floor((currentStep / getTotalQuestions()) * getEstimatedTime()),
  );

  const handleAnswer = (value: string | string[]) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    saveAnswer(currentQuestion.id, value);
  };

  const handleTextAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    // Debounce pour éviter trop d'appels
    if (textTimeoutRef.current) {
      clearTimeout(textTimeoutRef.current);
    }
    textTimeoutRef.current = setTimeout(() => {
      saveAnswer(currentQuestion.id, value);
    }, 500);
  };

  const handleOtherChange = (questionId: string, value: string) => {
    setOtherValues({ ...otherValues, [questionId]: value });

    // Re-sauvegarder immédiatement avec la valeur personnalisée
    const currentAnswer = answers[questionId];
    if (currentAnswer) {
      // Préparer la valeur finale
      let finalValue: string | string[];

      if (Array.isArray(currentAnswer)) {
        // Choix multiple : remplacer "Autre" par "Autre: valeur"
        finalValue = currentAnswer.map((item) =>
          item === "Autre" ? `Autre: ${value}` : item,
        );
      } else {
        // Choix unique
        finalValue =
          currentAnswer === "Autre" ? `Autre: ${value}` : currentAnswer;
      }

      // Sauvegarder immédiatement
      saveAnswer(questionId, finalValue);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      complete_survey();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const complete_survey = async () => {
    if (!sessionId) return;
    updateSession(sessionId, {
      completed: true,
      completed_at: new Date().toISOString(),
    });
    window.location.href = `/survey/result?session=${sessionId}`;
  };

  const isAnswered = () => {
    const answer = answers[currentQuestion?.id];

    if (currentQuestion.type === "text") {
      return answer && (answer as string).trim().length > 0;
    }

    if (currentQuestion.type === "multiple") {
      return answer && Array.isArray(answer) && answer.length > 0;
    }

    return answer !== undefined && answer !== "";
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const hasOtherSelected = (questionId: string) => {
    const answer = answers[questionId];
    if (Array.isArray(answer)) {
      return answer.includes("Autre");
    }
    return answer === "Autre";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Header avec progression */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Question {currentStep + 1} sur {getTotalQuestions()}
            </span>
            <span className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              ~{timeRemaining} min restantes
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question animée */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold rounded-full bg-primary/10 text-primary w-fit">
                  {currentQuestion.section}
                </div>
                <CardTitle className="text-2xl">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.description && (
                  <CardDescription>
                    {currentQuestion.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Question à choix unique */}
                {currentQuestion.type === "single" && (
                  <RadioGroup
                    value={answers[currentQuestion.id] as string}
                    onValueChange={(value) => handleAnswer(value)}
                  >
                    {currentQuestion.options.map((option: string) => (
                      <div key={option}>
                        <motion.label
                          htmlFor={`${currentQuestion.id}-${option}`}
                          className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${currentQuestion.id}-${option}`}
                          />
                          <span className="flex-1 text-sm font-medium">
                            {option}
                          </span>
                        </motion.label>

                        {/* Champ "Autre" si sélectionné */}
                        {option === "Autre" &&
                          answers[currentQuestion.id] === "Autre" && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-7 mt-2"
                            >
                              <Input
                                placeholder="Précisez..."
                                value={otherValues[currentQuestion.id] || ""}
                                onChange={(e) =>
                                  handleOtherChange(
                                    currentQuestion.id,
                                    e.target.value,
                                  )
                                }
                                className="w-full"
                              />
                            </motion.div>
                          )}
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {/* Question à choix multiples */}
                {currentQuestion.type === "multiple" && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option: string) => {
                      const currentAnswers =
                        (answers[currentQuestion.id] as string[]) || [];
                      const isChecked = currentAnswers.includes(option);

                      return (
                        <div key={option}>
                          <motion.label
                            htmlFor={`${currentQuestion.id}-${option}`}
                            className="flex items-center space-x-3 p-4 rounded-lg border-2 border-transparent hover:border-primary/20 transition-all cursor-pointer"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <Checkbox
                              id={`${currentQuestion.id}-${option}`}
                              checked={isChecked}
                              onCheckedChange={(checked) => {
                                const newAnswers = checked
                                  ? [...currentAnswers, option]
                                  : currentAnswers.filter((a) => a !== option);
                                handleAnswer(newAnswers);
                              }}
                            />
                            <span className="flex-1 text-sm font-medium">
                              {option}
                            </span>
                          </motion.label>

                          {/* Champ "Autre" si sélectionné */}
                          {option === "Autre" && isChecked && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-7 mt-2"
                            >
                              <Input
                                placeholder="Précisez..."
                                value={otherValues[currentQuestion.id] || ""}
                                onChange={(e) =>
                                  handleOtherChange(
                                    currentQuestion.id,
                                    e.target.value,
                                  )
                                }
                                className="w-full"
                              />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Question de type texte */}
                {currentQuestion.type === "text" && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder={
                        currentQuestion.placeholder || "Votre réponse ici..."
                      }
                      value={(answers[currentQuestion.id] as string) || ""}
                      onChange={(e) => handleTextAnswer(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Soyez aussi précis que possible pour nous aider à mieux
                      comprendre votre besoin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <Button
            onClick={handleNext}
            disabled={!isAnswered()}
            className="min-w-[120px]"
          >
            {currentStep === questions.length - 1 ? (
              <>
                Terminer
                <Check className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Suivant
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Indicateur de sauvegarde */}
        <p className="text-xs text-center text-muted-foreground mt-4">
          ✓ Progression sauvegardée automatiquement
        </p>
      </div>
    </div>
  );
}
