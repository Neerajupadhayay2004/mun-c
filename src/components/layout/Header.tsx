
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  Menu,
  Sun,
  Moon,
  Monitor,
  Palette,
  Zap,
  Shield,
  Crown,
  Leaf,
  Coffee,
  Sunset,
  Star
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
  onSignOut: () => void;
  notifications: number;
  onToggleSidebar: () => void;
  onViewChange: (view: string) => void;
}

const Header = ({ onSignOut, notifications, onToggleSidebar, onViewChange }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'blue', label: 'Ocean Blue', icon: Zap },
    { value: 'purple', label: 'Purple Haze', icon: Crown },
    { value: 'green', label: 'Nature Green', icon: Leaf },
    { value: 'orange', label: 'Sunset Orange', icon: Sunset },
    { value: 'rose', label: 'Rose Gold', icon: Star },
    { value: 'coffee', label: 'Coffee Brown', icon: Coffee },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-3 flex items-center justify-between shadow-sm">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Menu size={20} />
        </Button>
        
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products, orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-80 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-colors"
          />
        </div>
      </div>

      {/* Center Section - Quick Actions (Desktop Only) */}
      <div className="hidden lg:flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('add-product')}
          className="text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2"
        >
          <span className="mr-2">+</span>
          Add Product
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('orders')}
          className="text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2"
        >
          Orders
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange('analytics')}
          className="text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2"
        >
          Analytics
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Search Button (Mobile Only) */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Search size={18} />
        </Button>

        {/* Theme Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Palette size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <DropdownMenuLabel className="font-semibold">Choose Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {themeOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    theme === option.value ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : ''
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="text-sm">{option.label}</span>
                  {theme === option.value && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <Bell size={18} />
              {notifications > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full px-1"
                >
                  {notifications > 9 ? '9+' : notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <DropdownMenuLabel className="font-semibold flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-xs">
                {notifications} new
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="font-medium text-sm">New order received</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Order #12345 from John Doe</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">2 minutes ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="font-medium text-sm">Low stock alert</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">iPhone 15 Pro has only 3 units left</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">1 hour ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="font-medium text-sm">Customer review</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">5★ review for Samsung Galaxy S24</div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">3 hours ago</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-center text-blue-600 dark:text-blue-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => onViewChange('notifications')}
            >
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <Avatar className="h-9 w-9 ring-2 ring-gray-200 dark:ring-gray-700">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-muted-foreground mt-1">
                      admin@mun-c.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs flex items-center">
                    <Shield size={12} className="mr-1" />
                    Super Admin
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Premium
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => onViewChange('profile')}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => onViewChange('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={onSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
