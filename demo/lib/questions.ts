export type QuestionType = 'single' | 'multiple' | 'text'

export interface Question {
  id: string
  section: string
  question: string
  type: QuestionType
  options: string[]
  description?: string
  placeholder?: string // Pour les questions de type "text"
}

// Questions du questionnaire de rénovation énergétique
export const questions: Question[] = [
  {
    id: "q1",
    section: "Votre bien",
    question: "De quel type de bien s'agit-il ?",
    type: "single",
    options: ["Une maison", "Un appartement", "Un immeuble", "Autre"],
  },
  {
    id: "q2",
    section: "Votre bien",
    question: "Dans quel contexte s'inscrit votre réflexion ?",
    type: "single",
    options: [
      "Un projet de vente",
      "Un projet d'acquisition",
      "Une succession",
      "Les obligations de performance pour la location",
      "Autre",
    ],
  },
  {
    id: "q3",
    section: "Votre bien",
    question:
      "Quelle est/sera votre statut vis à vis de ce logement, au sens de la fiscalité ?",
    type: "single",
    options: [
      "Propriétaire occupant (domiciliation fiscale)",
      "Occupant en résidence principale par le biais d'une SCI",
      "Propriétaire en résidence secondaire",
      "Propriétaire bailleur en nom propre (location pour une résidence principale)",
      "Propriétaire bailleur par le biais d'une personne morale (de type SCI...)",
      "Autre",
    ],
  },
  {
    id: "q4",
    section: "Votre bien",
    question:
      "Pour environ combien d'années vous projetez-vous dans votre logement ?",
    type: "single",
    options: [
      "Moins de 2 ans",
      "Entre 2 et 5 ans",
      "Entre 5 et 10 ans",
      "Plus de 10 ans",
      "Je ne sais pas",
    ],
  },
  {
    id: "q5",
    section: "Votre bien",
    question:
      "Quelles sont vos motivations pour la réalisation de travaux de rénovation énergétique ?",
    type: "multiple",
    options: [
      "Je veux améliorer l'étiquette DPE (Diagnostic de Performance Energétique) de mon logement",
      "Je souhaite réduire mes factures d'énergie",
      "Je souhaite améliorer mon confort d'été",
      "Je souhaite améliorer mon confort d'hiver",
      "Autre",
    ],
  },
  {
    id: "q6",
    section: "Votre bien",
    question:
      "Avez-vous remarqué des problèmes d'humidité ou de structure dans le logement ?",
    type: "multiple",
    options: [
      "Problèmes d'humidité",
      "Problèmes de structure",
      "Aucun problème",
    ],
  },
  {
    id: "q7",
    section: "Votre bien",
    question:
      "Avez-vous une question ou un objectif précis dont vous souhaitez nous faire part ?",
    type: "text",
    options: [],
    placeholder: "Décrivez votre question ou objectif ici..."
  },
]

export const sections = Array.from(new Set(questions.map(q => q.section)))

export function getQuestionsBySection(section: string): Question[] {
  return questions.filter(q => q.section === section)
}

export function getTotalQuestions(): number {
  return questions.length
}

export function getEstimatedTime(): number {
  // Retourne le temps estimé en minutes
  return 7
}