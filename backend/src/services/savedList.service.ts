import { PrismaClient } from "@prisma/client";
import type {
  SavedListModel,
  SavedListCreateInput,
  SavedListUpdateInput,
} from "@/generated/prisma/models";
import type { SafeUser } from "@/types/user.types";

const prisma = new PrismaClient();

export const SavedListService = {
  getAll: async (): Promise<SavedListModel[]> => {
    const savedList = await prisma.savedList.findMany();
    return savedList;
  },

  getById: async (id: number): Promise<SavedListModel | undefined> => {
    const savedList = await prisma.savedList.findUnique({
      where: {
        id: id,
      },
    });

    return savedList ?? undefined;
  },

  create: async (
    user: SafeUser,
    params: SavedListCreateInput
  ): Promise<SavedListModel> => {
    const userId = user.id;
    const { title } = params;
    const savedList = await prisma.savedList.create({
      data: {
        userId: userId,
        title: title,
      },
    });
    return savedList;
  },

  update: async (
    id: number,
    params: SavedListUpdateInput
  ): Promise<SavedListModel | undefined> => {
    const savedList = await prisma.savedList.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
    return savedList ?? undefined;
  },

  remove: async (id: number): Promise<SavedListModel | undefined> => {
    const savedList = await prisma.savedList.delete({
      where: {
        id: id,
      },
    });
    return savedList ?? undefined;
  },
};
