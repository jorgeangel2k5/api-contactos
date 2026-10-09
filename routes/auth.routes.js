import { Router } from "express";
import { getUsers, login, register, verifyEmail, } from "../controllers/authControllers.js";
import { registerValidation, loginValidation } from "../middlwares/validator.js";

const router = Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", loginValidation(), login);
router.post("/verify-email", verifyEmail);


export default router;