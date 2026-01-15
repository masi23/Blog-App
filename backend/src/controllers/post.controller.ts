import type { Request, Response } from "express";
import { PostService } from "@/services/post.service";
import type { ExtendedRequest } from "@/types/request.types";
import { isSafeUser } from "@/types/request.types";

export const PostController = {
  getAll: async (req: Request, res: Response) => {
    const extendedReq = req as ExtendedRequest;
    let authUser = extendedReq.user;
    if (extendedReq.user) {
      //...
    }

    //get posts by categories
    const categoryParams = req.query.categories as string;
    if (categoryParams) {
      const categoriesId = categoryParams.split(",").map(Number);
      const posts = await PostService.getByCategories(categoriesId);
      res.json(posts);
    }
    //get all posts
    const posts = await PostService.getAll();
    return res.json(posts);
  },

  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Post id not provided.");
    const post = await PostService.getById(id);
    res.json(post);
  },

  create: async (req: Request, res: Response) => {
    const extendedReq = req as ExtendedRequest;
    const user = extendedReq.user;
    const params = req.body;
    if (!isSafeUser(user)) throw new Error("Wrong user type");
    if (params === undefined) throw new Error("Post params not provided.");
    const post = await PostService.create(user, params);
    res.json(post);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Post id not provided.");
    const params = req.body;
    const post = await PostService.update(id, params);
    res.json(post);
  },

  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (id === undefined) throw new Error("Post id not provided.");
    const post = await PostService.remove(id);
    res.json(post);
  },
};
