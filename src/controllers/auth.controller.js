import { generateToken } from "../utils/token-generator.js";
import { BadRequestError, UnauthorizedError } from "../errors/index.js";

const defaultUser = {
  id: 1,
  email: "test@gmail.com",
  password: "123456",
};

export const login = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new BadRequestError("Falta el cuerpo en la solicitud");
    }
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Email y contraseña son obligatorios");
    }

    if (email !== defaultUser.email || password !== defaultUser.password) {
      throw new UnauthorizedError("Usuario o contraseña incorrectos");
    }
    const user = { id: defaultUser.id, email };
    const token = generateToken(user);
    return res.json({ message: "Usuario ingresado exitosamente", token });
  } catch (err) {
    next(err);
  }
};
