import type { roleEnum } from "../db/schemas";

export const AUTH_MESSAGE = {
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "Forbidden",
  SESSION_NOT_FOUND: "Session not found",
} as const;

export const AUTH_STATUS_CODE = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
} as const;

type UserRole = typeof roleEnum.enumValues[number];

export interface SessionUser {
  id: string;
  name?: string;
  email: string;
  role: UserRole,
  image?: string | null;
}

export interface AuthSession {
  session: {
    id: string;
    expiresAt: Date;
  };

  user: SessionUser;
}
