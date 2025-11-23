import jwt from "jsonwebtoken";
import "dotenv/config";

const secret_ket = process.env.JWT_SECRET_KEY;

export const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No se proporcionó un token o es inválido" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Formato de token inválido" });
  }

  jwt.verify(token, secret_ket, (error) => {
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    next();
  });
};
