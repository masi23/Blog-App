import { PrismaClient } from "@prisma/client";
import type { TagModel } from "@/generated/prisma/models";

const prisma = new PrismaClient();

export const TagService = {
  getAll: async (): Promise<TagModel[] | undefined> => {
    const tags = await prisma.tag.findMany();
    return tags;
  },

  getById: async (id: number): Promise<TagModel | undefined> => {
    const tag = await prisma.tag.findUnique({
      where: {
        id: id,
      },
    });
    return tag ?? undefined;
  },

  create: async (name: string): Promise<TagModel> => {
    const tag = prisma.tag.create({
      data: {
        name: name,
      },
    });

    return tag;
  },

  update: async (params: TagModel): Promise<TagModel | undefined> => {
    const tag = await prisma.tag.update({
      where: {
        id: Number(params.id),
      },
      data: {
        name: params.name,
      },
    });

    return tag ?? undefined;
  },

  remove: async (id: number): Promise<TagModel | undefined> => {
    const tag = await prisma.tag.delete({
      where: { id: id },
    });

    return tag ?? undefined;
  },
};
