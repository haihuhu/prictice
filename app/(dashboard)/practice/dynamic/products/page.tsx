import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import Link from 'next/link';

const ProductsPage = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className=" w-full table-fixed   border-2">
        <thead>
          <tr className="border-b text-2xl bg-blue-300">
            <th className="w-10 text-center">Id</th>
            <th className="w-36 text-center">Title</th>
            <th className="w-16 text-center">Price</th>
            <th className="text-center">Description</th>
            <th className="md:w-36 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item.id} className="border-b-2 text-2xl hover:text-blue-300 cursor-pointer">
                <td className="w-10 py-2 text-center border">{item.id}</td>
                <td className="w-36 text-center border">{item.title}</td>
                <td className="w-16 text-center border">${item.price}</td>
                <td className=" text-center border">{item.description}</td>
                <td className="md:w-36 text-center">
                  <Link href={`/practice/dynamic/products/${item.id}`}>
                    <Button variant="outline">View details</Button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
