import { Router } from "express";
import { SavedListController } from "@/controllers/savedList.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { roleMiddleware as requireRole } from "@/middlewares/role.middleware";

const router = Router();

router.get("/", SavedListController.getAll);
router.get("/:id", SavedListController.getById);
router.post(
  "/",
  authMiddleware,
  requireRole("ADMIN"),
  SavedListController.create
);
router.put(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  SavedListController.update
);
router.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  SavedListController.remove
);

export default router;
