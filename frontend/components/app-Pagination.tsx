"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationMeta = {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
};

type AppPaginationProps = {
  meta: PaginationMeta;

  setLimit: (limit: number) => void;
  selectedPage: (page: number) => void;
};

export function AppPagination({
  meta,
  selectedPage,
  setLimit
}: AppPaginationProps) {
  const { page, totalPages } = meta;

  const pageNumbers = [
    page,
    page + 1,
    page + 2,
  ].filter((pageNumber) => pageNumber <= totalPages);

  const handlePrevious = () => {
    if (page <= 1) return;

    selectedPage(page - 1);
  };

  const handleNext = () => {
    if (page >= totalPages) return;

    selectedPage(page + 1);
  };
  const startItem = (meta.page - 1) * meta.limit + 1;
  const endItem = Math.min(meta.page * meta.limit, meta.total);

  const limitOptions = Array.from(
    { length: Math.ceil(meta.total / meta.limit) },
    (_, i) => (i + 1) * meta.limit
  );
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <select
          value={meta.limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            // setLimit(Number(e.target.value));
          }}
          className="h-8 rounded-md border bg-background px-2 text-sm"
        >
          {limitOptions.map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>

        <span>
          {startItem}-{endItem} of {meta.totalPages}
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  handlePrevious();
                }}
              />
            </PaginationItem>

            {pageNumbers.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={pageNumber === page}
                  onClick={() => selectedPage(pageNumber)}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}

            {page + 2 < totalPages && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {page + 2 < totalPages && (
              <PaginationItem>
                <PaginationLink
                  isActive={page === totalPages}
                  onClick={() => selectedPage(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
