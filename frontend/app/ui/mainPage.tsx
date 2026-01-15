"use client";

import { useState, useEffect } from "react";
import { PostApi } from "../lib/api/posts.api";
import type { Post } from "../lib/types";
import CategoriesMenu from "../ui/categoriesMenu";
import PostsFeed from "../ui/postsFeed";

export default function MainPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching posts for categories:", selectedCategories);
      const fetchedPosts =
        selectedCategories.length === 0
          ? await PostApi.getAll()
          : await PostApi.getByCategory(selectedCategories);
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [selectedCategories]);

  return (
    <div className="w-full sm:w-5/6 lg:w-3/5 mt-15">
      <h1 className="mt-10 mb-10 text-center">Read. Discover. Comment.</h1>
      <CategoriesMenu
        selected={selectedCategories}
        changeCategories={setSelectedCategories}
      />
      <PostsFeed posts={posts}></PostsFeed>
    </div>
  );
}
