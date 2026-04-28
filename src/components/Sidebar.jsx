import React from 'react';
import { BarChart3, Package, DollarSign, Target, Settings, Sun, Moon, LogOut } from 'lucide-react';
import { useStore } from '../store';

export function Sidebar({ activePage, setActivePage }) {
  const { isDarkMode, toggleTheme } = useStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'sales', label: 'Vendas', icon: DollarSign },
    { id: 'inventory', label: 'Estoque', icon: Package },
    { id: 'targets', label: 'Metas', icon: Target },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
  ];

  return (
    <div className={`${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} w-64 h-screen border-r flex flex-col transition-colors duration-300`}>
      {/* Logo */}
      <div className={`p-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`font-display font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Loja
            </h1>
            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Pro
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : isDarkMode
                  ? 'text-slate-300 hover:bg-slate-800'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
              {isActive && <div className="ml-auto w-2 h-2 rounded-full bg-white" />}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'} space-y-2`}>
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isDarkMode
              ? 'text-slate-300 hover:bg-slate-800'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {isDarkMode ? (
            <>
              <Sun className="w-5 h-5" />
              <span className="font-medium text-sm">Modo Claro</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5" />
              <span className="font-medium text-sm">Modo Escuro</span>
            </>
          )}
        </button>

        <button
          onClick={() => setActivePage('settings')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
            isDarkMode
              ? 'text-slate-300 hover:bg-slate-800'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
        </button>
      </div>
    </div>
  );
}
