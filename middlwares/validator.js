import { validationResult, check } from "express-validator";
import User from "../models/Users.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

//para validar el registro
export const registerValidation = () => [
  check("username")
    .notEmpty()
    .withMessage("El nombre de usuario no puede estar vacío")
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error("El usuario ya existe");
      }
    }),
  check("email")
    .isEmail()
    .withMessage("Ingresa un correo electrónico válido")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("El correo ya está registrado");
      }
    }),
  check("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  handleValidationErrors,
];

// para validar el Login
export const loginValidation = () => [
  check("email")
    .isEmail()
    .withMessage("Ingresa un correo electrónico válido"),
  check("password")
    .notEmpty()
    .withMessage("La contraseña no puede estar vacía"),
  handleValidationErrors,
];