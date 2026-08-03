import { week7Days } from '../../page';
import SupportTicketForm from './components/support-ticket-from';
import SupportTicketTable from './components/support-ticket-table';
import { getAllSupportTickets, getSupportTicketsByPage } from './queries';

const SupportTicketPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {
  const day = week7Days.find((day) => day.id === 5);

  // const supports = await getAllSupportTickets();

  const { page } = await searchParams;

  const result = await getSupportTicketsByPage(page);

  return (
    <>
      <div className="flex flex-col gap-2 mb-2">
        <div className="flex flex-col text-center gap-2">
          <p className="text-2xl font-bold ">Week {day?.week}</p>
          <p className="text-xl ">{day?.label}</p>
        </div>
      </div>
      <div>
        <h1 className="text-2xl">Support ticket</h1>
        <h2 className="text-sm text-gray-500">Support Ticket CRUD Project</h2>
      </div>
      <SupportTicketForm />

      <SupportTicketTable result={result} />
    </>
  );
};
export default SupportTicketPage;
