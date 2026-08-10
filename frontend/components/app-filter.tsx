
"use client";

import { useState } from "react";

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

import { SlidersHorizontal } from "lucide-react";

type Filter = {
  key: string;
  label: string;
  type: string;
  options?: string[];
};

type AddFilterProps = {
  pagetype: keyof typeof filters;
  onApply?: (values: Record<string, string>) => void;
};

export function AddFilter({
  pagetype,
  onApply,
}: AddFilterProps) {
  const [filterValues, setFilterValues] =
    useState<Record<string, string>>({});

  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const { data: suppliers = [] } = useSuppliers();
  const { data: customers = [] } = useCustomers();

  const productOptions = products.map(
    (product: any) => product.name
  );

  const categoryOptions = categories.map(
    (category) => category.name
  );

  const supplierOptions = suppliers.map(
    (supplier) => supplier.name
  );

  const customerOptions = customers.map(
    (customer) =>
      `${customer.firstName} ${customer.lastName}`
  );

  const data: Filter[] = filters[pagetype] ?? [];

  const handleChange = (
    key: string,
    value: string
  ) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setFilterValues({});
    onApply?.({});
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline">
            <SlidersHorizontal />
            Filter
          </Button>
        }
      />

      <PopoverContent className="w-80">
        <div className="grid gap-4">

          <div>
            <h4 className="font-medium">
              Filters
            </h4>

            <p className="text-sm text-muted-foreground">
              Filter your {pagetype}.
            </p>
          </div>

          <div className="grid gap-3">

            {data.map((filter) => {
              let options =
                filter.options ?? [];

              if (filter.key === "product") {
                options = productOptions;
              }

              if (filter.key === "category") {
                options = categoryOptions;
              }

              if (filter.key === "supplierId") {
                options = supplierOptions;
              }

              if (filter.key === "customerId") {
                options = customerOptions;
              }

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
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      ))}
                    </select>
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

                  {filter.type === "number" && (
                    <Input
                      id={filter.key}
                      type="number"
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

                  {filter.type === "text" && (
                    <Input
                      id={filter.key}
                      type="text"
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

            <Button
              onClick={() =>
                onApply?.(filterValues)
              }
            >
              Apply
            </Button>

          </div>

        </div>
      </PopoverContent>
    </Popover>
  );
}

export function FilterCard({
  pagetype,
  onApply,
}: {
  pagetype: keyof typeof filters;
  onApply: (values: Record<string, string>) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <AddFilter
        pagetype={pagetype}
        onApply={onApply}
      />
    </div>
  );
}
