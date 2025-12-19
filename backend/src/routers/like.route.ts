import { Router } from "express";
import { LikeController } from "@/controllers/like.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", LikeController.getAll);
router.get("/:id", LikeController.getById);
router.post("/:", authMiddleware, requireRole("ADMIN"), LikeController.create);
router.put("/:id", authMiddleware, requireRole("ADMIN"), LikeController.update);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  LikeController.remove
);

export default router;
