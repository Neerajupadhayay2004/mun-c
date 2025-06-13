
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Barcode
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { icon: Home, label: 'Dashboard', count: null },
    { icon: Barcode, label: 'Inventory', count: null, submenu: [
      { label: 'Add Product' },
      { label: 'Dashboard' },
      { label: 'Dashboard' }
    ]},
    { icon: Settings, label: 'Stocks', count: null },
    { icon: User, label: 'Sales', count: null },
    { icon: Settings, label: 'Documents', count: null },
    { icon: Settings, label: 'Return & Audit', count: null },
    { icon: Settings, label: 'Report', count: null },
  ];

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg">MUN-C</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-1"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-1">
            <button
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                activeItem === item.label 
                  ? "bg-blue-600 text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <item.icon size={20} />
              {!isCollapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.submenu && <ChevronRight size={16} />}
                </>
              )}
            </button>
            
            {/* Submenu */}
            {!isCollapsed && item.submenu && activeItem === item.label && (
              <div className="ml-6 mt-1 space-y-1">
                {item.submenu.map((subItem, subIndex) => (
                  <button
                    key={subIndex}
                    className="w-full text-left px-3 py-1 text-sm text-gray-600 hover:text-blue-600 rounded"
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
