import { generateToken } from "../utils/token-generator.js";

const defaultUser = {
  id: 1,
  email: "test@gmail.com",
  password: "123456",
};

export const login = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.json("Falta el cuerpo en la solicitud");
  }
  const { email, password } = req.body;

  if (email === defaultUser.email && password === defaultUser.password) {
    const user = { id: defaultUser.id, email };
    const token = await generateToken(user);
    res.json({ message: "Usuario ingresado exitosamente", token });
  } else {
    res.status(401).json("error de autenticación");
  }
};
