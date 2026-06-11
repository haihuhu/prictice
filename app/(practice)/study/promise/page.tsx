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
          {`// params       -> dynamic route value (folder [xxx])
// searchParams -> query string after "?"

// URL: /products/product-3?color=red
// params       = { productId: 'product-3' }
// searchParams = { color: 'red' }`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-4">
          类型写法（Next.js 15，都是 Promise）
        </h3>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
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

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-4">三条铁律</h3>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <ol className="space-y-2 list-decimal list-inside">
            <li>
              params / searchParams 是 <strong>Promise</strong> → 必须{' '}
              <code className="bg-gray-200 px-1 rounded text-xs">await</code>
            </li>
            <li>
              async 组件 = <strong>Server Component</strong> → 不能加{' '}
              <code className="bg-gray-200 px-1 rounded text-xs">'use client'</code>
            </li>
            <li>
              客户端组件拿不到这俩 props → 只能用{' '}
              <code className="bg-gray-200 px-1 rounded text-xs">useParams()</code> hook（要{' '}
              <code className="bg-gray-200 px-1 rounded text-xs">'use client'</code>）
            </li>
          </ol>
        </div>

        {/* Section 2 */}
        <h2 className="text-xl font-bold bg-black text-white px-3 py-2 mb-4">
          二、TypeScript 常用类型
        </h2>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-4">基础类型</h3>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`string          // text        'hello'
number          // number      42, 3.14
boolean         // true/false  true / false
string[]        // string array  ['a', 'b']
number[]        // number array  [1, 2, 3]`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-4">
          对象 / 对象数组
        </h3>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`// one object
{ id: string; name: string }

// array of objects (most common, list data)
{ id: string; name: string }[]

// or name it with type, then add []
type Product = { id: string; name: string };
Product[]`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-4">函数类型</h3>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`() => void                    // no return
(value: string) => number     // take string, return number

// event callback (controlled form)
(e: React.ChangeEvent<HTMLInputElement>) => void`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-4">
          泛型 &lt;&gt; —— 尖括号里是「内容物」
        </h3>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`Promise<string>        // await -> string
useState<number>       // state holds number
useState<Product[]>    // state holds array of objects
Array<string>          // same as string[]`}
        </pre>

        <h3 className="text-base font-semibold border-l-4 border-black pl-2 my-4">
          可选 / 联合 / 可空
        </h3>

        <pre className="bg-gray-100 border border-gray-300 rounded p-3 overflow-x-auto text-xs mb-4">
          {`name?: string         // optional
string | number       // union, pick one
string | undefined    // maybe no value
string | null         // maybe null`}
        </pre>

        {/* Section 3 */}
        <h2 className="text-xl font-bold bg-black text-white px-3 py-2 mb-4">
          三、看符号秒判断结构
        </h2>

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
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">{'{ }'}</code>
                </td>
                <td className="border border-gray-400 px-3 py-2">对象 object</td>
                <td className="border border-gray-400 px-3 py-2">
                  点取值 <code className="bg-gray-200 px-1 rounded text-xs">obj.name</code>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">[ ]</code>
                </td>
                <td className="border border-gray-400 px-3 py-2">数组 array</td>
                <td className="border border-gray-400 px-3 py-2">能 map / find / filter</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">[ {'{ }'} ]</code>
                </td>
                <td className="border border-gray-400 px-3 py-2">对象数组</td>
                <td className="border border-gray-400 px-3 py-2">列表数据都是这个</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">&lt; &gt;</code>
                </td>
                <td className="border border-gray-400 px-3 py-2">泛型 generic</td>
                <td className="border border-gray-400 px-3 py-2">里面写「装的是什么」</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">?</code>
                </td>
                <td className="border border-gray-400 px-3 py-2">可选 optional</td>
                <td className="border border-gray-400 px-3 py-2">可有可无</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-3 py-2">
                  <code className="bg-gray-200 px-1 rounded text-xs">|</code>
                </td>
                <td className="border border-gray-400 px-3 py-2">联合 union</td>
                <td className="border border-gray-400 px-3 py-2">二选一</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="font-semibold">
            口诀：开头是 {'{ }'} 就是对象，开头是 [ ] 就是数组。拿不准就 console.log 看第一个字符。
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <p className="font-semibold">
            核心原则：类型要描述「真实情况」，不是描述「能不能跑通」。类型写对了，TS
            才能在你出错时拦住你。
          </p>
        </div>
      </div>
    </div>
  );
}
