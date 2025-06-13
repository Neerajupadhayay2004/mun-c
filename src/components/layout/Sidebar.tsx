
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Barcode,
  Package,
  TrendingUp,
  FileText,
  RotateCcw,
  BarChart3,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ isCollapsed, onToggle, currentView, onViewChange }: SidebarProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', id: 'dashboard' },
    { icon: Barcode, label: 'Inventory', id: 'inventory' },
    { icon: Package, label: 'Stocks', id: 'stocks' },
    { icon: TrendingUp, label: 'Sales', id: 'sales' },
    { icon: FileText, label: 'Documents', id: 'documents' },
    { icon: RotateCcw, label: 'Return & Audit', id: 'return' },
    { icon: BarChart3, label: 'Report', id: 'report' },
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col shadow-sm",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-gray-800">MUN-C</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-1 hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200",
              currentView === item.id 
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Add Product Button */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={() => onViewChange('add-product')}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
