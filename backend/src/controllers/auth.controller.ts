import { comparePassword, hashPassword } from "@/services/auth.service";
import type { Request, Response } from "express";
import UserServices from "@/services/user.service";
import { signToken } from "@/utils/jwt";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserServices.getByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
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
