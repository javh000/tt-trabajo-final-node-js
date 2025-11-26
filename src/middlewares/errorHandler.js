import { AppError } from "../errors/AppError.js";

export const errorHandler = (err, req, res, next) => {
  console.error("error: ", err);
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ error: err.message, type: err.name });
  }

  return res.status(500).json({ error: "Error interno del servidor" });
};
