import { products } from '@/lib/data';

const ProductIdPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  console.log(productId);

  const product = products.find((item) => item.id === productId);
  console.log(product);

  return (
    <div>
      {product && (
        <table className="w-4/5 mx-auto border-2 my-2">
          <thead>
            <tr className="border-b-2">
              <th className="text-left text-2xl text-black text-bold">Name</th>
              <th className="text-left text-2xl text-black text-bold">Price</th>
              <th className="text-left text-2xl text-black text-bold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2">
              <td className="text-left text-2xl text-black text-bold">{product?.name}</td>
              <td className="text-left text-2xl text-black text-bold">{product?.price}</td>
              <td
                className="text-left text-2xl text-black text-bold text-wrap max-w-xs overflow-hidden whitespace-nowrap text-ellipsis"
                title={product?.description}
              >
                {product?.description}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductIdPage;
