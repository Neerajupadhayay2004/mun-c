
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter, Plus, Edit, Eye, QrCode, Barcode as BarcodeIcon } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
  category: string;
  status: 'active' | 'inactive' | 'low-stock';
  expiry?: string;
  variants?: string[];
}

interface ProductGridProps {
  onAddProduct: () => void;
}

const ProductGrid = ({ onAddProduct }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const sampleProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Headphones Pro',
      sku: 'WH001',
      price: 99.99,
      stock: 25,
      category: 'Electronics',
      status: 'active',
      variants: ['Black', 'White', 'Blue'],
      expiry: '2025-12-31'
    },
    {
      id: '2',
      name: 'Bluetooth Speaker Mini',
      sku: 'BS002',
      price: 49.99,
      stock: 5,
      category: 'Electronics',
      status: 'low-stock',
      variants: ['Red', 'Blue']
    },
    {
      id: '3',
      name: 'Premium Phone Case',
      sku: 'PC003',
      price: 19.99,
      stock: 150,
      category: 'Accessories',
      status: 'active',
      variants: ['S', 'M', 'L']
    },
    {
      id: '4',
      name: 'USB-C Cable',
      sku: 'UC004',
      price: 12.99,
      stock: 0,
      category: 'Accessories',
      status: 'inactive'
    },
    {
      id: '5',
      name: 'Smart Watch Series X',
      sku: 'SW005',
      price: 299.99,
      stock: 35,
      category: 'Electronics',
      status: 'active',
      variants: ['42mm', '44mm', '46mm']
    },
    {
      id: '6',
      name: 'Laptop Stand Adjustable',
      sku: 'LS006',
      price: 39.99,
      stock: 20,
      category: 'Accessories',
      status: 'active'
    }
  ];

  const categories = ['all', ...Array.from(new Set(sampleProducts.map(p => p.category)))];

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product Inventory</h1>
          <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
        </div>
        <Button onClick={onAddProduct} className="bg-blue-600 hover:bg-blue-700 w-full md:w-auto">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
            <CardContent className="p-4">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-3xl md:text-4xl">📦</div>
                )}
              </div>
              
              <div className="space-y-3">
                {/* Product Info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm md:text-base leading-tight">{product.name}</h3>
                    <Badge className={`text-xs ${getStatusColor(product.status)}`}>
                      {product.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-500">
                    <p>SKU: {product.sku}</p>
                    <p>Category: {product.category}</p>
                    {product.expiry && <p>Expires: {product.expiry}</p>}
                  </div>
                </div>

                {/* Variants */}
                {product.variants && (
                  <div className="flex flex-wrap gap-1">
                    {product.variants.slice(0, 3).map((variant, index) => (
                      <Badge key={index}  variant="outline" className="text-xs">
                        {variant}
                      </Badge>
                    ))}
                    {product.variants.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.variants.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                {/* Price and Stock */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg text-gray-900">₹{product.price}</span>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      product.stock === 0 ? 'text-red-600' : 
                      product.stock < 10 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {getStockStatus(product.stock)}
                    </p>
                    <p className="text-xs text-gray-500">Stock: {product.stock}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button size="sm" variant="outline" className="text-xs">
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    <Eye size={14} className="mr-1" />
                    View
                  </Button>
                </div>

                {/* QR/Barcode */}
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="flex-1 text-xs">
                    <QrCode size={14} className="mr-1" />
                    QR
                  </Button>
                  <Button size="sm" variant="ghost" className="flex-1 text-xs">
                    <BarcodeIcon size={14} className="mr-1" />
                    Barcode
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <Button onClick={onAddProduct} className="bg-blue-600 hover:bg-blue-700">
            <Plus size={16} className="mr-2" />
            Add Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
