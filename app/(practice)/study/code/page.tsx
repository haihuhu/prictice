'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Code snippets data structure
const codeSnippets = {
  useState: {
    title: 'useState - Cart State',
    code: `interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const addItem = (item: CartItem) => {
    setCart([...cart, item]);
  };
  
  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };
}`,
  },
  useEffect: {
    title: 'useEffect - localStorage Sync',
    code: `import { useEffect, useState } from 'react';

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);
  
  // Sync to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
}`,
  },
  addItem: {
    title: 'Add Item Logic',
    code: `const addItem = (newItem: CartItem) => {
  setCart(prev => {
    const exists = prev.find(item => item.id === newItem.id);
    
    if (exists) {
      // If item exists, increase quantity
      return prev.map(item =>
        item.id === newItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    
    // Add new item
    return [...prev, { ...newItem, quantity: 1 }];
  });
};`,
  },
  removeItem: {
    title: 'Remove Item Logic',
    code: `const removeItem = (id: string) => {
  setCart(prev => prev.filter(item => item.id !== id));
};

const decreaseQuantity = (id: string) => {
  setCart(prev =>
    prev.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  );
};`,
  },
  updateQuantity: {
    title: 'Update Quantity',
    code: `const updateQuantity = (id: string, quantity: number) => {
  if (quantity <= 0) {
    removeItem(id);
    return;
  }
  
  setCart(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity }
        : item
    )
  );
};`,
  },
};

type SnippetKey = keyof typeof codeSnippets;

export default function CodeSnippetLibrary() {
  const [activeTab, setActiveTab] = useState<SnippetKey>('useState');

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📚 Code Snippet Library</h1>
          <p className="text-gray-600">Shopping Cart · Todo · React Patterns</p>
        </div>

        {/* Main Container */}
        <div className="flex  gap-6">
          {/* Left: Tabs (Green Box) */}
          <div className="flex-1">
            <div className="bg-green-100 border-4 border-green-500 rounded-lg p-4">
              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as SnippetKey)}>
                <TabsList className="grid grid-cols-3 gap-2 bg-green-50 p-2">
                  <TabsTrigger value="useState" className="text-sm">
                    useState
                  </TabsTrigger>
                  <TabsTrigger value="useEffect" className="text-sm">
                    useEffect
                  </TabsTrigger>
                  <TabsTrigger value="addItem" className="text-sm">
                    Add Item
                  </TabsTrigger>
                  <TabsTrigger value="removeItem" className="text-sm">
                    Remove Item
                  </TabsTrigger>
                  <TabsTrigger value="updateQuantity" className="text-sm">
                    Update Qty
                  </TabsTrigger>
                </TabsList>

                {/* Content hidden, we'll show in right panel */}
              </Tabs>
            </div>
          </div>

          {/* Right: Code Display (Red Box) */}
          <div className="flex-1">
            <div className="bg-red-100 border-4 border-red-500 rounded-lg p-4">
              <div className="bg-white rounded-lg p-4 h-96 overflow-auto">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {codeSnippets[activeTab].title}
                </h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto font-mono leading-relaxed">
                  <code>{codeSnippets[activeTab].code}</code>
                </pre>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
                  Copy Code
                </button>
                <button className="flex-1 bg-amber-500 text-white py-2 rounded-lg font-semibold hover:bg-amber-600">
                  Try Practice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Red arrow pointing from left to right */}
        <div className="flex justify-center mt-6">
          <svg className="w-32 h-8" viewBox="0 0 100 20">
            <line x1="0" y1="10" x2="80" y2="10" stroke="#dc2626" strokeWidth="3" />
            <polygon points="85,10 75,5 75,15" fill="#dc2626" />
          </svg>
        </div>
      </div>
    </div>
  );
}
