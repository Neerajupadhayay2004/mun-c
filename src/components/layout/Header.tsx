
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Menu, Search, Settings, User } from 'lucide-react';
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

interface HeaderProps {
  onSignOut: () => void;
  notifications: number;
  onToggleSidebar: () => void;
  onViewChange: (view: string) => void;
}

const Header = ({ onSignOut, notifications, onToggleSidebar, onViewChange }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="p-2 md:hidden"
        >
          <Menu size={20} />
        </Button>
        
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white hidden sm:block">
            All Products (981)
          </h1>
          <span className="text-sm text-gray-500 sm:hidden">Products</span>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-md mx-4 hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search..."
            className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => onViewChange('add-product')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
        >
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </Button>

        <ThemeSelector />
        
        <Button variant="ghost" size="sm" className="p-2 relative">
          <Bell size={18} />
          {notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
              {notifications}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <User size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <DropdownMenuItem onClick={() => onViewChange('profile')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange('settings')} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <Settings size={16} className="mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600">
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
