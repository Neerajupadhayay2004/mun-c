
import React from 'react';
import { useTheme } from './ThemeProvider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Palette } from 'lucide-react';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', name: 'Light', color: 'bg-white' },
    { id: 'dark', name: 'Dark', color: 'bg-gray-800' },
    { id: 'system', name: 'System', color: 'bg-gradient-to-r from-white to-gray-800' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-blue-600' },
    { id: 'purple', name: 'Purple Haze', color: 'bg-purple-600' },
    { id: 'green', name: 'Nature Green', color: 'bg-green-600' },
    { id: 'orange', name: 'Sunset Orange', color: 'bg-orange-600' },
    { id: 'rose', name: 'Rose Gold', color: 'bg-rose-600' },
    { id: 'coffee', name: 'Coffee Brown', color: 'bg-amber-700' },
    { id: 'midnight', name: 'Midnight Blue', color: 'bg-slate-900' },
    { id: 'forest', name: 'Forest Green', color: 'bg-emerald-800' },
    { id: 'sunset', name: 'Sunset Red', color: 'bg-red-600' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <Palette size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id as any)}
            className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
              theme === themeOption.id ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <div className={`w-4 h-4 rounded-full ${themeOption.color} border border-gray-300`} />
            <span>{themeOption.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
