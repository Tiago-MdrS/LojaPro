import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Sales } from './pages/Sales';
import { Inventory } from './pages/Inventory';
import { Targets } from './pages/Targets';
import { Reports } from './pages/Reports';
import { useStore } from './store';
import './index.css';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const { isDarkMode } = useStore();

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'sales':
        return <Sales />;
      case 'inventory':
        return <Inventory />;
      case 'targets':
        return <Targets />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-gray-900'} h-screen flex overflow-hidden`}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className={`flex-1 overflow-auto ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="p-8 max-w-7xl">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
