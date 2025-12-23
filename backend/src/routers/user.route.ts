import { Router } from "express";
import UserController from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", authMiddleware, UserController.create);
router.put("/:id", authMiddleware, UserController.update);
router.delete("/:id", authMiddleware, UserController.remove);

export default router;
