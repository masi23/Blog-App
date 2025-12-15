import type { Request, Response } from "express";
import UserServices from "@/services/user.service";
import { hashPassword } from "@/services/auth.service";

const UserController = {
  getAll: async (req: Request, res: Response) => {
    const users = await UserServices.getAll();
    res.json(users);
  },
  getById: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await UserServices.getById(id);
    res.json(user);
  },
  create: async (req: Request, res: Response) => {
    const { password, ...rest } = req.body;
    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashed = await hashPassword(password);
    const createdUser = await UserServices.create({
      password: hashed,
      ...rest,
    });
    res.json(createdUser);
  },
  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updatedUser = await UserServices.update(id, req.body);
    res.json(updatedUser);
  },
  remove: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const removedUser = await UserServices.remove(id);
    res.json(removedUser);
  },
};

export default UserController;
