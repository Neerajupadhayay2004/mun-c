
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
  Users,
  ShoppingCart,
  CreditCard,
  Truck,
  AlertTriangle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ isCollapsed, onToggle, currentView, onViewChange }: SidebarProps) => {
  const menuSections = [
    {
      label: 'Main',
      items: [
        { icon: Home, label: 'Dashboard', id: 'dashboard', count: null },
        { icon: BarChart3, label: 'Analytics', id: 'analytics', count: null },
        { icon: TrendingUp, label: 'Sales Report', id: 'sales', count: '156' },
      ]
    },
    {
      label: 'Inventory',
      items: [
        { icon: Package, label: 'All Products', id: 'inventory', count: '1,234' },
        { icon: Barcode, label: 'Categories', id: 'categories', count: '24' },
        { icon: AlertTriangle, label: 'Low Stock', id: 'low-stock', count: '23' },
        { icon: Clock, label: 'Expiring Soon', id: 'expiring', count: '12' },
      ]
    },
    {
      label: 'Orders',
      items: [
        { icon: ShoppingCart, label: 'All Orders', id: 'orders', count: '89' },
        { icon: Truck, label: 'Shipping', id: 'shipping', count: '34' },
        { icon: RotateCcw, label: 'Returns', id: 'returns', count: '7' },
      ]
    },
    {
      label: 'Management',
      items: [
        { icon: Users, label: 'Customers', id: 'customers', count: '567' },
        { icon: CreditCard, label: 'Payments', id: 'payments', count: null },
        { icon: FileText, label: 'Documents', id: 'documents', count: '45' },
        { icon: DollarSign, label: 'Finance', id: 'finance', count: null },
      ]
    }
  ];

  return (
    <div className={cn(
      "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen transition-all duration-300 ease-in-out flex flex-col shadow-sm",
      "fixed md:relative z-30 md:z-auto",
      isCollapsed ? "w-16 -translate-x-full md:translate-x-0" : "w-64 translate-x-0"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-gray-800 dark:text-white">MUN-C</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 md:flex hidden"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Menu Sections */}
      <nav className="flex-1 p-2 space-y-4 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.label} className="space-y-1">
            {!isCollapsed && (
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.label}
              </h3>
            )}
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
                  currentView === item.id 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="font-medium text-sm">{item.label}</span>
                  )}
                </div>
                {!isCollapsed && item.count && (
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    currentView === item.id 
                      ? "bg-white/20 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  )}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Settings at bottom */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => onViewChange('settings')}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
              currentView === 'settings'
                ? "bg-blue-600 text-white shadow-sm" 
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            )}
          >
            <Settings size={20} className="flex-shrink-0" />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
