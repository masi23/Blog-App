import { PrismaClient } from "@/generated/prisma/client";
import type { CategoryModel } from "@/generated/prisma/models";

const prisma = new PrismaClient();

const CategoryService = {
  getAll: async (): Promise<CategoryModel[] | undefined> => {
    const categories = await prisma.category.findMany();
    return categories;
  },
  getById: async (id: number): Promise<CategoryModel | undefined> => {
    if (!id) throw new Error("Category id not provided.");
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) return undefined;
    return category;
  },
  create: async (params: CategoryModel): Promise<CategoryModel | undefined> => {
    if (!params) {
      throw new Error("Category params not provided.");
    }
    const newCategory = await prisma.category.create({
      data: {
        ...params,
      },
    });
    return newCategory;
  },
  update: async (
    id: number,
    params: Partial<CategoryModel>
  ): Promise<CategoryModel | undefined> => {
    if (!id) throw new Error("Category id not provided.");
    if (!params) throw new Error("Category params not provided.");
    const updatedCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        ...params,
      },
    });
    return updatedCategory;
  },
  remove: async (id: number): Promise<CategoryModel | undefined> => {
    if (!id) throw new Error("Category id not provided.");
    const removedCategory = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return removedCategory;
  },
};

export default CategoryService;
