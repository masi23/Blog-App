import type { Request } from "express";
import type { SafeUser } from "./user.types";
import type { JwtPayload } from "jsonwebtoken";

export interface ExtendedRequest extends Request {
  user: SafeUser | JwtPayload;
}

export function isSafeUser(user: SafeUser | JwtPayload): user is SafeUser {
  return (user as SafeUser).name !== undefined;
}

export function isPayload(user: SafeUser | JwtPayload): user is JwtPayload {
  return (user as JwtPayload).name === undefined;
}
