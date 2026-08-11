
"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { X } from "lucide-react";
import { useProducts } from "@/hooks/use-products";
import { useSuppliers } from "@/hooks/use-supplier";
import { useCategories } from "@/hooks/use-categories";
import { useCustomers } from "@/hooks/use-customer";

import { filters } from "@/lib/filter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type FilterOption = {
  label: string;
  value: string;
};

type Filter = {
  key: string;
  label: string;
  type: string;
  options?: FilterOption[];
  dynamic?: boolean;
};

type FilterValues = Record<string, string>;

type AddFilterProps = {
  pagetype: keyof typeof filters;
  onApply?: (values: FilterValues) => void;
};

export function AddFilter({
  pagetype,
  onApply,
}: AddFilterProps) {
  const [filterValues, setFilterValues] =
    useState<FilterValues>({});
  const [open, setOpen] = useState(false);
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();
  const { data: customers = [] } = useCustomers();

  const productOptions: FilterOption[] = products.map(
    (product: any) => ({
      label: product.name,
      value: product.id,
    })
  );

  const categoryOptions: FilterOption[] = categories.map(
    (category) => ({
      label: category.name,
      value: category.id,
    })
  );

  const supplierOptions: FilterOption[] = suppliers.map(
    (supplier: any) => ({
      label: supplier.name,
      value: supplier.id,
    })
  );

  const customerOptions: FilterOption[] = customers.map(
    (customer: any) => ({
      label: `${customer.firstName} ${customer.lastName}`,
      value: customer.id,
    })
  );

  const data = filters[pagetype] ?? [];

  const handleChange = (
    key: string,
    value: string
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getOptions = (
    filter: string
  ) => {
    if (filter === "productId") {
      return productOptions;
    }

    if (filter === "categoryId") {
      return categoryOptions;
    }

    if (filter === "supplierId") {
      return supplierOptions;
    }

    if (filter === "customerId") {
      return customerOptions;
    }

    return [];
  };

  const handleClear = () => {
    setFilterValues({});
    onApply?.({});
    setOpen(false);
  };

  const handleApply = () => {
    onApply?.(filterValues);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline">
            <SlidersHorizontal />
            Filter
          </Button>
        }
      />


      <PopoverContent className="w-80">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Filter your {pagetype}.
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </div>
        <div className="grid gap-3">

          {data.map((filter) => {
            const options = getOptions(filter.key);

            return (
              <div
                key={filter.key}
                className="grid gap-2"
              >
                <Label htmlFor={filter.key}>
                  {filter.label}
                </Label>

                {filter.type === "select" && (
                  <select
                    id={filter.key}
                    value={
                      filterValues[filter.key] ?? ""
                    }
                    onChange={(e) =>
                      handleChange(
                        filter.key,
                        e.target.value
                      )
                    }
                    className="h-9 rounded-md border bg-background px-3 text-sm"
                  >
                    <option value="">
                      Select {filter.label}
                    </option>

                    {options.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                {filter.type === "text" && (
                  <Input
                    id={filter.key}
                    type="text"
                    value={
                      filterValues[filter.key] ?? ""
                    }
                    placeholder={`Enter ${filter.label}`}
                    onChange={(e) =>
                      handleChange(
                        filter.key,
                        e.target.value
                      )
                    }
                  />
                )}

                {filter.type === "number" && (
                  <Input
                    id={filter.key}
                    type="number"
                    value={
                      filterValues[filter.key] ?? ""
                    }
                    placeholder={`Enter ${filter.label}`}
                    onChange={(e) =>
                      handleChange(
                        filter.key, e.target.value
                      )
                    }
                  />
                )}

                {filter.type === "date" && (
                  <Input
                    id={filter.key}
                    type="date"
                    value={
                      filterValues[filter.key] ?? ""
                    }
                    onChange={(e) =>
                      handleChange(
                        filter.key,
                        e.target.value
                      )
                    }
                  />
                )}
              </div>
            );
          })}

        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            onClick={handleClear}
          >
            Clear
          </Button>

          <Button onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

type SearchBarProps = {
  onSearch?: (value: string) => void;
};

export function SearchBar({
  onSearch,
}: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch?.(search);
  };

  return (
    <div className="flex gap-2">
      <Input
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      <Button onClick={handleSearch}>
        <Search />
        Search
      </Button>
    </div>
  );
}

type FilterCardProps = {
  pagetype: keyof typeof filters;
  onApply: (values: FilterValues) => void;
};

export function FilterCard({
  pagetype,
  onApply,
}: FilterCardProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <SearchBar
        onSearch={(value) =>
          onApply({
            search: value,
          })
        }
      />

      <AddFilter
        pagetype={pagetype}
        onApply={onApply}
      />
    </div>
  );
}
