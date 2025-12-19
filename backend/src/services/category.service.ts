import { PrismaClient } from "@/generated/prisma/client";
import type { CategoryModel } from "@/generated/prisma/models";
import type { SafeUser } from "@/types/user.types";
const prisma = new PrismaClient();

const CategoryService = {
  getAll: async (): Promise<CategoryModel[] | undefined> => {
    const categories = await prisma.category.findMany();
    return categories;
  },

  getById: async (id: number): Promise<CategoryModel | undefined> => {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    return category ?? undefined;
  },

  create: async (
    user: SafeUser,
    params: CategoryModel
  ): Promise<CategoryModel | undefined> => {
    const userId = user.id;
    const newCategory = await prisma.category.create({
      data: {
        ...params,
        authorId: userId,
      },
    });
    return newCategory;
  },

  update: async (
    id: number,
    params: Partial<CategoryModel>
  ): Promise<CategoryModel | undefined> => {
    const updatedCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
    return updatedCategory ?? undefined;
  },

  remove: async (
    user: SafeUser,
    id: number
  ): Promise<CategoryModel | undefined> => {
    const removedCategory = await prisma.category.delete({
      where: {
        id: id,
        authorId: user.id,
      },
    });
    return removedCategory ?? undefined;
  },
};

export default CategoryService;
