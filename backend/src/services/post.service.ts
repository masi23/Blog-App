import { Prisma, PrismaClient } from "@prisma/client";
import type {
  PostModel,
  PostCreateInput,
  PostUpdateInput,
} from "@/generated/prisma/models";
import type { SafeUser } from "@/types/user.types";

const prisma = new PrismaClient();

export const PostService = {
  getAll: async (): Promise<PostModel[]> => {
    const posts = await prisma.post.findMany();
    return posts;
  },

  getById: async (id: number): Promise<PostModel | undefined> => {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    return post ?? undefined;
  },

  getByCategories: async (categoriesId: number[]): Promise<PostModel[]> => {
    return prisma.post.findMany({
      where: categoriesId.length ? { categoryId: { in: categoriesId } } : {},
    });
  },

  create: async (user: SafeUser, params: PostModel): Promise<PostModel> => {
    const userId = user.id;
    const { title, imageUrl, categoryId, postStatus, description } = params;
    const contentBlocks: Prisma.InputJsonValue =
      params.contentBlocks as Prisma.InputJsonValue;
    const post = await prisma.post.create({
      data: {
        title: title,
        imageUrl: imageUrl,
        categoryId: categoryId,
        contentBlocks: contentBlocks,
        authorId: userId,
        postStatus: postStatus || "DRAFT",
        description: description,
      },
    });
    return post;
  },

  update: async (id: number, params: PostUpdateInput): Promise<PostModel> => {
    const post = await prisma.post.update({
      where: { id: id },
      data: {
        ...params,
      },
    });
    return post;
  },

  remove: async (id: number): Promise<PostModel> => {
    const post = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
  },
};
