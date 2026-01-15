import { Router } from "express";
import { login, verifyToken } from "@/controllers/auth.controller";
import UserController from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
const router = Router();

router.post("/login", login);
router.post("/register", UserController.create);
router.get("/verifyToken", verifyToken);

export default router;
