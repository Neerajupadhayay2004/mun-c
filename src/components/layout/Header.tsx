
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, Settings, User, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ThemeSelector from '@/components/theme/ThemeSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface HeaderProps {
  onSignOut: () => void;
  notifications: number;
  onToggleSidebar: () => void;
  onViewChange: (view: string) => void;
  sidebarCollapsed: boolean;
}

const Header = ({ onSignOut, notifications, onToggleSidebar, onViewChange, sidebarCollapsed }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [notificationList] = useState([
    { id: 1, title: 'Low Stock Alert', message: '5 products are running low on stock', time: '2 min ago', type: 'warning' },
    { id: 2, title: 'New Order', message: 'Order #12345 has been placed', time: '5 min ago', type: 'info' },
    { id: 3, title: 'Payment Received', message: '₹2,500 payment received from customer', time: '10 min ago', type: 'success' },
  ]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Left Side */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex-shrink-0"
        >
          {sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
        
        <div className="flex items-center space-x-2 min-w-0">
          <h1 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white hidden sm:block truncate">
            All Products (981)
          </h1>
          <span className="text-sm text-gray-500 sm:hidden font-medium">Products</span>
        </div>
      </div>

      {/* Center - Search (Desktop) */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search products, orders, customers..."
            className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 p-4 lg:hidden">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSearch(false)}
              className="p-2"
            >
              <X size={20} />
            </Button>
            <h2 className="text-lg font-semibold">Search</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search products, orders, customers..."
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Right Side */}
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        {/* Mobile Search */}
        <Button
          variant="ghost"
          size="sm"
          className="p-2 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          onClick={() => setShowSearch(true)}
        >
          <Search size={18} />
        </Button>

        {/* Add Product Button */}
        <Button
          onClick={() => onViewChange('add-product')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium rounded-lg shadow-sm transition-colors"
        >
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Button>

        {/* Theme Selector */}
        <div className="hidden sm:block">
          <ThemeSelector />
        </div>
        
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 relative hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Bell size={18} />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 hover:bg-red-500 text-white text-xs font-medium">
                  {notifications}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg" align="end">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notificationList.map((notification) => (
                <div key={notification.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      notification.type === 'warning' ? 'bg-yellow-500' :
                      notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <Button variant="ghost" size="sm" className="w-full">
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <User size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <DropdownMenuItem 
              onClick={() => onViewChange('profile')} 
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
            >
              <User size={16} className="mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onViewChange('settings')} 
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
            >
              <Settings size={16} className="mr-2" />
              Settings
            </DropdownMenuItem>
            <div className="sm:hidden">
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700">
                <span className="mr-2">🎨</span>
                <ThemeSelector />
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={onSignOut} 
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-red-600 dark:text-red-400"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
