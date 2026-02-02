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
    section: "Votre projet",
    question: "De quel type de bien s'agit-il ?",
    type: "single",
    options: ["Une maison", "Un appartement", "Un immeuble", "Autre"],
  },
  {
    id: "q2",
    section: "Votre projet",
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
    section: "Votre projet",
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
    section: "Votre projet",
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
    section: "Votre projet",
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
    section: "Votre projet",
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
    section: "Votre projet",
    question:
      "Avez-vous une question ou un objectif précis dont vous souhaitez nous faire part ?",
    type: "text",
    options: [],
    placeholder: "Décrivez votre question ou objectif ici..."
  },
  {
    id: "q8",
    section: "Votre projet",
    question:
      "Avez-vous un Diagnostic de Performance Energétique (DPE) et quelle est son étiquette ?",
    type: "single",
    options: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "Je n'ai pas de DPE",
      "Je ne me souviens plus de la note",
    ],
  },
  {
    id: "q9",
    section: "Votre projet",
    question:
      "Si vous estimez que votre DPE est fiable (réalisé après 2021, sans rénovation depuis et avec des équipements correctement renseignés), vous pouvez indiquez son numéro pour obtenir vos résultats plus rapidement",
    type: "text",
    options: [],
    placeholder: "Numéro du DPE",
  },
  {
    id: "q10",
    section: "Votre bien",
    question:
      "Selon vous, vers quelle période a été construit l'immeuble ? Cette information permet d’estimer les caractéristiques et la performance du bâti : - Avant 1948 : immeubles anciens avec des matériaux laissant transiter la vapeur d’eau - A partir de 1974 : apparition de la première réglementation thermique",
    type: "single",
    options: [
      "Problèmes d'humidité",
      "Problèmes de structure",
      "Aucun problème",
    ],
  },
  {
    id: "q8",
    section: "Votre projet",
    question:
      "Avez-vous un Diagnostic de Performance Energétique (DPE) et quelle est son étiquette ?",
    type: "single",
    options: [
      "Problèmes d'humidité",
      "Problèmes de structure",
      "Aucun problème",
    ],
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