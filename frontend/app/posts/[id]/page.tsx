"use client";

import { useState, useEffect, use } from "react";
import type { Post } from "@/app/lib/types";
import { PostApi } from "@/app/lib/api/posts.api";
import Image from "next/image";
import ContentBlock from "@/app/ui/contentBlock";

export default function Page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<Post>();
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    const fetchPost = async (id: number) => {
      const post = await PostApi.getById(id);
      setPost(post);

      //   console.log(post);
      if (post) {
        if (Array.isArray(post.contentBlocks)) {
          setBlocks(post.contentBlocks);
        } else {
          setBlocks([]);
          console.log("blocks empty");
        }
      }
    };
    fetchPost(id);
  }, []);

  if (!post) return <p>Sorry. Couldn't load this post...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p className="mt-10">{post.description}</p>
      {blocks.map((block, i) => (
        <ContentBlock
          key={i}
          type={block.type}
          level={block.level}
          text={block.text}
        ></ContentBlock>
        // <pre key={i}>{JSON.stringify(block, null, 2)}</pre>
      ))}
    </div>
  );
}
