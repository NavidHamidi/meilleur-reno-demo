"use server";

import { createServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type {
  SignInPayload,
  SignUpPayload,
  UserRole,
  AuthUser,
} from "@/lib/types/auth";

// ─── Sign In ────────────────────────────────────────────────────────────────

export async function signIn(
  payload: SignInPayload,
  options: {
    allowedRoles?: UserRole[];
    redirectTo?: string;
  } = {},
): Promise<{ error?: string }> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error || !data.user) {
    return { error: "Email ou mot de passe incorrect." };
  }

  const role = data.user.user_metadata?.role as UserRole;

  // Vérification des rôles autorisés si spécifiés
  if (options.allowedRoles && !options.allowedRoles.includes(role)) {
    await supabase.auth.signOut();
    return { error: "Vous n'avez pas accès à cet espace." };
  }

  redirect(options.redirectTo ?? "/");
}

// ─── Sign Up ────────────────────────────────────────────────────────────────

export async function signUp(
  payload: SignUpPayload,
  redirectTo: string,
): Promise<{ error?: string }> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        role: payload.role,
        first_name: payload.firstName,
        last_name: payload.lastName,
        company_name: payload.companyName ?? null,
        siret: payload.siret ?? null,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "Un compte existe déjà avec cet email." };
    }
    return { error: "Erreur lors de la création du compte." };
  }

  // Créer le profil dans public.profiles
  if (data.user) {
    const supabaseAdmin = await createServerClient({ useServiceRole: true });
    await supabaseAdmin.from("profiles").insert({
      id: data.user.id,
      email: payload.email,
      first_name: payload.firstName,
      last_name: payload.lastName,
      role: payload.role,
      company_name: payload.companyName ?? null,
      siret: payload.siret ?? null,
    });
  }

  redirect(redirectTo);
}

// ─── Sign Out ────────────────────────────────────────────────────────────────

export async function signOut(redirectTo = "/"): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect(redirectTo);
}

// ─── Reset Password ──────────────────────────────────────────────────────────

export async function resetPassword(
  email: string,
): Promise<{ error?: string }> {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/update-password`,
  });

  // On ne révèle pas si l'email existe ou non (sécurité)
  if (error) {
    console.error("Reset password error:", error);
  }

  return {};
}

// ─── Update Password ─────────────────────────────────────────────────────────

export async function updatePassword(
  newPassword: string,
): Promise<{ error?: string }> {
  const supabase = await createServerClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: "Erreur lors de la mise à jour du mot de passe." };
  }

  redirect("/auth/login?passwordUpdated=true");
}

// Helpers serveur pour récupérer et vérifier la session
// À utiliser dans les Server Components, layouts, et Route Handlers

// ─── Récupérer l'utilisateur courant (nullable) ──────────────────────────────

export async function getUser(): Promise<AuthUser | null> {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  return {
    id: user.id,
    email: user.email!,
    role: user.user_metadata?.role as UserRole,
    firstName: user.user_metadata?.first_name,
    lastName: user.user_metadata?.last_name,
  };
}

// ─── Requiert une session active, sinon redirect ─────────────────────────────

export async function requireAuth(loginUrl = "/auth/login"): Promise<AuthUser> {
  const user = await getUser();

  if (!user) {
    redirect(loginUrl);
  }

  return user;
}

// ─── Requiert un rôle spécifique, sinon redirect ─────────────────────────────

export async function requireRole(
  allowedRoles: UserRole[],
  options: {
    loginUrl?: string;
    unauthorizedUrl?: string;
  } = {},
): Promise<AuthUser> {
  const { loginUrl = "/auth/login", unauthorizedUrl = "/403" } = options;

  const user = await getUser();

  if (!user) {
    redirect(loginUrl);
  }

  if (!allowedRoles.includes(user.role)) {
    redirect(unauthorizedUrl);
  }

  return user;
}

// ─── Lier une session de questionnaire à un utilisateur ─────────────────────────────

export async function linkSessionToUser(sessionId: string, userId: string) {
  try {
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from("questionnaire_sessions")
      .update({ user_id: userId })
      .eq("id", sessionId)
      .select();

    if (error) {
      console.error("Link session error:", error);
      return { success: false, error: error.message };
    }

    console.log("Session linked to user:", { sessionId, userId });
    return { success: true, data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Link session exception:", error);
    return { success: false, error: error.message };
  }
}
