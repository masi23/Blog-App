import { PrismaClient } from "@prisma/client";
import type { LikeModel, LikeUpdateInput } from "@/generated/prisma/models";
import type { SafeUser } from "@/types/user.types";

const prisma = new PrismaClient();

export const LikeService = {
  getAll: async (): Promise<LikeModel[]> => {
    const likes = await prisma.like.findMany();
    return likes;
  },

  getById: async (id: number): Promise<LikeModel | undefined> => {
    const like = await prisma.like.findUnique({
      where: {
        id: id,
      },
    });
    return like ?? undefined;
  },

  create: async (user: SafeUser, params: LikeModel): Promise<LikeModel> => {
    const userId = user.id;
    const { postId } = params;
    const like = await prisma.like.create({
      data: {
        userId: userId,
        postId: postId,
      },
    });
    return like;
  },

  update: async (
    id: number,
    params: LikeUpdateInput
  ): Promise<LikeModel | undefined> => {
    const like = await prisma.like.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
    return like ?? undefined;
  },

  remove: async (id: number): Promise<LikeModel | undefined> => {
    const like = prisma.like.delete({
      where: {
        id: id,
      },
    });
    return like ?? undefined;
  },
};
