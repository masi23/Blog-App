import type { Request, Response } from "express";
import CategoryService from "@/services/category.service";
import type { CategoryModel } from "@/generated/prisma/models";
import type { RequiredKeys } from "@prisma/client/runtime/library";

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
    const category = await CategoryService.create(req.body);
    res.json(category);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await CategoryService.update(id, req.body);
    res.json(category);
  },
  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await CategoryService.remove(id);
    res.json(category);
  },
};

export default CategoryController;
