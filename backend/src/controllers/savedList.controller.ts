import type { Request, Response } from "express";
import { isSafeUser, type ExtendedRequest } from "@/types/request.types";
import { SavedListService } from "@/services/savedList.service";

export const SavedListController = {
  getAll: async (req: Request, res: Response) => {
    const savedLists = await SavedListService.getAll();
    res.json(savedLists);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("List id not provided");
    const savedList = await SavedListService.getById(id);
    res.json(savedList);
  },

  create: async (req: Request, res: Response) => {
    const extendedReq = req as ExtendedRequest;
    const user = extendedReq.user;
    if (!isSafeUser(user)) throw new Error("Wrong user type");
    const params = req.body;
    if (params === undefined) throw new Error("List params not provided.");
    const savedList = await SavedListService.create(user, params);
    res.json(savedList);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("List id not provided.");
    const params = req.body;
    if (params === undefined) throw new Error("List params not provided.");
    const savedList = await SavedListService.update(id, params);
    res.json(savedList);
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("List id not provided.");
    const savedList = SavedListService.remove(id);
    res.json(savedList);
  },
};
