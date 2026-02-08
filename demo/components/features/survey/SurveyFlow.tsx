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
import {
  createSession,
  getSessionById,
  updateSession,
} from "@/lib/supabase/surveySession";
import { getResponsesBySessionId } from "@/lib/supabase/surveyResponse";
import { createorUpdateResponse } from "@/lib/supabase/surveyResponse";
import { linkSessionToUser, getSession } from "@/lib/supabase/auth";
import AuthGate from "@/components/features/auth/AuthGate";

export default function SurveyFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [showRestoredMessage, setShowRestoredMessage] = useState(false);
  const [direction, setDirection] = useState(0);
  const textTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showAuthGate, setShowAuthGate] = useState(false);

  const initializeSession = async () => {
    try {
      // Vérifier s'il y a une session en cours dans localStorage
      const savedSession = localStorage.getItem("questionnaire_session");

      if (savedSession) {
        const sessionData = JSON.parse(savedSession);
        console.log("Session found in localStorage:", sessionData);

        // Vérifier que la session existe toujours dans Supabase
        const sessionRes = await getSessionById(sessionData.sessionId);
        if (!sessionRes.ok || !sessionRes.data) {
          localStorage.removeItem("questionnaire_session");
          return;
        }

        // Session valide - restaurer l'état
        console.log("Restoring session from localStorage");
        setSessionId(sessionData.sessionId);
        setCurrentStep(sessionData.currentStep);

        // Charger les réponses existantes
        await loadExistingAnswers(sessionData.sessionId);

        // Afficher message de restauration
        setShowRestoredMessage(true);
        setTimeout(() => setShowRestoredMessage(false), 4000);

        setIsLoading(false);
        return;
      }

      // Pas de session valide - en créer une nouvelle
      console.log("Creating new session");
      const createRes = await createSession();
      if (createRes.ok && createRes.data) {
        const data = createRes.data[0];
        setSessionId(data.id);
        setCurrentStep(0);
        setAnswers({});
        setOtherValues({});
        saveToLocalStorage();
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error initializing session:", error);
      // En cas d'erreur, créer une nouvelle session
      await createSession();
    }
  };

  const loadExistingAnswers = async (sessionId: string) => {
    try {
      const sessionRes = await getResponsesBySessionId(sessionId);

      if (!sessionRes.ok || !sessionRes.data) {
        console.error("Session not found or error retrieving session");
        return;
      }

      const loadedAnswers: Record<string, string | string[]> = {};
      const loadedOtherValues: Record<string, string> = {};

      sessionRes.data.forEach((response) => {
        const answer = response.answer;

        // Extraire les valeurs "Autre" si présentes
        if (typeof answer === "string" && answer.startsWith("Autre: ")) {
          const otherValue = answer.replace("Autre: ", "");
          loadedAnswers[response.question_id] = "Autre";
          loadedOtherValues[response.question_id] = otherValue;
        } else if (Array.isArray(answer)) {
          const processedAnswer = answer.map((item) => {
            if (typeof item === "string" && item.startsWith("Autre: ")) {
              const otherValue = item.replace("Autre: ", "");
              loadedOtherValues[response.question_id] = otherValue;
              return "Autre";
            }
            return item;
          });
          loadedAnswers[response.question_id] = processedAnswer;
        } else {
          loadedAnswers[response.question_id] = answer;
        }
      });

      console.log("Loaded answers:", loadedAnswers);
      setAnswers(loadedAnswers);
      setOtherValues(loadedOtherValues);
    } catch (error) {
      console.error("Error loading answers:", error);
    }
  };

  const saveToLocalStorage = () => {
    if (!sessionId) return;

    const sessionData = {
      sessionId,
      currentStep,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("questionnaire_session", JSON.stringify(sessionData));
    console.log("Session saved to localStorage:", sessionData);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("questionnaire_session");
    console.log("Session cleared from localStorage");
  };

  const saveProgress = async () => {
    if (!sessionId) return;
    await updateSession(sessionId, { current_step: currentStep });
  };

  const saveAnswer = async (questionId: string, answer: string | string[]) => {
    if (!sessionId) return;

    console.log("Saving answer:", { questionId, answer, sessionId });
    const res = await createorUpdateResponse({
      session_id: sessionId,
      question_id: questionId,
      answer: answer,
    });

    if (!res.ok) {
      console.error("Error saving answer:", res.message);
    } else {
      console.log("Answer saved successfully:", res.data);
    }
  };

  useEffect(() => {
    // Sauvegarder automatiquement la progression
    if (sessionId && !isLoading) {
      saveProgress();
      saveToLocalStorage();
    }
  }, [currentStep, sessionId, isLoading]);

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
      getSession().then((res) => {
        if (res.success && res.session) {
          console.log("User is authenticated, completing survey");
          completeSurvey(res.session.user.id);
        } else {
          console.log("User not authenticated, showing auth gate");
          setShowAuthGate(true);
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAuthSuccess = (userId: string) => {
    console.log("Auth successful, completing survey for user:", userId);
    completeSurvey(userId);
  };

  const completeSurvey = async (userId: string) => {
    // 1. Lier la session à l'utilisateur
    await linkSessionToUser(sessionId, userId);

    // 2. Marquer comme complétée
    await updateSession(sessionId, { completed: true });

    // 3. Nettoyer localStorage
    clearLocalStorage();

    // 4. Rediriger vers résultats
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

  if (isLoading) {
    initializeSession();
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">
            Chargement du questionnaire...
          </p>
        </div>
      </div>
    );
  }

  if (showAuthGate) {
    return <AuthGate onSuccess={handleAuthSuccess} sessionId={sessionId} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Message de restauration */}
        {showRestoredMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 p-4 bg-primary/10 border-2 border-primary/20 rounded-lg flex items-center gap-3"
          >
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Session restaurée
              </p>
              <p className="text-xs text-muted-foreground">
                Vos réponses ont été chargées. Vous pouvez continuer où vous
                vous êtes arrêté.
              </p>
            </div>
          </motion.div>
        )}

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
          Progression sauvegardée automatiquement
        </p>
      </div>
    </div>
  );
}
