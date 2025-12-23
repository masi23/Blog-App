import { Router } from "express";
import { login } from "@/controllers/auth.controller";
import UserController from "@/controllers/user.controller";
const router = Router();

router.post("/login", login);
router.post("/register", UserController.create);

export default router;
