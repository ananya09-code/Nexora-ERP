"use client";


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
export type Category = {
  id: string;
  name: string;
};

async function getCategories(): Promise<Category[]> {
  const res = await fetch("/api/categories");

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
}

