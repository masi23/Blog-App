import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { ExtendedRequest } from "@/types/request.types";

// type ExtendedRequest = Request & { user: string | JwtPayload };

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const extendedReq = req as ExtendedRequest;

  if (!header) {
    return res.sendStatus(401);
  }

  const token = header.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    extendedReq.user = payload as JwtPayload;
    next();
  } catch {
    res.sendStatus(401);
  }
};
