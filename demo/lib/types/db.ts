export type SurveyResponse = {
  id: string
  session_id: string
  question_id: string
  answer: string | string[]
  created_at: string
  updated_at: string
}

export type SurveySession = {
  id: string
  current_step: number
  completed: boolean
  created_at: string
  updated_at: string
  completed_at?: string
}