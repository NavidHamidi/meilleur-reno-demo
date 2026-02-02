-- Créer la table pour les sessions de survey
CREATE TABLE IF NOT EXISTS mr_survey_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  current_step INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Créer la table pour les réponses
CREATE TABLE IF NOT EXISTS mr_survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES mr_urvey_sessions(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(session_id, question_id)
);

-- Activer Row Level Security (RLS)
ALTER TABLE mr_survey_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE mr_survey_responses ENABLE ROW LEVEL SECURITY;

-- Politique RLS pour mr_survey_sessions
-- Permettre à tout le monde de créer une session
CREATE POLICY "Anyone can create sessions"
  ON mr_survey_sessions
  FOR INSERT
  WITH CHECK (true);

-- Permettre à tout le monde de lire et mettre à jour les sessions (démo uniquement)
CREATE POLICY "Tout le monde peut lire les sessions"
  ON mr_survey_sessions
  FOR SELECT
  USING (true);

CREATE POLICY "Tout le monde peut mettre à jour les sessions"
  ON mr_survey_sessions
  FOR UPDATE
  USING (true);

-- Politique RLS pour mr_survey_responses
-- Permettre à tout le monde de créer des réponses
CREATE POLICY "Tout le monde peut créer des réponses"
  ON mr_survey_responses
  FOR INSERT
  WITH CHECK (true);

-- Permettre à tout le monde de lire les réponses
CREATE POLICY "Tout le monde peut lire les réponses"
  ON mr_survey_responses
  FOR SELECT
  USING (true);

-- Permettre à tout le monde de mettre à jour les réponses (pour upsert)
CREATE POLICY "Tout le monde peut mettre à jour les réponses"
  ON mr_survey_responses
  FOR UPDATE
  USING (true);

-- Fonction pour mettre à jour automatiquement le champ updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour updated_at
CREATE TRIGGER update_survey_sessions_updated_at
  BEFORE UPDATE ON mr_survey_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_survey_responses_updated_at
  BEFORE UPDATE ON mr_survey_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index pour optimiser les performances
CREATE INDEX idx_responses_session_id ON mr_survey_responses(session_id);
CREATE INDEX idx_sessions_completed ON mr_survey_sessions(completed);
CREATE INDEX idx_sessions_created_at ON mr_survey_sessions(created_at);
