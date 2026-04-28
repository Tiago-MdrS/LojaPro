import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { useStore } from '../store';

export function Dashboard() {
  const {
    isDarkMode,
    salesToday,
    salesLast31Days,
    expenses,
    products,
    targets,
    getTotalRevenue,
    getTotalExpenses,
    getNetProfit,
    getLowStockProducts,
    getMostSoldProducts,
    getAverageTicket,
    getTotalStock,
  } = useStore();

  const totalRevenue = getTotalRevenue();
  const totalExpenses = getTotalExpenses();
  const netProfit = getNetProfit();
  const lowStockProducts = getLowStockProducts();
  const mostSoldProducts = getMostSoldProducts();
  const averageTicket = getAverageTicket();
  const totalStock = getTotalStock();
  const dailyProgress = (totalRevenue / targets.daily) * 100;

  const chartColors = {
    primary: '#3b82f6',
    secondary: '#10b981',
    tertiary: '#f59e0b',
    danger: '#ef4444',
  };

  const bgColor = isDarkMode ? '#1e293b' : '#ffffff';
  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';
  const textColor = isDarkMode ? '#94a3b8' : '#64748b';

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Bem-vindo ao painel de controle da sua loja
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Vendas Hoje" value={`R$ ${totalRevenue.toLocaleString('pt-BR')}`} subtitle={`${salesToday.length} transações`} icon={DollarSign} trend={12} isDarkMode={isDarkMode} />
        <KPICard title="Lucro Hoje" value={`R$ ${netProfit.toLocaleString('pt-BR')}`} subtitle={`de ${targets.daily}`} icon={TrendingUp} trend={Math.min(100, (totalRevenue / targets.daily) * 100).toFixed(0)} isDarkMode={isDarkMode} />
        <KPICard title="Despesas" value={`R$ ${totalExpenses.toLocaleString('pt-BR')}`} subtitle={`${expenses.length} transações`} icon={DollarSign} trend={-5} isDarkMode={isDarkMode} />
        <KPICard title="Estoque Total" value={totalStock} subtitle={`${lowStockProducts.length} produtos baixos`} icon={Package} alert={lowStockProducts.length > 0} isDarkMode={isDarkMode} />
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Meta Diária</h3>
          <span className={`text-sm font-bold ${dailyProgress >= 100 ? 'text-green-500' : 'text-blue-500'}`}>
            {dailyProgress.toFixed(0)}%
          </span>
        </div>
        <div className={`w-full h-3 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
          <div className={`h-full transition-all duration-500 ${dailyProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${Math.min(dailyProgress, 100)}%` }} />
        </div>
        <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          R$ {totalRevenue.toLocaleString('pt-BR')} de R$ {targets.daily.toLocaleString('pt-BR')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Vendas - Últimos 31 dias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesLast31Days}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="date" stroke={textColor} style={{ fontSize: '12px' }} />
              <YAxis stroke={textColor} style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: bgColor, border: `1px solid ${gridColor}`, borderRadius: '8px', color: isDarkMode ? '#f1f5f9' : '#1e293b' }} />
              <Line type="monotone" dataKey="total" stroke={chartColors.primary} strokeWidth={2} dot={{ fill: chartColors.primary, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fluxo de Caixa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Hoje', entradas: totalRevenue, saídas: totalExpenses },
              { name: 'Semana', entradas: totalRevenue * 7, saídas: totalExpenses * 7 },
              { name: 'Mês', entradas: totalRevenue * 30, saídas: totalExpenses * 30 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} style={{ fontSize: '12px' }} />
              <YAxis stroke={textColor} style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: bgColor, border: `1px solid ${gridColor}`, borderRadius: '8px', color: isDarkMode ? '#f1f5f9' : '#1e293b' }} />
              <Legend />
              <Bar dataKey="entradas" fill={chartColors.secondary} name="Entradas" />
              <Bar dataKey="saídas" fill={chartColors.danger} name="Saídas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Produtos Mais Vendidos</h3>
          <div className="space-y-3">
            {mostSoldProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{product.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.sold}x</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Estoque Baixo
          </h3>
          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div key={product.id} className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-yellow-50'} flex items-center justify-between`}>
                  <div>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{product.quantity} em estoque</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${product.quantity === 0 ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {product.quantity === 0 ? 'Fora' : 'Baixo'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>✓ Todos os produtos têm bom estoque</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>Ticket Médio</p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>R$ {averageTicket.toLocaleString('pt-BR')}</h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>Receita Total</p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>R$ {totalRevenue.toLocaleString('pt-BR')}</h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>Margem de Lucro</p>
          <h3 className="text-2xl font-display font-bold text-green-500">
            {totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : 0}%
          </h3>
        </div>
      </div>
    </div>
  );
}