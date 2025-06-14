
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Package,
  TrendingUp,
  FileText,
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Archive
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ isCollapsed, onToggle, currentView, onViewChange }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    if (isCollapsed) return;
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const menuSections = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      hasDropdown: false,
      viewId: 'dashboard'
    },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Package,
      hasDropdown: true,
      items: [
        { label: 'Add Product', viewId: 'add-product' },
        { label: 'Dashboard', viewId: 'inventory-dashboard' },
        { label: 'Dashboard', viewId: 'inventory-overview' },
      ]
    },
    {
      id: 'stocks',
      label: 'Stocks',
      icon: Archive,
      hasDropdown: true,
      items: [
        { label: 'Stock Levels', viewId: 'stock-levels' },
        { label: 'Low Stock Alert', viewId: 'low-stock' },
        { label: 'Stock Movement', viewId: 'stock-movement' },
      ]
    },
    {
      id: 'sales',
      label: 'Sales',
      icon: ShoppingCart,
      hasDropdown: true,
      items: [
        { label: 'Sales Overview', viewId: 'sales-overview' },
        { label: 'Orders', viewId: 'orders' },
        { label: 'Transactions', viewId: 'transactions' },
      ]
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: FileText,
      hasDropdown: true,
      items: [
        { label: 'Invoices', viewId: 'invoices' },
        { label: 'Receipts', viewId: 'receipts' },
        { label: 'Reports', viewId: 'documents-reports' },
      ]
    },
    {
      id: 'audit',
      label: 'Return & Audit',
      icon: TrendingUp,
      hasDropdown: true,
      items: [
        { label: 'Returns', viewId: 'returns' },
        { label: 'Audit Logs', viewId: 'audit-logs' },
        { label: 'Quality Check', viewId: 'quality-check' },
      ]
    },
    {
      id: 'report',
      label: 'Report',
      icon: BarChart3,
      hasDropdown: true,
      items: [
        { label: 'Analytics', viewId: 'analytics' },
        { label: 'Performance', viewId: 'performance' },
        { label: 'Revenue Report', viewId: 'revenue-report' },
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
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-gray-800 dark:text-white">MUN-C</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg hidden md:flex"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.id}>
            {section.hasDropdown ? (
              <div>
                <button
                  onClick={() => toggleSection(section.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                    "text-gray-700 dark:text-gray-300",
                    expandedSections.includes(section.id) && "bg-gray-50 dark:bg-gray-800"
                  )}
                  title={isCollapsed ? section.label : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <section.icon size={18} className="flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">{section.label}</span>}
                  </div>
                  {!isCollapsed && (
                    expandedSections.includes(section.id) ? 
                    <ChevronUp size={14} /> : 
                    <ChevronDown size={14} />
                  )}
                </button>
                
                {/* Dropdown Items */}
                {!isCollapsed && expandedSections.includes(section.id) && section.items && (
                  <div className="ml-6 mt-1 space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.viewId}
                        onClick={() => onViewChange(item.viewId)}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                          currentView === item.viewId
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => onViewChange(section.viewId!)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200",
                  currentView === section.viewId
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                title={isCollapsed ? section.label : undefined}
              >
                <section.icon size={18} className="flex-shrink-0" />
                {!isCollapsed && <span className="text-sm font-medium">{section.label}</span>}
              </button>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
