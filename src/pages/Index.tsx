
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ProductGrid from '@/components/inventory/ProductGrid';
import AddProductForm from '@/components/inventory/AddProductForm';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
        return <AddProductForm onBack={() => setCurrentView('inventory')} />;
      case 'inventory':
        return <ProductGrid onAddProduct={() => setCurrentView('add-product')} />;
      case 'analytics':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Revenue Trends</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">₹1,25,000</p>
                <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Customer Growth</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">+234</p>
                <p className="text-sm text-gray-500 mt-1">New customers this month</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Conversion Rate</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">3.2%</p>
                <p className="text-sm text-gray-500 mt-1">+0.5% improvement</p>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Order Management</h1>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <span className="text-sm text-gray-500">89 total orders</span>
              </div>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((order) => (
                  <div key={order} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">#ORD-{1000 + order}</p>
                      <p className="text-sm text-gray-500">Customer {order}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(Math.random() * 5000 + 1000).toFixed(0)}</p>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Delivered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Products</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
                <p className="text-sm text-gray-500 mt-1">+12 this week</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Low Stock</h3>
                <p className="text-3xl font-bold text-red-600">23</p>
                <p className="text-sm text-gray-500 mt-1">Needs attention</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Sales</h3>
                <p className="text-3xl font-bold text-green-600">₹45,678</p>
                <p className="text-sm text-gray-500 mt-1">+5% from yesterday</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Orders</h3>
                <p className="text-3xl font-bold text-purple-600">156</p>
                <p className="text-sm text-gray-500 mt-1">+23 today</p>
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
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
          <div className="flex-1 flex flex-col">
            <Header 
              onSignOut={handleSignOut} 
              notifications={notifications}
              onToggleSidebar={handleSidebarToggle}
              onViewChange={setCurrentView}
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
