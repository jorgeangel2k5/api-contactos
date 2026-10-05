import { Router } from "express";
import { getUsers, login, register } from "../controllers/authControllers.js";

const router = Router();

router.get("/", getUsers);
router.post("/register", register);
router.post("/login", login);

export default router;