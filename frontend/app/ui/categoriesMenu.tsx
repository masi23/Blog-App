"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CategoryApi } from "../lib/api/categories.api";
import type { Category } from "../lib/types";

type Props = {
  selected: number[];
  changeCategories: (categories: number[]) => void;
};

export default function CategoriesMenu({ selected, changeCategories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await CategoryApi.getAll();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  const toggleCategory = (id: number) => {
    const next = selected.includes(id)
      ? selected.filter((c) => c !== id)
      : [...selected, id];

    changeCategories(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next.length === 0) {
      params.delete("categories");
    } else {
      params.set("categories", next.join(","));
    }

    router.replace(`/posts?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => toggleCategory(category.id)}
          className={`px-5 py-2.5 rounded-4xl text-white bg-blue-700 border-2 
            ${
              selected.includes(category.id)
                ? "border-blue-400 "
                : "border-blue-700"
            }`}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
}
