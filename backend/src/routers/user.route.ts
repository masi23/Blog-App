import { Router } from "express";
import UserController from "@/controllers/user.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.post("/", authMiddleware, requireRole("ADMIN"), UserController.create);
router.put("/:id", authMiddleware, requireRole("ADMIN"), UserController.update);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  UserController.remove
);

export default router;
