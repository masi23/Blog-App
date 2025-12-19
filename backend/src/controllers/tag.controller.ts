import { TagService } from "@/services/tag.service";
import type { Request, Response } from "express";

export const TagController = {
  getAll: async (req: Request, res: Response) => {
    const tags = await TagService.getAll();
    res.json(tags);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) {
      throw new Error("Tag id not provided.");
    }
    const tag = await TagService.getById(id);
    res.json(tag);
  },

  create: async (req: Request, res: Response) => {
    const { name } = req.body;
    if (!name) {
      throw new Error("Tag name not provided.");
    }
    const tag = await TagService.create(name);
    res.json(tag);
  },

  update: async (req: Request, res: Response) => {
    const { name } = req.body;
    const id = Number(req.params.id);
    if (!id) throw new Error("Tag id not provided.");
    if (!name) throw new Error("Tag name not provided.");
    const tag = await TagService.update({ id, name });
    res.json(tag);
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) {
      throw new Error("Tag id not provided.");
    }
    const tag = await TagService.remove(id);
    res.json(tag);
  },
};
