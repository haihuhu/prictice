import { Inventory } from '@/db/schema';
import { week7Days } from '../../page';
import InventoryForm from './_components/inventory-form';
import QueryInput from './_components/query-input';
import { getInventories } from './queries';
import { Button } from '@/components/ui/button';
import { DeleteButton } from './_components/delete-button';
import { EditButton } from './_components/edit-button';

const InventoryPage = async () => {
  const week7day = week7Days.find((w) => w.id === 2);
  const items: Inventory[] = await getInventories();

  return (
    <>
      <h1 className="text-center text-2xl space-x-5">
        <span>week:{week7day?.week}</span>
        <span>{week7day?.label}</span>
      </h1>
      <h2 className="text-2xl text-center">Inventories</h2>
      <InventoryForm />

      <div className="flex flex-col gap-2 mt-2 border border-red-500 rounded-md p-2">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">In Stock</th>
                <th className="px-4 py-2 border">Created At</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="text-center">
                  <td className="px-2 py-1 border">{item.id}</td>
                  <td className="px-2 py-1 border">
                    {item.itemName}
                  </td>
                  <td className="px-2 py-1 border">
                    {item.category}
                  </td>
                  <td className="px-2 py-1 border">
                    {item.quantity}
                  </td>
                  <td className="px-2 py-1 border">{item.price}</td>
                  <td className="px-2 py-1 border">
                    {item.inStock ? 'Yes' : 'No'}
                  </td>
                  <td className="px-2 py-1 border">
                    {item.createdAt &&
                      new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="flex px-2 py-1 border">
                    <EditButton inventory={item} />
                    <DeleteButton id={item.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <QueryInput />
      </div>
    </>
  );
};
export default InventoryPage;
