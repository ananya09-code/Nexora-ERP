import AddCategory from "@/components/category-ui/add-category";
import { CategoryUi } from "@/components/category-ui/category-table";

export default function AdminCategoriesPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Category Administration
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage product taxonomy and category groups.
          </p>
        </div>

        <AddCategory />
      </div>

      <CategoryUi />
    </div>
  );
}