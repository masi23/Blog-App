import type { Request, Response, NextFunction } from "express";
type Role = "USER" | "ADMIN";

export const roleMiddleware = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if ((req as any).user.role != role) {
      return res.sendStatus(403);
    }
    next();
  };
};
