/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from './supabase'

export type AuthUser = {
  id: string
  email: string
  created_at: string
}

export type SignUpData = {
  email: string
  password: string
  fullName?: string
}

export type SignInData = {
  email: string
  password: string
}

/**
 * Inscription avec email et mot de passe
 */
export async function signUp({ email, password, fullName }: SignUpData) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('SignUp error:', error)
      return { success: false, error: error.message }
    }

    console.log('SignUp successful:', data.user?.email)
    return { success: true, user: data.user }
  } catch (error: any) {
    console.error('SignUp exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Connexion avec email et mot de passe
 */
export async function signIn({ email, password }: SignInData) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('SignIn error:', error)
      return { success: false, error: error.message }
    }

    console.log('SignIn successful:', data.user?.email)
    return { success: true, user: data.user, session: data.session }
  } catch (error: any) {
    console.error('SignIn exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Connexion avec Google
 */
export async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      console.error('Google SignIn error:', error)
      return { success: false, error: error.message }
    }

    console.log('Google SignIn initiated')
    return { success: true, data }
  } catch (error: any) {
    console.error('Google SignIn exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Déconnexion
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('SignOut error:', error)
      return { success: false, error: error.message }
    }

    console.log('SignOut successful')
    return { success: true }
  } catch (error: any) {
    console.error('SignOut exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Récupérer l'utilisateur actuellement connecté
 */
export async function getCurrentUser() {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      console.error('GetUser error:', error)
      return { success: false, error: error.message, user: null }
    }

    return { success: true, user }
  } catch (error: any) {
    console.error('GetUser exception:', error)
    return { success: false, error: error.message, user: null }
  }
}

/**
 * Récupérer la session actuelle
 */
export async function getSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      console.error('GetSession error:', error)
      return { success: false, error: error.message, session: null }
    }

    return { success: true, session }
  } catch (error: any) {
    console.error('GetSession exception:', error)
    return { success: false, error: error.message, session: null }
  }
}

/**
 * Réinitialiser le mot de passe
 */
export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      console.error('Reset password error:', error)
      return { success: false, error: error.message }
    }

    console.log('Reset password email sent')
    return { success: true }
  } catch (error: any) {
    console.error('Reset password exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Lier une session de questionnaire à un utilisateur
 */
export async function linkSessionToUser(sessionId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('questionnaire_sessions')
      .update({ user_id: userId })
      .eq('id', sessionId)
      .select()

    if (error) {
      console.error('Link session error:', error)
      return { success: false, error: error.message }
    }

    console.log('Session linked to user:', { sessionId, userId })
    return { success: true, data }
  } catch (error: any) {
    console.error('Link session exception:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Hook pour écouter les changements d'authentification
 */
export function onAuthStateChange(callback: (user: any) => void) {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session?.user ?? null)
  })

  return subscription
}