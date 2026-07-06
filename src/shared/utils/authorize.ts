import { ForbiddenError } from "../errors/forbidden";

export function authorize(condition: boolean, message?: string) {
  if (!condition) {
    throw new ForbiddenError(message);
  }
}
