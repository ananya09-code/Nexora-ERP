
"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";
export function AppPagination({ meta, selectedpage }: any) {
  const [page, setPage] = useState(1);
  const [pageNumber, setPageNumber] = useState<number[]>([1, 2, 3])
  const test = {
    page: 1,
    limit: 10,
    totalpages: 10,
    total: 100
  }
  const handlePagePrevious = () => {
    setPageNumber((prev) => {
      if (prev[0] <= 1) {
        return prev;
      }
      return prev.map((page) => page - 1);
    });
  };

  const handlePageNext = () => {
    setPageNumber((prev) => {
      if (prev[2] >= test.totalpages) {
        return prev;
      }

      return prev.map((page) => page + 1);
    });
  }; return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={(e) => { e.preventDefault(); handlePagePrevious() }} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={pageNumber[0] === page} onClick={() => { setPage(pageNumber[0]); selectedpage(pageNumber[0]) }}>{pageNumber[0]}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive={pageNumber[1] === page} onClick={() => { setPage(pageNumber[1]); selectedpage(pageNumber[1]) }}>
            {pageNumber[1]}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem >
          <PaginationLink isActive={pageNumber[2] === page} onClick={() => { setPage(pageNumber[2]); selectedpage(pageNumber[2]) }}>{pageNumber[2]}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />

        </PaginationItem>

        <PaginationItem>
          <PaginationLink onClick={() => { setPage(test.totalpages); selectedpage(test.totalpages) }}>{test.totalpages}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={(e) => { e.preventDefault(); handlePageNext() }} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )

}
