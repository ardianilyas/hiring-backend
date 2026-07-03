import "express";
import type { AuthSession } from "../constants/auth.constants";

declare global {
  namespace Express {
    interface Request {
      auth?: AuthSession;
    }
  }
}
