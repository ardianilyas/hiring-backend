import type { AuthSession } from "../../shared/constants/auth.constants";
import type { Application } from "./application.dto";

export class ApplicationPolicy {
  /**
   * Determine whether the user can view the application.
   */
  view(user: AuthSession["user"], application: Application): boolean {
    return user.role === "admin" || user.id === application.userId;
  }
}
