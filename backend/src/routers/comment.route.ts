import { Router } from "express";
import { CommentController } from "@/controllers/comment.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", CommentController.getAll);
router.get("/:id", CommentController.getById);
router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  CommentController.create
);
router.put(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  CommentController.update
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  CommentController.remove
);

export default router;
