import type { Request, Response } from "express";
import type { ExtendedRequest } from "@/types/request.types";
import { CommentService } from "@/services/comment.service";
import { isSafeUser } from "@/types/request.types";

export const CommentController = {
  getAll: async (req: Request, res: Response) => {
    const comments = await CommentService.getAll();
    res.json(comments);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Comment id not provided.");
    const comment = await CommentService.getById(id);
    res.json(comment);
  },

  create: async (req: Request, res: Response) => {
    const extendedReq = req as ExtendedRequest;
    const user = extendedReq.user;
    if (!isSafeUser(user)) throw new Error("Wrong user type.");
    const params = req.body.params;
    if (params === undefined) throw new Error("Comment params not provided.");
    const comment = await CommentService.create(user, params);
    res.json(comment);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Comment id not provided.");
    const params = req.body.params;
    if (params === undefined) throw new Error("Comment params not provided.");
    const comment = await CommentService.update(id, params);
    res.json(comment);
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Comment id not provided.");
    const comment = await CommentService.remove(id);
    res.json(comment);
  },
};
