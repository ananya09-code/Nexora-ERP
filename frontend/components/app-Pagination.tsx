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
  selectedPage: (page: number) => void;
};

export function AppPagination({
  meta,
  selectedPage,
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

  return (
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
  );
}
