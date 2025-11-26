import { AppError } from "./AppError.js";

export class InternalError extends AppError {
  constructor(message = "Error interno del servidor") {
    super(message, 500);
  }
}
