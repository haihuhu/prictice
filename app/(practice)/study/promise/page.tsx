export default function NextjsCheatsheet() {
  return (
    <div className="min-h-screen bg-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold border-b-4 border-black pb-3 mb-8">
          Next.js + TypeScript 速查卡
        </h1>

        {/* Section 1 */}
        <h2 className="text-xl font-bold bg-black text-white px-3 py-2 mb-4">
          一、page.tsx 自动收到的两个 props
        </h2>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-3">
          {`// URL: /products/product-3?color=red&size=large
// params       = { productId: 'product-3' }
// searchParams = { color: 'red', size: 'large' }`}
        </pre>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="font-semibold mb-2">类型写法（Next.js 15，都是 Promise）</p>
          <pre className="bg-gray-200 border border-gray-400 rounded p-2 overflow-x-auto text-xs">
            {`const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { productId } = await params;   // must await
  const query = await searchParams;     // must await
};`}
          </pre>
        </div>

        <h3 className="text-base font-semibold border-l-4 border-red-600 pl-2 my-4">
          ⚠️ 三条铁律（必背）
        </h3>

        <div className="space-y-2 mb-6">
          <div className="bg-red-50 border-l-4 border-red-600 p-3">
            <p>
              <strong>1. Promise 必须 await</strong>
              <br />
              params / searchParams 是 Promise，不 await 直接用会报错
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-600 p-3">
            <p>
              <strong>2. async 必是 Server Component</strong>
              <br />
              async 组件默认是 Server 组件，不能加{' '}
              <code className="bg-gray-200 px-1 rounded text-xs">'use client'</code>
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-600 p-3">
            <p>
              <strong>3. Client 组件用专用 Hook</strong>
              <br />
              拿不到这两个 props，只能用{' '}
              <code className="bg-gray-200 px-1 rounded text-xs">useParams()</code> 或{' '}
              <code className="bg-gray-200 px-1 rounded text-xs">use(params)</code>
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <h2 className="text-xl font-bold bg-black text-white px-3 py-2 mb-4">
          二、TypeScript 基础速查
        </h2>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">基础类型</h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`string                    // 'hello'
number                    // 42, 3.14
boolean                   // true / false
string[]  或  Array<string>    // ['a', 'b']
number[]  或  Array<number>    // [1, 2, 3]`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          对象 / 对象数组
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`// single object
{ id: string; name: string }

// array of objects (列表数据用这个最多)
{ id: string; name: string }[]

// 用 type 命名后再加 []
type Product = { id: string; name: string; price: number };
Product[]`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">函数类型</h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`() => void                                    // no return
(value: string) => number                         // input + output
(e: React.ChangeEvent<HTMLInputElement>) => void  // controlled form`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          泛型 &lt;&gt; —— 尖括号里放「内容物」
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`Promise<string>        // await 后得到 string
useState<number>       // state 里装 number
useState<Product[]>    // state 里装 Product 数组
Array<string>          // 同 string[]`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          可选 / 联合 / 可空
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`name?: string           // optional，可以不传
string | number         // union，二选一
string | undefined      // maybe no value
string | null           // maybe null`}
        </pre>

        {/* Section 3 */}
        <h2 className="text-xl font-bold bg-black text-white px-3 py-2 mb-4">三、看符号秒判结构</h2>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="border border-gray-600 px-3 py-2 text-left">符号</th>
                <th className="border border-gray-600 px-3 py-2 text-left">含义</th>
                <th className="border border-gray-600 px-3 py-2 text-left">怎么用</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">{'{ }'}</td>
                <td className="border border-gray-400 px-3 py-2">对象</td>
                <td className="border border-gray-400 px-3 py-2">
                  点取值：<code className="bg-gray-200 px-1 rounded text-xs">obj.name</code>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">[ ]</td>
                <td className="border border-gray-400 px-3 py-2">数组</td>
                <td className="border border-gray-400 px-3 py-2">能 map / find / filter</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">[{'{ }'}]</td>
                <td className="border border-gray-400 px-3 py-2">对象数组</td>
                <td className="border border-gray-400 px-3 py-2">列表数据的标准格式</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">&lt; &gt;</td>
                <td className="border border-gray-400 px-3 py-2">泛型</td>
                <td className="border border-gray-400 px-3 py-2">里面写「装的是什么」</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">?</td>
                <td className="border border-gray-400 px-3 py-2">可选</td>
                <td className="border border-gray-400 px-3 py-2">可有可无</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">|</td>
                <td className="border border-gray-400 px-3 py-2">联合</td>
                <td className="border border-gray-400 px-3 py-2">二选一</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="font-semibold">
            口诀：拿不准就 console.log，看第一个字符是{' '}
            <code className="bg-gray-200 px-1 rounded text-xs">{`{`}</code> 就是对象，是{' '}
            <code className="bg-gray-200 px-1 rounded text-xs">[</code> 就是数组。
          </p>
        </div>

        {/* Section 4 */}
        <h2 className="text-xl font-bold bg-black text-white px-3 py-2 mb-4">
          四、多参数 URL 拼接
        </h2>

        <p className="mb-3">
          多个 query 参数用 <code className="bg-gray-200 px-1 rounded text-xs">&</code> 连接：
        </p>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`/products?category=electronics&startDate=2024-01-01&sort=price`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          方法 1：URLSearchParams（推荐原生）
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`const params = new URLSearchParams({
  category: 'electronics',
  startDate: '2024-01-01',
});

<Link href={'/products?' + params.toString()}>筛选</Link>`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          方法 2：query-string（自动去空值，推荐）
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`npm install query-string

import qs from "query-string";
import { useRouter, usePathname } from "next/navigation";

'use client';
const FilterBtn = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (category: string | null) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { category, title: "" } // 空值会被自动去掉
      },
      { skipNull: true, skipEmptyString: true }
    );
    
    // category='tech' -> /products?category=tech (干净)
    // category=null  -> /products (没有参数)
    router.push(url);
  };

  return <button onClick={() => handleFilter('tech')}>筛选</button>;
};`}
        </pre>

        {/* Section 5 */}
        <h2 className="text-xl font-bold bg-black text-white px-3 py-2 mb-4">
          五、params 终极法则（防踩坑指南）
        </h2>

        <h3 className="text-base font-semibold border-l-4 border-orange-600 pl-2 my-3">
          核心概念：Promise 是「未拆封的快递」，必须拆开才能用
        </h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-600 px-3 py-2 text-left">位置</th>
                <th className="border border-gray-600 px-3 py-2 text-left">组件类型</th>
                <th className="border border-gray-600 px-3 py-2 text-left">怎么拆包</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">page.tsx</td>
                <td className="border border-gray-400 px-3 py-2">Server</td>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">await params</code>（推荐）
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 px-3 py-2 font-mono">page.tsx</td>
                <td className="border border-gray-400 px-3 py-2">Client</td>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">use(params)</code>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2 font-mono">子组件</td>
                <td className="border border-gray-400 px-3 py-2">Server</td>
                <td className="border border-gray-400 px-3 py-2">由 page 拆完后当 props 传进来</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-400 px-3 py-2 font-mono">子组件</td>
                <td className="border border-gray-400 px-3 py-2">Client</td>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">useParams()</code>（直接用）
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          实战 A：page.tsx + Server Component（最简洁）
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`// page.tsx
export default async function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;  // ✅ 拆包
  
  return <ProductDetail productId={id} />;
}

// ProductDetail.tsx (Server Component)
export default async function ProductDetail({ 
  productId 
}: { 
  productId: string 
}) {
  const data = await fetch(\`/api/product/\${productId}\`);
  return <div>{productId}</div>;
}`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          实战 B：Client Component 深层子组件（用 useParams）
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`'use client';

import { useParams } from 'next/navigation';

export default function BuyButton() {
  const params = useParams();  // ✅ 直接用，不需要上层传
  
  return <button onClick={() => alert(params.id)}>购买 {params.id}</button>;
}`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-3">
          实战 C：page.tsx 被迫加 'use client' 时（用 use）
        </h3>
        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`'use client';

import { use } from 'react';

export default function Page({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);  // ✅ 用 use() 拆 Promise，不能用 await
  
  return <div>ID: {id}</div>;
}`}
        </pre>

        {/* Footer */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-8">
          <p className="font-semibold">
            核心原则：类型要描述「真实情况」。类型写对了，TypeScript 才能在你出错时拦住你。拿不准就
            console.log。
          </p>
        </div>
      </div>
    </div>
  );
}
