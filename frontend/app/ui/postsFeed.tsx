import PostCard from "./postCard";
import type { Post } from "../lib/types";

export default function PostsFeed({ posts }: { posts: Post[] }) {
  if (posts.length === 0)
    return (
      <p className="mt-15 text-xl text-center text-neutral-400">
        No posts were found.
      </p>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-5">
      {posts.map((post) => (
        <PostCard
          thumbnailUrl={post.imageUrl || ""}
          title={post.title}
          description={post.description}
          id={post.id}
          createdAt={post.createdAt}
          key={post.id}
        ></PostCard>
      ))}
    </div>
  );
}
