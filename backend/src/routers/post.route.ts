import { Router } from "express";
import { PostController } from "@/controllers/post.controller";
import { authMiddleware, userMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", userMiddleware, PostController.getAll);
// router.get("/", PostController.getByCategory);
router.get("/:id", userMiddleware, PostController.getById);
router.post("/", authMiddleware, requireRole("ADMIN"), PostController.create);
router.put("/:id", authMiddleware, requireRole("ADMIN"), PostController.update);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  PostController.remove
);

export default router;
