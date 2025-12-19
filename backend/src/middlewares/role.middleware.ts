import type { Request, Response, NextFunction } from "express";
import type { ExtendedRequest } from "@/types/request.types";
type Role = "USER" | "ADMIN";

export const roleMiddleware = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as ExtendedRequest).user.role != role) {
      return res.sendStatus(403);
    }
    next();
  };
};
