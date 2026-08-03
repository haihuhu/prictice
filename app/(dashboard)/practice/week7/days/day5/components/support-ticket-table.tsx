import { SupportTicketSelect } from '@/db/schema';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import TableActions from './table-actions';
import TablePagination from './table-pagination';

interface SupportTicketTableProps {
  result: {
    supports: SupportTicketSelect[];
    totalPages: number;
    currentPage: number;
    totalCount: number;
    pageSize: number;
  };
}

const SupportTicketTable = ({ result }: SupportTicketTableProps) => {
  const { supports, currentPage, totalPages, totalCount, pageSize } = result;

  return (
    <>
      <Table className="w-full">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Customer Email</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supports.map((support) => (
            <TableRow key={support.id}>
              <TableCell>{support.id}</TableCell>
              <TableCell>{support.title}</TableCell>
              <TableCell>{support.customerEmail}</TableCell>
              <TableCell>{support.priority}</TableCell>
              <TableCell>{support.dueDate?.toLocaleDateString()}</TableCell>
              <TableCell>{support.isResolved ? 'Resolved' : 'Pending'}</TableCell>
              <TableCell>{support.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{support.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>
                <TableActions supportTicket={support} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={10}>
              <TablePagination result={result} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
export default SupportTicketTable;
