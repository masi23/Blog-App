import { PrismaClient } from "@prisma/client";
import type {
  CommentModel,
  CommentUpdateInput,
} from "@/generated/prisma/models";
import type { SafeUser } from "@/types/user.types";

const prisma = new PrismaClient();

export const CommentService = {
  getAll: async (): Promise<CommentModel[]> => {
    const comments = await prisma.comment.findMany();
    return comments;
  },

  getById: async (id: number): Promise<CommentModel | undefined> => {
    const comment = await prisma.comment.findUnique({
      where: {
        id: id,
      },
    });
    return comment ?? undefined;
  },

  create: async (
    user: SafeUser,
    params: CommentModel
  ): Promise<CommentModel> => {
    const userId = user.id;
    const { content, postId } = params;
    const comment = await prisma.comment.create({
      data: {
        authorId: userId,
        content: content,
        postId: postId,
      },
    });
    return comment;
  },

  update: async (
    id: number,
    params: CommentUpdateInput
  ): Promise<CommentModel | undefined> => {
    const comment = await prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
    return comment ?? undefined;
  },

  remove: async (id: number): Promise<CommentModel | undefined> => {
    const comment = await prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return comment ?? undefined;
  },
};
