import { generateToken } from "../utils/token-generator.js";
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "../errors/index.js";

const users = [
  {
    id: 1,
    email: "test@gmail.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 2,
    email: "user@gmail.com",
    password: "1234",
    role: "user",
  },
];

export const login = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError("Falta el cuerpo en la solicitud");
    }
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email y contraseña son obligatorios");
    }

    const userFound = users.find((user) => user.email === email);

    if (!userFound) {
      throw new UnauthorizedError("Usuario y contraseña incorrectos");
    }

    if (password !== userFound.password) {
      throw new UnauthorizedError("Usuario o contraseña incorrectos");
    }

    if (userFound.role !== "admin") {
      throw new ForbiddenError(
        "No tienes permisos para acceder a esta sección"
      );
    }
    const user = {
      id: userFound.id,
      email: userFound.email,
      role: userFound.role,
    };
    const token = generateToken(user);
    return res.json({ message: "Usuario ingresado exitosamente", token });
  } catch (err) {
    next(err);
  }
};
