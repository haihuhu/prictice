import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import Link from 'next/link';

const ProductIdPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  const product = products.find((item) => item.id === productId);
  return (
    <div>
      <table className=" w-full table-fixed border-2">
        <thead>
          <tr className="border-b text-2xl bg-blue-300">
            <th className="w-10 text-center">Id</th>
            <th className="w-36 text-center">Title</th>
            <th className="w-16 text-center">Price</th>
            <th className="text-center">Description</th>
          </tr>
        </thead>
        <tbody>
          {product && (
            <tr className="border-b-2 text-2xl h-12 hover:text-blue-300 cursor-pointer">
              <td className="w-10 text-center border">{product.id}</td>
              <td className="w-36 text-center border">{product.title}</td>
              <td className="w-16 text-center border">${product.price}</td>
              <td className=" text-center border">{product.description}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="w-full mt-2">
        <Link href={'/practice/dynamic/products'}>
          <Button variant="default" size="lg" className="w-full">
            Back to products
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductIdPage;
