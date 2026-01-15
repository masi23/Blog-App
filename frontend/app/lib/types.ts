import type {
  UserModel,
  PostModel,
  CategoryModel,
  CommentModel,
  LikeModel,
  SavedListModel,
  TagModel,
} from "../../../backend/src/generated/prisma/models";

export type User = UserModel;
export type Post = PostModel;
export type Category = CategoryModel;
export type Comment = CommentModel;
export type Like = LikeModel;
export type SavedList = SavedListModel;
export type Tag = TagModel;

export type AggregatedTypes =
  | User
  | Post
  | Category
  | Comment
  | Like
  | SavedList
  | Tag;

export type SafeUser = Omit<User, "password">;
export type PostCreate = Pick<
  Post,
  "categoryId" | "contentBlocks" | "postStatus" | "imageUrl" | "title"
>;
export type UserCreate = Pick<
  User,
  "email" | "name" | "password" | "role" | "birthDate"
>;

export type UserStatus = {
  authenticated: boolean;
};
