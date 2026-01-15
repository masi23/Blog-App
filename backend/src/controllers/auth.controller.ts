import { comparePassword, hashPassword } from "@/services/auth.service";
import type { Request, Response } from "express";
import UserServices from "@/services/user.service";
import { signToken } from "@/utils/jwt";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserServices.getByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "Account not found." });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid email or password." });
  }

  const token = signToken({
    id: user.id,
    role: user.role,
  });

  const { password: _, ...safeUser } = user;

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    })
    .json({ user: safeUser });
};

export const verifyToken = (req: Request, res: Response) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return res.json({ authenticated: true, user: payload });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
};
