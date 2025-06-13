
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Upload, Wand2, QrCode, Barcode as BarcodeIcon, X, Plus } from 'lucide-react';

interface AddProductFormProps {
  onBack: () => void;
}

const AddProductForm = ({ onBack }: AddProductFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  
  const [formData, setFormData] = useState({
    // General Information
    itemType: 'goods',
    productName: '',
    sku: '',
    barcode: '',
    ean: '',
    category: '',
    subCategory: '',
    brandManufacturer: '',
    productType: 'simple',
    selectSupplier: '',
    supplierSku: '',
    warehouseLocation: '',
    leadTime: '',
    reorderLevel: '',
    initialStockQuantity: '',
    track: 'serialNo',
    status: 'returnable',
    
    // Pricing & Tax
    purchasePrice: '',
    sellingPrice: '',
    wholesalePrice: '',
    quantity: '',
    unit: '',
    discountPrice: '',
    discountPeriodFrom: '',
    discountPeriodTo: '',
    taxRate: '',
    hsnSac: '',
    priceIncludeGst: false,
    gstRate: '',
    
    // Description & Media
    description: '',
    seoMetaTitle: '',
    seoMetaDescription: '',
    
    // Variants
    selectedVariants: []
  });

  const steps = [
    { id: 1, title: 'General Information', subtitle: 'Basic Info + Category + Supplier + Inventory + Product Type' },
    { id: 2, title: 'Pricing & Tax', subtitle: 'All price and tax-related' },
    { id: 3, title: 'Description & Media', subtitle: 'Images + Description + Documents + SEO' },
    { id: 4, title: 'Variants', subtitle: 'Product Type and Variants' }
  ];

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];
  const subCategories = ['Mobile Phones', 'Laptops', 'Cameras', 'Headphones', 'Accessories'];
  const brands = ['Apple', 'Samsung', 'Sony', 'Nike', 'Adidas', 'Canon'];
  const suppliers = ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D'];
  const warehouses = ['Warehouse 1', 'Warehouse 2', 'Warehouse 3'];
  const units = ['Piece', 'Kg', 'Meter', 'Liter', 'Box'];
  const hsnCodes = ['HSN001', 'HSN002', 'HSN003', 'HSN004'];

  const variantTypes = [
    { id: 'color', name: 'Color' },
    { id: 'size', name: 'Size' },
    { id: 'expiry', name: 'Expiry' },
    { id: 'material', name: 'Material' },
    { id: 'model', name: 'Model' },
    { id: 'weight', name: 'Weight' },
    { id: 'skinType', name: 'Skin type' },
    { id: 'packagingType', name: 'Packaging type' },
    { id: 'flavour', name: 'Flavour' },
    { id: 'gender', name: 'Gender' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBarcode = () => {
    const barcode = Math.random().toString().substr(2, 12);
    handleInputChange('barcode', barcode);
  };

  const generateEAN = () => {
    const ean = Math.random().toString().substr(2, 13);
    handleInputChange('ean', ean);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateAIKeywords = () => {
    const aiKeywords = ['Fittings', 'Hinges', 'Construction hardware materials', 'Door and Windows', 'Building'];
    setKeywords(prev => [...prev, ...aiKeywords]);
  };

  const addKeyword = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newKeyword.trim()) {
      setKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(prev => prev.filter((_, i) => i !== index));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Item Type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Item Type</Label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="goods"
                    name="itemType"
                    value="goods"
                    checked={formData.itemType === 'goods'}
                    onChange={(e) => handleInputChange('itemType', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="goods">Goods</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="services"
                    name="itemType"
                    value="services"
                    checked={formData.itemType === 'services'}
                    onChange={(e) => handleInputChange('itemType', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="services">Services</Label>
                </div>
              </div>
            </div>

            {/* Product Name & SKU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  placeholder="Enter New Product Name"
                />
              </div>
              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  placeholder="Enter SKU"
                />
              </div>
            </div>

            {/* Barcode & EAN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <div className="flex gap-2">
                  <Input
                    id="barcode"
                    value={formData.barcode}
                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                    placeholder="Enter Or Scan Code"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={generateBarcode}>
                    <BarcodeIcon className="w-4 h-4" />
                  </Button>
                  <Button type="button" variant="link" size="sm" className="text-blue-600">
                    Generate Barcode
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="ean">EAN</Label>
                <div className="flex gap-2">
                  <Input
                    id="ean"
                    value={formData.ean}
                    onChange={(e) => handleInputChange('ean', e.target.value)}
                    placeholder="Enter Or Scan Code"
                  />
                  <Button type="button" variant="outline" size="sm" onClick={generateEAN}>
                    <BarcodeIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Category & Sub-Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subCategory">Sub-Category</Label>
                <Select value={formData.subCategory} onValueChange={(value) => handleInputChange('subCategory', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {subCategories.map(subCat => (
                      <SelectItem key={subCat} value={subCat}>{subCat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Brand/Manufacturer */}
            <div>
              <Label htmlFor="brandManufacturer">Brand/Manufacturer</Label>
              <Select value={formData.brandManufacturer} onValueChange={(value) => handleInputChange('brandManufacturer', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Type */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Product Type</Label>
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="simple"
                    name="productType"
                    value="simple"
                    checked={formData.productType === 'simple'}
                    onChange={(e) => handleInputChange('productType', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="simple">Simple</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="variant"
                    name="productType"
                    value="variant"
                    checked={formData.productType === 'variant'}
                    onChange={(e) => handleInputChange('productType', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="variant">Variant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="bundle"
                    name="productType"
                    value="bundle"
                    checked={formData.productType === 'bundle'}
                    onChange={(e) => handleInputChange('productType', e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Label htmlFor="bundle">Bundle</Label>
                </div>
              </div>
            </div>

            {/* Select Supplier & Supplier SKU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="selectSupplier">Select Supplier</Label>
                <Select value={formData.selectSupplier} onValueChange={(value) => handleInputChange('selectSupplier', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="supplierSku">Supplier SKU</Label>
                <Select value={formData.supplierSku} onValueChange={(value) => handleInputChange('supplierSku', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Warehouse/Location */}
            <div>
              <Label htmlFor="warehouseLocation">Warehouse/Location</Label>
              <Select value={formData.warehouseLocation} onValueChange={(value) => handleInputChange('warehouseLocation', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map(warehouse => (
                    <SelectItem key={warehouse} value={warehouse}>{warehouse}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Section */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium">Advance</Label>
                <Switch
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
                />
              </div>

              {showAdvanced && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="leadTime">Lead Time</Label>
                      <Select value={formData.leadTime} onValueChange={(value) => handleInputChange('leadTime', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-weeks">2 Weeks</SelectItem>
                          <SelectItem value="1-month">1 Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="reorderLevel">Reorder Level</Label>
                      <Select value={formData.reorderLevel} onValueChange={(value) => handleInputChange('reorderLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="initialStockQuantity">Initial Stock Quantity</Label>
                      <Input
                        id="initialStockQuantity"
                        value={formData.initialStockQuantity}
                        onChange={(e) => handleInputChange('initialStockQuantity', e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Track</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="serialNo"
                            name="track"
                            value="serialNo"
                            checked={formData.track === 'serialNo'}
                            onChange={(e) => handleInputChange('track', e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <Label htmlFor="serialNo">Serial No.</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="batchNo"
                            name="track"
                            value="batchNo"
                            checked={formData.track === 'batchNo'}
                            onChange={(e) => handleInputChange('track', e.target.value)}
                            className="w-4 h-4 text-blue-600"
                          />
                          <Label htmlFor="batchNo">Batch No.</Label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium mb-2 block">Status</Label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="returnable"
                          name="status"
                          value="returnable"
                          checked={formData.status === 'returnable'}
                          onChange={(e) => handleInputChange('status', e.target.value)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <Label htmlFor="returnable">Returnable</Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Purchase Price & Selling Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                  placeholder="Enter New Product Name"
                />
              </div>
              <div>
                <Label htmlFor="sellingPrice">Selling Price</Label>
                <Input
                  id="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                  placeholder="Enter SKU"
                />
              </div>
            </div>

            {/* Wholesale Price / Bulk Price */}
            <div>
              <Label htmlFor="wholesalePrice">Wholesale Price / Bulk Price</Label>
              <Select value={formData.wholesalePrice} onValueChange={(value) => handleInputChange('wholesalePrice', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bulk1">Bulk Option 1</SelectItem>
                  <SelectItem value="bulk2">Bulk Option 2</SelectItem>
                  <SelectItem value="bulk3">Bulk Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity & Unit */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  placeholder="In No."
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map(unit => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Discount Price & Discount Period */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="discountPrice">Discount Price</Label>
                <Select value={formData.discountPrice} onValueChange={(value) => handleInputChange('discountPrice', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="10">10%</SelectItem>
                    <SelectItem value="15">15%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="discountPeriodFrom">Discount Period</Label>
                <Input
                  id="discountPeriodFrom"
                  type="date"
                  value={formData.discountPeriodFrom}
                  onChange={(e) => handleInputChange('discountPeriodFrom', e.target.value)}
                  placeholder="From"
                />
              </div>
              <div>
                <Label htmlFor="discountPeriodTo" className="invisible">To</Label>
                <Input
                  id="discountPeriodTo"
                  type="date"
                  value={formData.discountPeriodTo}
                  onChange={(e) => handleInputChange('discountPeriodTo', e.target.value)}
                  placeholder="To"
                />
              </div>
            </div>

            {/* Tax Rate */}
            <div>
              <Label htmlFor="taxRate">Tax Rate</Label>
              <Select value={formData.taxRate} onValueChange={(value) => handleInputChange('taxRate', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5%</SelectItem>
                  <SelectItem value="12">12%</SelectItem>
                  <SelectItem value="18">18%</SelectItem>
                  <SelectItem value="28">28%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* HSN / SAC */}
            <div>
              <Label htmlFor="hsnSac">HSN / SAC</Label>
              <Select value={formData.hsnSac} onValueChange={(value) => handleInputChange('hsnSac', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="HSN Code" />
                </SelectTrigger>
                <SelectContent>
                  {hsnCodes.map(code => (
                    <SelectItem key={code} value={code}>{code}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Include GST */}
            <div className="flex items-center justify-between">
              <Label htmlFor="priceIncludeGst">Price Include GST</Label>
              <Switch
                id="priceIncludeGst"
                checked={formData.priceIncludeGst}
                onCheckedChange={(checked) => handleInputChange('priceIncludeGst', checked)}
              />
            </div>

            {/* GST Rate */}
            {formData.priceIncludeGst && (
              <div>
                <Label htmlFor="gstRate">GST Rate</Label>
                <Select value={formData.gstRate} onValueChange={(value) => handleInputChange('gstRate', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="5%" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5%</SelectItem>
                    <SelectItem value="12">12%</SelectItem>
                    <SelectItem value="18">18%</SelectItem>
                    <SelectItem value="28">28%</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="All information about the product..."
                rows={4}
              />
            </div>

            {/* Image Upload */}
            <div>
              <Label>Images</Label>
              {selectedImages.length === 0 ? (
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
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="w-12 h-12 text-blue-500 mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Drag your image here, or browse</p>
                    <p className="text-sm text-gray-500">Supports: JPEG, PNG, JPG</p>
                  </label>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img src={image} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    <Plus className="w-8 h-8 text-gray-400" />
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                </div>
              )}
            </div>

            {/* SEO Meta Title & Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seoMetaTitle">SEO Meta Title</Label>
                <Input
                  id="seoMetaTitle"
                  value={formData.seoMetaTitle}
                  onChange={(e) => handleInputChange('seoMetaTitle', e.target.value)}
                  placeholder="Add Title"
                />
              </div>
              <div>
                <Label htmlFor="seoMetaDescription">SEO Meta Description</Label>
                <Input
                  id="seoMetaDescription"
                  value={formData.seoMetaDescription}
                  onChange={(e) => handleInputChange('seoMetaDescription', e.target.value)}
                  placeholder="Meta Description"
                />
              </div>
            </div>

            {/* AI Keywords */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-blue-600" />
                  <Label className="text-blue-800 font-medium">AI Keywords</Label>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={generateAIKeywords}>
                  Generate
                </Button>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Based on your input data, we've identified 5 keywords that may be a good fit for your product.
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer bg-blue-100 text-blue-800 hover:bg-blue-200"
                    onClick={() => removeKeyword(index)}
                  >
                    {keyword} <X size={12} className="ml-1" />
                  </Badge>
                ))}
              </div>
              <Input
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyPress={addKeyword}
                placeholder="Add custom keyword and press Enter"
                className="bg-white"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold">Variants</h3>
              <p className="text-gray-600">Product Type and Variants</p>
            </div>

            {/* Variant Types */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {variantTypes.map((variant) => (
                <Button
                  key={variant.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-auto py-2 px-3 text-sm"
                >
                  {variant.name}
                </Button>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-auto py-2 px-3 text-sm text-blue-600 border-blue-600"
              >
                + Add More
              </Button>
            </div>

            {/* Select Color Example */}
            <div>
              <Label htmlFor="selectColor">Select Color</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="black">Black</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log('Form data:', formData);
    // Handle form submission
  };

  const handleSaveAsDraft = () => {
    console.log('Saving as draft:', formData);
    // Handle save as draft
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={onBack} className="mr-4 p-2">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl md:text-2xl font-bold">Add New Products</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step.id <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.id <= currentStep ? '✓' : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600 text-sm">{steps[currentStep - 1].subtitle}</p>
          </div>
        </div>

        {/* Form Content */}
        <Card className="bg-white">
          <CardContent className="p-6 md:p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="order-2 sm:order-1"
          >
            ← Previous
          </Button>
          
          <div className="flex gap-2 order-1 sm:order-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveAsDraft}
            >
              Save as draft
            </Button>
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next →
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Save
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
