import { PrismaClient } from "@prisma/client";
import type { UserModel } from "@prisma/models";

const prisma = new PrismaClient();

type SafeUser = Omit<UserModel, "password">;

const UserServices = {
  getAll: async (): Promise<SafeUser[] | undefined> => {
    const users = await prisma.user.findMany({
      omit: {
        password: true,
      },
    });
    return users;
  },
  getById: async (id: number): Promise<SafeUser | undefined> => {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      omit: {
        password: true,
      },
    });

    if (!user) return undefined;

    return user;
  },
  getByEmail: async (email: string): Promise<UserModel | undefined> => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return undefined;
    return user;
  },
  create: async (params: UserModel): Promise<SafeUser> => {
    const user = await prisma.user.create({
      data: {
        ...params,
      },
    });
    return user;
  },

  update: async (
    id: number,
    params: Partial<UserModel>
  ): Promise<SafeUser | undefined> => {
    if (!id) {
      console.error("Params has no ID");
      return undefined;
    }
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
    return updatedUser;
  },

  remove: async (id: number): Promise<SafeUser | undefined> => {
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    return deletedUser;
  },
};

export default UserServices;
