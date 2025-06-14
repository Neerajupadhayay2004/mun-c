
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ProductGrid from '@/components/inventory/ProductGrid';
import AddProductForm from '@/components/inventory/AddProductForm';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [notifications] = useState(3);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'add-product':
        return (
          <div className="p-4 sm:p-6">
            <AddProductForm onBack={() => setCurrentView('inventory')} />
          </div>
        );
      case 'inventory':
      case 'inventory-dashboard':
      case 'inventory-overview':
        return (
          <div className="p-4 sm:p-6">
            <ProductGrid onAddProduct={() => setCurrentView('add-product')} />
          </div>
        );
      case 'stock-levels':
        return (
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Stock Levels</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">High Stock Items</h3>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">156</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Items above threshold</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">Medium Stock</h3>
                <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-2">89</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Items need monitoring</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">Low Stock Alert</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">23</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Items need restocking</p>
              </div>
            </div>
          </div>
        );
      case 'sales-overview':
        return (
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Sales Overview</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">Today's Sales</h3>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">₹45,230</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+12% from yesterday</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">This Week</h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">₹2,15,840</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+8% from last week</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">This Month</h3>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-2">₹8,45,670</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+15% from last month</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">Orders</h3>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600 mt-2">342</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+23 today</p>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Order Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <h2 className="text-base sm:text-lg font-semibold">Recent Orders</h2>
                <span className="text-sm text-gray-500">156 total orders</span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((order) => (
                  <div key={order} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-2">
                    <div>
                      <p className="font-medium">#ORD-{2000 + order}</p>
                      <p className="text-sm text-gray-500">Customer {order}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-medium">₹{(Math.random() * 8000 + 2000).toFixed(0)}</p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Completed</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-6">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">Revenue Growth</h3>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">+24%</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Compared to last quarter</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">Customer Retention</h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-2">87%</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Monthly retention rate</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold">Average Order Value</h3>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 mt-2">₹1,245</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+₹156 from last month</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Total Products</h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">981</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+15 this week</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Low Stock</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-600">12</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Needs attention</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Total Sales</h3>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">₹67,890</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+8% from yesterday</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">Orders</h3>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">234</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">+28 today</p>
              </div>
            </div>
            <ProductGrid onAddProduct={() => setCurrentView('add-product')} />
          </div>
        );
    }
  };

  if (!isSignedIn) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <AuthForm onSignIn={() => setIsSignedIn(true)} />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gray-50 dark:bg-gray-900">
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={handleSidebarToggle}
            currentView={currentView}
            onViewChange={setCurrentView}
          />
          <div className="flex-1 flex flex-col min-w-0">
            <Header 
              onSignOut={handleSignOut} 
              notifications={notifications}
              onToggleSidebar={handleSidebarToggle}
              onViewChange={setCurrentView}
              sidebarCollapsed={sidebarCollapsed}
            />
            <main className="flex-1 overflow-auto">
              {renderContent()}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Index;
