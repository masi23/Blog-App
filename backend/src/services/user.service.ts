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

    return user ?? undefined;
  },
  getByEmail: async (email: string): Promise<UserModel | undefined> => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user ?? undefined;
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
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
    return updatedUser ?? undefined;
  },

  remove: async (id: number): Promise<SafeUser | undefined> => {
    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });
    return deletedUser ?? undefined;
  },
};

export default UserServices;
