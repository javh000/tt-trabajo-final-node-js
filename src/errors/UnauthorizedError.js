import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(message = "No Autorizado") {
    super(message, 401);
  }
}
