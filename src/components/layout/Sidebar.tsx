
import React, { useState, useEffect } from 'react';
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
  Archive,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ isCollapsed, onToggle, currentView, onViewChange }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['inventory']);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const toggleSection = (sectionId: string) => {
    if (isCollapsed && !isMobile && !isTablet) return;
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleMenuClick = (viewId: string) => {
    onViewChange(viewId);
    if (isMobile) {
      onToggle(); // Close sidebar on mobile after selection
    }
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
        { label: 'All Products', viewId: 'inventory' },
        { label: 'Add Product', viewId: 'add-product' },
        { label: 'Categories', viewId: 'categories' },
        { label: 'Brands', viewId: 'brands' },
      ]
    },
    {
      id: 'stocks',
      label: 'Stock Management',
      icon: Archive,
      hasDropdown: true,
      items: [
        { label: 'Stock Levels', viewId: 'stock-levels' },
        { label: 'Low Stock Alert', viewId: 'low-stock' },
        { label: 'Stock Movement', viewId: 'stock-movement' },
        { label: 'Reorder Points', viewId: 'reorder-points' },
      ]
    },
    {
      id: 'sales',
      label: 'Sales & Orders',
      icon: ShoppingCart,
      hasDropdown: true,
      items: [
        { label: 'Sales Overview', viewId: 'sales-overview' },
        { label: 'Orders', viewId: 'orders' },
        { label: 'Transactions', viewId: 'transactions' },
        { label: 'Refunds', viewId: 'refunds' },
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      hasDropdown: true,
      items: [
        { label: 'Customer List', viewId: 'customers' },
        { label: 'Customer Groups', viewId: 'customer-groups' },
        { label: 'Reviews', viewId: 'reviews' },
        { label: 'Loyalty Program', viewId: 'loyalty' },
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
        { label: 'Purchase Orders', viewId: 'purchase-orders' },
        { label: 'Reports', viewId: 'documents-reports' },
      ]
    },
    {
      id: 'audit',
      label: 'Returns & Audit',
      icon: TrendingUp,
      hasDropdown: true,
      items: [
        { label: 'Returns', viewId: 'returns' },
        { label: 'Audit Logs', viewId: 'audit-logs' },
        { label: 'Quality Check', viewId: 'quality-check' },
        { label: 'Compliance', viewId: 'compliance' },
      ]
    },
    {
      id: 'report',
      label: 'Analytics & Reports',
      icon: BarChart3,
      hasDropdown: true,
      items: [
        { label: 'Sales Analytics', viewId: 'analytics' },
        { label: 'Performance', viewId: 'performance' },
        { label: 'Revenue Report', viewId: 'revenue-report' },
        { label: 'Inventory Report', viewId: 'inventory-report' },
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      icon: DollarSign,
      hasDropdown: true,
      items: [
        { label: 'Revenue', viewId: 'revenue' },
        { label: 'Expenses', viewId: 'expenses' },
        { label: 'Profit & Loss', viewId: 'profit-loss' },
        { label: 'Tax Reports', viewId: 'tax-reports' },
      ]
    }
  ];

  // Overlay for mobile
  const renderOverlay = () => {
    if (!isCollapsed && isMobile) {
      return (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      );
    }
    return null;
  };

  return (
    <>
      {renderOverlay()}
      <div className={cn(
        "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen flex flex-col shadow-lg z-30 transition-all duration-300 ease-in-out",
        // Mobile: Fixed positioning with sliding
        isMobile ? (
          cn(
            "fixed left-0 top-0 w-80",
            isCollapsed 
              ? "-translate-x-full opacity-0" 
              : "translate-x-0 opacity-100"
          )
        ) : isTablet ? (
          // Tablet: Fixed positioning with sliding
          cn(
            "fixed left-0 top-0 w-72",
            isCollapsed 
              ? "-translate-x-full opacity-0" 
              : "translate-x-0 opacity-100"
          )
        ) : (
          // Desktop: Static positioning with width change
          cn(
            "relative",
            isCollapsed ? "w-16" : "w-64"
          )
        )
      )}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between min-h-[73px] flex-shrink-0">
          {(!isCollapsed || isMobile || isTablet) && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg text-gray-800 dark:text-white truncate">MUN-C</span>
            </div>
          )}
          
          {/* Close button for mobile/tablet */}
          {(isMobile || isTablet) && !isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X size={16} />
            </Button>
          )}
          
          {/* Collapse button for desktop */}
          {!isMobile && !isTablet && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </Button>
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {menuSections.map((section) => (
            <div key={section.id}>
              {section.hasDropdown ? (
                <div>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
                      "text-gray-700 dark:text-gray-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                      expandedSections.includes(section.id) && "bg-gray-50 dark:bg-gray-800"
                    )}
                    title={isCollapsed && !isMobile && !isTablet ? section.label : undefined}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <section.icon size={18} className="flex-shrink-0 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                      {(!isCollapsed || isMobile || isTablet) && (
                        <span className="text-sm font-medium truncate">{section.label}</span>
                      )}
                    </div>
                    {(!isCollapsed || isMobile || isTablet) && (
                      <div className="flex-shrink-0">
                        {expandedSections.includes(section.id) ? 
                          <ChevronUp size={14} className="text-gray-400" /> : 
                          <ChevronDown size={14} className="text-gray-400" />
                        }
                      </div>
                    )}
                  </button>
                  
                  {/* Dropdown Items */}
                  {(!isCollapsed || isMobile || isTablet) && expandedSections.includes(section.id) && section.items && (
                    <div className="ml-6 mt-1 space-y-1 animate-fade-in">
                      {section.items.map((item) => (
                        <button
                          key={item.viewId}
                          onClick={() => handleMenuClick(item.viewId)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-md text-sm transition-all duration-200 group",
                            currentView === item.viewId
                              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
                          )}
                        >
                          <span className="block truncate">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleMenuClick(section.viewId!)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
                    currentView === section.viewId
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                  title={isCollapsed && !isMobile && !isTablet ? section.label : undefined}
                >
                  <section.icon size={18} className="flex-shrink-0" />
                  {(!isCollapsed || isMobile || isTablet) && (
                    <span className="text-sm font-medium truncate">{section.label}</span>
                  )}
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {(!isCollapsed || isMobile || isTablet) && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
            <button
              onClick={() => handleMenuClick('settings')}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              <Settings size={18} />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
