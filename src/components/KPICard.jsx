import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function KPICard({ title, value, subtitle, icon: Icon, trend, alert, isDarkMode }) {
  const isPositive = trend >= 0;

  return (
    <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
      <div className="flex items-center justify-between mb-4">
        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {title}
        </p>
        <div className={`p-2 rounded-lg ${alert ? 'bg-yellow-500/10' : isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <Icon className={`w-5 h-5 ${alert ? 'text-yellow-500' : 'text-blue-500'}`} />
        </div>
      </div>

      <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {value}
      </h3>

      <div className="flex items-center justify-between">
        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {subtitle}
        </p>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
}
