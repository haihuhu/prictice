import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { SupportTicketSelect } from '@/db/schema';
import { getPaginationPages } from '@/lib/utils';

interface SupportTicketTableProps {
  result: {
    supports: SupportTicketSelect[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
    pageSize: number;
  };
}

const TablePagination = ({ result }: SupportTicketTableProps) => {
  const { currentPage, totalPages, totalCount, pageSize } = result;

  const startItem = currentPage === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  // Get the array of page numbers (and ellipsis) to display in the pagination control
  const paginationPages = getPaginationPages(currentPage, totalPages);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-muted-foreground">
          Showing {startItem}-{endItem} of {totalCount}
          {' · '}
          Page {currentPage} of {totalPages}
        </p>
        <Pagination className="w-auto">
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 && <PaginationPrevious href={`/practice/week7/days/day5?page=${prevPage}`} />}
            </PaginationItem>
            {paginationPages.map((item, index) => {
              if (item === 'ellipsis') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={item}>
                  <PaginationLink href={`/practice/week7/days/day5?page=${item}`} isActive={item === currentPage}>
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              {currentPage < totalPages && <PaginationNext href={`/practice/week7/days/day5?page=${nextPage}`} />}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};
export default TablePagination;
