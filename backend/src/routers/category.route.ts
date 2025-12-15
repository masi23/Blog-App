import { Router } from "express";
import CategoryController from "@/controllers/category.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);
router.post("/", authMiddleware, CategoryController.create);
router.put("/:id", authMiddleware, CategoryController.update);
router.delete("/:id", authMiddleware, CategoryController.remove);

export default router;
