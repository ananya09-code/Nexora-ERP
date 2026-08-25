"use client";

import { useCategories } from "@/hooks/use-categories";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { AppAction } from "@/components/app-Action";
import AddCategory from "./add-category";
import { FolderTree, Layers } from "lucide-react";

export function CategoryTable() {
  const { data: categories = [], isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
        <Skeleton className="h-14 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-sm text-destructive border rounded-xl bg-destructive/5">
        Failed to load categories. Please try again.
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white shadow-xs overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/75">
          <TableRow>
            <TableHead className="font-semibold text-slate-700">Category Name</TableHead>
            <TableHead className="font-semibold text-slate-700">Description</TableHead>
            <TableHead className="font-semibold text-slate-700">Status</TableHead>
            <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center text-slate-400">
                <Layers className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                No categories found. Click &quot;Add Category&quot; to create one.
              </TableCell>
            </TableRow>
          ) : (
            categories.map((cat: any) => (
              <TableRow key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-semibold text-slate-900 flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FolderTree className="h-4 w-4" />
                  </div>
                  {cat.name}
                </TableCell>
                <TableCell className="text-slate-600 max-w-md truncate">
                  {cat.description || <span className="text-slate-400 italic">No description</span>}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      cat.isActive !== false
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium"
                        : "border-slate-200 bg-slate-100 text-slate-500 text-xs font-medium"
                    }
                  >
                    {cat.isActive !== false ? "Active" : "Archived"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <AppAction data={cat} settype="category" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableFooter className="bg-slate-50/50">
          <TableRow>
            <TableCell colSpan={3} className="text-xs font-medium text-slate-500">
              Total Active Categories
            </TableCell>
            <TableCell className="text-right text-xs font-bold text-slate-900">
              {categories.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}

export function CategoryUi() {
  return (
    <div className="w-full space-y-6">
      <CategoryTable />
    </div>
  );
}
