export type UserRole = "admin" | "editor" | "client" | "prestataire";

export type AuthUser = {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
};

export type AuthResult =
  | { success: true; user: AuthUser }
  | { success: false; error: string };

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Extract<UserRole, "client" | "prestataire">;
  companyName?: string;
  siret?: string;
};