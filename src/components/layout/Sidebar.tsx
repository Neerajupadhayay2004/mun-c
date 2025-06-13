
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Upload,
  Star,
  Heart,
  MessageSquare,
  Bell,
  Calendar,
  Map,
  Zap,
  Shield,
  Database,
  Globe,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar = ({ isCollapsed, onToggle, currentView, onViewChange }: SidebarProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

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
      id: 'main',
      label: 'Dashboard',
      icon: Home,
      items: [
        { icon: Home, label: 'Overview', id: 'dashboard', count: null },
        { icon: BarChart3, label: 'Analytics', id: 'analytics', count: null },
        { icon: TrendingUp, label: 'Reports', id: 'reports', count: '12' },
        { icon: Calendar, label: 'Calendar', id: 'calendar', count: '5' },
      ]
    },
    {
      id: 'inventory',
      label: 'Inventory Management',
      icon: Package,
      items: [
        { icon: Package, label: 'All Products', id: 'inventory', count: '1,234' },
        { icon: Plus, label: 'Add Product', id: 'add-product', count: null },
        { icon: Barcode, label: 'Categories', id: 'categories', count: '24' },
        { icon: AlertTriangle, label: 'Low Stock', id: 'low-stock', count: '23' },
        { icon: Clock, label: 'Expiring Soon', id: 'expiring', count: '12' },
        { icon: Eye, label: 'Product Views', id: 'product-views', count: '856' },
        { icon: Star, label: 'Top Rated', id: 'top-rated', count: '145' },
        { icon: Filter, label: 'Filters', id: 'filters', count: null },
      ]
    },
    {
      id: 'orders',
      label: 'Order Management',
      icon: ShoppingCart,
      items: [
        { icon: ShoppingCart, label: 'All Orders', id: 'orders', count: '89' },
        { icon: Clock, label: 'Pending', id: 'pending-orders', count: '23' },
        { icon: Truck, label: 'Shipping', id: 'shipping', count: '34' },
        { icon: Package, label: 'Delivered', id: 'delivered', count: '156' },
        { icon: RotateCcw, label: 'Returns', id: 'returns', count: '7' },
        { icon: AlertTriangle, label: 'Issues', id: 'order-issues', count: '3' },
        { icon: Download, label: 'Export Orders', id: 'export-orders', count: null },
      ]
    },
    {
      id: 'customers',
      label: 'Customer Relations',
      icon: Users,
      items: [
        { icon: Users, label: 'All Customers', id: 'customers', count: '567' },
        { icon: Star, label: 'VIP Customers', id: 'vip-customers', count: '45' },
        { icon: Heart, label: 'Loyal Customers', id: 'loyal-customers', count: '123' },
        { icon: MessageSquare, label: 'Reviews', id: 'reviews', count: '234' },
        { icon: Mail, label: 'Email Lists', id: 'email-lists', count: '12' },
        { icon: Phone, label: 'Support Tickets', id: 'support', count: '18' },
      ]
    },
    {
      id: 'finance',
      label: 'Financial Management',
      icon: DollarSign,
      items: [
        { icon: DollarSign, label: 'Revenue', id: 'revenue', count: null },
        { icon: CreditCard, label: 'Payments', id: 'payments', count: '234' },
        { icon: TrendingUp, label: 'Sales Report', id: 'sales', count: null },
        { icon: FileText, label: 'Invoices', id: 'invoices', count: '89' },
        { icon: BarChart3, label: 'Profit Analysis', id: 'profit', count: null },
        { icon: Download, label: 'Tax Reports', id: 'tax-reports', count: null },
      ]
    },
    {
      id: 'marketing',
      label: 'Marketing & Promotions',
      icon: Zap,
      items: [
        { icon: Zap, label: 'Campaigns', id: 'campaigns', count: '8' },
        { icon: Globe, label: 'Social Media', id: 'social-media', count: '15' },
        { icon: Mail, label: 'Email Marketing', id: 'email-marketing', count: '12' },
        { icon: Star, label: 'Promotions', id: 'promotions', count: '6' },
        { icon: BarChart3, label: 'ROI Analysis', id: 'roi-analysis', count: null },
      ]
    },
    {
      id: 'system',
      label: 'System Management',
      icon: Settings,
      items: [
        { icon: Settings, label: 'General Settings', id: 'settings', count: null },
        { icon: Users, label: 'User Management', id: 'user-management', count: '12' },
        { icon: Shield, label: 'Security', id: 'security', count: null },
        { icon: Database, label: 'Backup', id: 'backup', count: null },
        { icon: Bell, label: 'Notifications', id: 'notifications', count: '5' },
        { icon: Upload, label: 'Import/Export', id: 'import-export', count: null },
      ]
    }
  ];

  return (
    <div className={cn(
      "bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen transition-all duration-300 ease-in-out flex flex-col shadow-lg",
      "fixed md:relative z-30 md:z-auto",
      isCollapsed ? "w-16 -translate-x-full md:translate-x-0" : "w-72 translate-x-0"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <span className="font-bold text-xl text-gray-800 dark:text-white">MUN-C</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">Commerce Hub</p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:flex hidden rounded-lg"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      {/* Menu Sections */}
      <nav className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {menuSections.map((section) => (
          <div key={section.id} className="space-y-1">
            {!isCollapsed && (
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group hover:bg-gray-100 dark:hover:bg-gray-800",
                  "text-gray-700 dark:text-gray-300 font-medium"
                )}
              >
                <div className="flex items-center space-x-3">
                  <section.icon size={20} className="flex-shrink-0 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-sm">{section.label}</span>
                </div>
                {expandedSections.includes(section.id) ? 
                  <ChevronUp size={16} className="text-gray-400" /> : 
                  <ChevronDown size={16} className="text-gray-400" />
                }
              </button>
            )}
            
            {/* Section Items */}
            <div className={cn(
              "space-y-1 transition-all duration-300",
              isCollapsed ? "block" : expandedSections.includes(section.id) ? "block" : "hidden",
              !isCollapsed && "ml-4 border-l-2 border-gray-100 dark:border-gray-700 pl-4"
            )}>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
                    currentView === item.id 
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon size={18} className="flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                  </div>
                  {!isCollapsed && item.count && (
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      currentView === item.id 
                        ? "bg-white/20 text-white" 
                        : "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    )}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Version 2.1.0</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">© 2024 MUN-C</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
