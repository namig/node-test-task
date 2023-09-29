import { HttpError } from "./HttpError";

export class ValidationHttpError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}