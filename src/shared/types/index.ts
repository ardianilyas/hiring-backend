import type { Request } from "express";
import type { AuthSession } from "../constants/auth.constants";

export interface AuthenticatedRequest extends Request {
  auth: AuthSession;
}
