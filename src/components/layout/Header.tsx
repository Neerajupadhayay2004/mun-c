
import React, { useState } from 'react';
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
import { Settings, User, Search, Bell, Moon, Sun, Menu } from 'lucide-react';

interface HeaderProps {
  onSignOut: () => void;
  notifications: number;
}

const Header = ({ onSignOut, notifications }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationList = [
    { id: 1, title: 'Low Stock Alert', message: 'Bluetooth Speaker Mini is running low (5 items left)', time: '5 min ago', type: 'warning' },
    { id: 2, title: 'New Order', message: 'Order #1234 has been placed', time: '10 min ago', type: 'info' },
    { id: 3, title: 'Product Added', message: 'Wireless Headphones Pro added successfully', time: '1 hour ago', type: 'success' }
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you'd update the theme context here
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu size={20} />
        </Button>

        {/* Search - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search products, orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Search Button for Mobile */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Search size={20} />
          </Button>

          {/* Theme Toggle */}
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          {/* Notifications */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell size={20} />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1 min-w-5 h-5 flex items-center justify-center text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
              <div className="px-3 py-2 border-b">
                <h3 className="font-semibold">Notifications</h3>
                <p className="text-sm text-gray-500">{notifications} unread</p>
              </div>
              {notificationList.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-medium text-sm">{notification.title}</span>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 text-left">{notification.message}</p>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 text-xs ${
                      notification.type === 'warning' ? 'border-yellow-500 text-yellow-700' :
                      notification.type === 'success' ? 'border-green-500 text-green-700' :
                      'border-blue-500 text-blue-700'
                    }`}
                  >
                    {notification.type}
                  </Badge>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center text-blue-600 font-medium">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings size={20} />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-0 relative">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-blue-600 text-white text-sm">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 border-b">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">john@example.com</p>
              </div>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut} className="text-red-600">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
