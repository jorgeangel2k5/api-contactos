import { Router } from "express";
import { getUsers, login, register, verifyEmail, } from "../controllers/authControllers.js";
import { registerValidation, loginValidation } from "../middlwares/validator.js";

const router = Router();

router.get("/", getUsers);
router.post("/login", loginValidation(), login);
router.post("/register", registerValidation(), register);
router.post("/verify-email", verifyEmail);


export default router;