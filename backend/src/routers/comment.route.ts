import { Router } from "express";
import { CommentController } from "@/controllers/comment.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", CommentController.getAll);
router.get("/:id", CommentController.getById);
router.post("/", authMiddleware, CommentController.create);
router.put("/:id", authMiddleware, CommentController.update);
router.delete("/:id", authMiddleware, CommentController.remove);

export default router;
