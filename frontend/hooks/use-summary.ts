
"use client";
import { useQuery } from "@tanstack/react-query"
async function getSummary() {
  try {
    const res = await fetch("/api/sales/summary")

    const data = await res.json()

    return data
  } catch (error) {
    throw new Error("failed to fetch summar")
  }
}
export function useSummary() {
  return useQuery({
    queryFn: getSummary,
    queryKey: ["summary"]
  })
}
