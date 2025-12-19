import type { Request, Response } from "express";
import CategoryService from "@/services/category.service";
import type { CategoryModel } from "@/generated/prisma/models";
import type { RequiredKeys } from "@prisma/client/runtime/library";
import type { ExtendedRequest } from "@/types/request.types";
import { isSafeUser } from "@/types/request.types";

const CategoryController = {
  getAll: async (req: Request, res: Response) => {
    const categories = await CategoryService.getAll();
    res.json(categories);
  },
  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await CategoryService.getById(id);
    res.json(category);
  },
  create: async (req: Request, res: Response) => {
    const extendedReq = req as ExtendedRequest;
    const user = extendedReq.user;
    if (!isSafeUser(user)) {
      throw new Error("User type not valid.");
    }
    const category = await CategoryService.create(user, req.body);
    res.json(category);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await CategoryService.update(id, req.body);
    res.json(category);
  },
  remove: async (req: Request, res: Response) => {
    const extendedReq = req as ExtendedRequest;
    const id = Number(extendedReq.params.id);
    const user = extendedReq.user;
    if (!isSafeUser(user)) {
      throw new Error("User type not valid.");
    }
    const category = await CategoryService.remove(user, id);
    res.json(category);
  },
};

export default CategoryController;
