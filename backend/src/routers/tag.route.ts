import { Router } from "express";
import { TagController } from "@/controllers/tag.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", TagController.getAll);
router.get("/:id", TagController.getById);
router.post("/", authMiddleware, requireRole("ADMIN"), TagController.create);
router.put("/:id", authMiddleware, requireRole("ADMIN"), TagController.update);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  TagController.remove
);

export default router;
