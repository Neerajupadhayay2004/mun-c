
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
  category: string;
  status: 'active' | 'inactive';
}

const ProductGrid = () => {
  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones',
      sku: 'WH001',
      price: 99.99,
      stock: 25,
      category: 'Electronics',
      status: 'active'
    },
    {
      id: '2',
      name: 'Bluetooth Speaker',
      sku: 'BS002',
      price: 79.99,
      stock: 15,
      category: 'Electronics',
      status: 'active'
    },
    {
      id: '3',
      name: 'Phone Case',
      sku: 'PC003',
      price: 19.99,
      stock: 50,
      category: 'Accessories',
      status: 'active'
    },
    {
      id: '4',
      name: 'USB Cable',
      sku: 'UC004',
      price: 12.99,
      stock: 100,
      category: 'Accessories',
      status: 'active'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {sampleProducts.map((product) => (
        <Card key={product.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-gray-400 text-4xl">📦</div>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{product.name}</h3>
                <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                  {product.status}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-500">SKU: {product.sku}</p>
              <p className="text-xs text-gray-500">Category: {product.category}</p>
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">${product.price}</span>
                <span className="text-sm text-gray-500">Stock: {product.stock}</span>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
