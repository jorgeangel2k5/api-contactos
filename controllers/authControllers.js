import User from "../models/Users.js";
import { sendVerificationEmail } from "../config/nodemailer.js";
import bcrypt from "bcryptjs";

const getUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    msg: "Todo bien",
    users,
  });
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email, password });

    const verificationCode = user.generateVerificationCode();
    console.log("Código generado:", verificationCode);

    await user.save();

    await sendVerificationEmail(email, username, verificationCode);

    return res.status(201).json({
      ok: true,
      msg: "¡Usuario creado!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscamos el usuario por el email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    // Comparamos el password recibido con el de la base de datos
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    // Aaquí cerramos la petición respondiendo con JSON
    return res.json({
      ok: true,
      msg: "¡Login exitoso!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Error en login:", error);
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
};

export { getUsers, register, login };