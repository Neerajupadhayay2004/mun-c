
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ProductGrid from '@/components/inventory/ProductGrid';
import AddProductForm from '@/components/inventory/AddProductForm';

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
    // Add sign out logic here
  };

  const renderContent = () => {
    switch (currentView) {
      case 'add-product':
        return <AddProductForm onBack={() => setCurrentView('inventory')} />;
      case 'inventory':
        return <ProductGrid onAddProduct={() => setCurrentView('add-product')} />;
      default:
        return (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
                <p className="text-3xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">Low Stock</h3>
                <p className="text-3xl font-bold text-red-600">23</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
                <p className="text-3xl font-bold text-green-600">₹45,678</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800">Orders</h3>
                <p className="text-3xl font-bold text-purple-600">156</p>
              </div>
            </div>
            <ProductGrid onAddProduct={() => setCurrentView('add-product')} />
          </div>
        );
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center">Sign In</h2>
          <button
            onClick={() => setIsSignedIn(true)}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={handleSidebarToggle}
          currentView={currentView}
          onViewChange={setCurrentView}
        />
        <div className="flex-1 flex flex-col">
          <Header onSignOut={handleSignOut} notifications={notifications} />
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
