
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Settings, User, Search, Bell, Moon, Sun, Menu, Plus } from 'lucide-react';

interface HeaderProps {
  onSignOut: () => void;
  notifications: number;
  onToggleSidebar: () => void;
  onViewChange: (view: string) => void;
}

const Header = ({ onSignOut, notifications, onToggleSidebar, onViewChange }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationList = [
    { id: 1, title: 'Low Stock Alert', message: 'Bluetooth Speaker Mini is running low (5 items left)', time: '5 min ago', type: 'warning' },
    { id: 2, title: 'New Order', message: 'Order #1234 has been placed by John Doe', time: '10 min ago', type: 'info' },
    { id: 3, title: 'Product Added', message: 'Wireless Headphones Pro added successfully', time: '1 hour ago', type: 'success' },
    { id: 4, title: 'Payment Received', message: 'Payment of ₹2,500 received for Order #1235', time: '2 hours ago', type: 'success' },
    { id: 5, title: 'Stock Updated', message: 'iPhone 14 Pro stock updated to 50 units', time: '3 hours ago', type: 'info' }
  ];

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left Section - Mobile Menu & Search */}
        <div className="flex items-center space-x-3 flex-1">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden p-2" 
            onClick={onToggleSidebar}
          >
            <Menu size={20} />
          </Button>

          {/* Search - Always visible but responsive width */}
          <div className="flex-1 max-w-md lg:max-w-lg relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
            <Input
              placeholder="Search products, orders, customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 lg:space-x-3">
          {/* Add Product Button - Hidden on mobile */}
          <Button 
            onClick={() => onViewChange('add-product')}
            className="hidden sm:flex bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2"
            size="sm"
          >
            <Plus size={16} className="mr-1" />
            <span className="hidden lg:inline">Add Product</span>
          </Button>

          {/* Add Product Button - Mobile FAB style */}
          <Button 
            onClick={() => onViewChange('add-product')}
            className="sm:hidden fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full w-14 h-14 shadow-lg z-20"
            size="sm"
          >
            <Plus size={24} />
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Bell size={18} />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1.5 min-w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                    {notifications > 99 ? '99+' : notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 lg:w-96 max-h-96 overflow-y-auto">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{notifications} unread notifications</p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notificationList.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-medium text-sm text-gray-900 dark:text-white">{notification.title}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-left mb-2">{notification.message}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        notification.type === 'warning' ? 'border-yellow-500 text-yellow-700 dark:text-yellow-400' :
                        notification.type === 'success' ? 'border-green-500 text-green-700 dark:text-green-400' :
                        'border-blue-500 text-blue-700 dark:text-blue-400'
                      }`}
                    >
                      {notification.type}
                    </Badge>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600 dark:text-blue-400 font-medium p-3 cursor-pointer">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings - Hidden on small screens */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => onViewChange('settings')}
          >
            <Settings size={18} />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-1 relative hover:bg-gray-100 dark:hover:bg-gray-800">
                <Avatar className="h-8 w-8 lg:h-9 lg:w-9">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="font-medium text-gray-900 dark:text-white">John Doe</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">john@example.com</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Admin</p>
              </div>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer lg:hidden" onClick={() => onViewChange('settings')}>
                <Settings className="mr-2 h-4 w-4" />
                App Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="text-red-600 dark:text-red-400 cursor-pointer">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
