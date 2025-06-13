
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, Plus, X, Wand2, QrCode, Barcode as BarcodeIcon } from 'lucide-react';

interface AddProductFormProps {
  onBack: () => void;
}

const AddProductForm = ({ onBack }: AddProductFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [productData, setProductData] = useState({
    name: '',
    sku: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    images: [] as string[],
    variants: [] as any[],
    tags: [] as string[]
  });

  const [variants, setVariants] = useState([
    { type: 'Size', options: ['S', 'M', 'L', 'XL'] },
    { type: 'Color', options: ['Red', 'Blue', 'Green'] },
    { type: 'Material', options: ['Cotton', 'Polyester'] }
  ]);

  const [newTag, setNewTag] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProductData(prev => ({
            ...prev,
            images: [...prev.images, e.target?.result as string]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const generateAIKeywords = () => {
    const keywords = ['trending', 'popular', 'best-seller', 'premium', 'eco-friendly'];
    setAiKeywords(keywords.join(', '));
    setProductData(prev => ({
      ...prev,
      tags: [...prev.tags, ...keywords]
    }));
  };

  const addTag = () => {
    if (newTag && !productData.tags.includes(newTag)) {
      setProductData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const generateBarcode = () => {
    const barcode = Math.random().toString().substr(2, 12);
    setProductData(prev => ({ ...prev, sku: barcode }));
  };

  const generateQRCode = () => {
    const qrData = `${productData.name}-${Date.now()}`;
    console.log('QR Code generated for:', qrData);
  };

  const steps = [
    { title: 'Basic Info', number: 1 },
    { title: 'Media & Description', number: 2 },
    { title: 'Variants & Pricing', number: 3 },
    { title: 'Advanced Settings', number: 4 }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={productData.name}
                  onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={productData.category}
                  onChange={(e) => setProductData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Enter category"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sku">SKU</Label>
                <div className="flex gap-2">
                  <Input
                    id="sku"
                    value={productData.sku}
                    onChange={(e) => setProductData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="Enter SKU"
                  />
                  <Button type="button" variant="outline" onClick={generateBarcode}>
                    <BarcodeIcon size={16} />
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={productData.price}
                  onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="stock">Initial Stock</Label>
              <Input
                id="stock"
                type="number"
                value={productData.stock}
                onChange={(e) => setProductData(prev => ({ ...prev, stock: e.target.value }))}
                placeholder="Enter stock quantity"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label>Product Images</Label>
              <div className="mt-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <Upload size={24} className="text-gray-400" />
                  <span className="mt-2 text-sm text-gray-500">Click to upload images</span>
                </label>
              </div>
              
              {productData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {productData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Product ${index + 1}`} className="w-full h-24 object-cover rounded" />
                      <button
                        onClick={() => setProductData(prev => ({
                          ...prev,
                          images: prev.images.filter((_, i) => i !== index)
                        }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={productData.description}
                onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Keywords & Tags</Label>
                <Button type="button" variant="outline" size="sm" onClick={generateAIKeywords}>
                  <Wand2 size={16} className="mr-2" />
                  AI Keywords
                </Button>
              </div>
              
              <div className="flex gap-2 mb-3">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <Button type="button" onClick={addTag}>
                  <Plus size={16} />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {productData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} <X size={12} className="ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Product Variants</h3>
            {variants.map((variant, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm">{variant.type}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option, optIndex) => (
                      <Badge key={optIndex} variant="outline">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="date"
                  placeholder="Select expiry date"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.01"
                  placeholder="Enter weight"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Advanced Settings</h3>
              <div className="flex items-center space-x-2">
                <Label htmlFor="advanced-toggle">Enable Advanced Options</Label>
                <Switch
                  id="advanced-toggle"
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                />
              </div>
            </div>

            {showAdvanced && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="min-stock">Minimum Stock Alert</Label>
                    <Input
                      id="min-stock"
                      type="number"
                      placeholder="Enter minimum stock level"
                    />
                  </div>
                  <div>
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      placeholder="Enter supplier name"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={generateQRCode}>
                    <QrCode size={16} className="mr-2" />
                    Generate QR Code
                  </Button>
                  <Button type="button" variant="outline" onClick={generateBarcode}>
                    <BarcodeIcon size={16} className="mr-2" />
                    Generate Barcode
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Add New Product</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.number <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step.number}
              </div>
              <span className="ml-2 text-sm font-medium hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardContent className="p-6">
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < steps.length ? (
          <Button
            type="button"
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          >
            Next
          </Button>
        ) : (
          <Button type="submit" className="bg-green-600 hover:bg-green-700">
            Save Product
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddProductForm;
