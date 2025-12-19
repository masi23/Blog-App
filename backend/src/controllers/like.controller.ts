import type { Request, Response } from "express";
import type { ExtendedRequest } from "@/types/request.types";
import { LikeService } from "@/services/like.service";
import { isSafeUser } from "@/types/request.types";

export const LikeController = {
  getAll: async (req: Request, res: Response) => {
    const likes = await LikeService.getAll();
    res.json(likes);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Like id not provided.");
    const like = await LikeService.getById(id);
    res.json(like);
  },

  create: async (req: Request, res: Response) => {
    const extendedReq = req as ExtendedRequest;
    const user = extendedReq.user;
    if (!isSafeUser(user)) throw new Error("Wrong user type.");
    const params = req.body;
    if (params === undefined) throw new Error("Like params not provided.");
    const like = await LikeService.create(user, params);
    res.json(like);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Like id not provided.");
    const params = req.body;
    if (params === undefined) throw new Error("Like params not provided.");
    const like = await LikeService.update(id, params);
    res.json(params);
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Like id not provided.");
    const like = LikeService.remove(id);
    res.json(like);
  },
};
