import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle,
  ShoppingCart,
  Target,
} from 'lucide-react';
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

  const hasDailyTarget = targets.daily > 0;
  const dailyProgress = hasDailyTarget ? (totalRevenue / targets.daily) * 100 : 0;
  const missingToGoal = Math.max(0, targets.daily - totalRevenue);
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const hasSalesChartData = salesLast31Days.some((day) => Number(day.total || 0) > 0);
  const hasMostSoldProducts = mostSoldProducts.length > 0;

  const bgColor = isDarkMode ? '#1e293b' : '#ffffff';
  const gridColor = isDarkMode ? '#334155' : '#e2e8f0';
  const textColor = isDarkMode ? '#94a3b8' : '#64748b';

  const money = (value) => `R$ ${Number(value || 0).toLocaleString('pt-BR')}`;

  const cashFlowData = [
    {
      name: 'Hoje',
      entradas: totalRevenue,
      saidas: totalExpenses,
      lucro: netProfit,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Visão geral das vendas, estoque, despesas e metas da sua loja
          </p>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'} hidden md:flex border rounded-xl px-4 py-3 text-sm`}>
          Hoje: {new Date().toLocaleDateString('pt-BR')}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Vendas Hoje"
          value={money(totalRevenue)}
          subtitle={`${salesToday.length} transações`}
          icon={DollarSign}
          trend={salesToday.length > 0 ? 12 : 0}
          isDarkMode={isDarkMode}
        />

        <KPICard
          title="Lucro Hoje"
          value={money(netProfit)}
          subtitle={netProfit >= 0 ? 'Resultado positivo' : 'Resultado negativo'}
          icon={TrendingUp}
          trend={totalRevenue > 0 ? profitMargin.toFixed(0) : 0}
          isDarkMode={isDarkMode}
        />

        <KPICard
          title="Despesas"
          value={money(totalExpenses)}
          subtitle={`${expenses.length} registros`}
          icon={ShoppingCart}
          trend={expenses.length > 0 ? -5 : 0}
          isDarkMode={isDarkMode}
        />

        <KPICard
          title="Estoque Total"
          value={`${totalStock} un.`}
          subtitle={`${products.length} produtos cadastrados`}
          icon={Package}
          alert={lowStockProducts.length > 0}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <Target className="w-5 h-5 text-blue-500" />
              Meta Diária
            </h3>
            <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {hasDailyTarget
                ? `${money(totalRevenue)} de ${money(targets.daily)}`
                : 'Nenhuma meta diária definida'}
            </p>
          </div>

          <span className={`text-sm font-bold ${dailyProgress >= 100 ? 'text-green-500' : hasDailyTarget ? 'text-blue-500' : 'text-yellow-500'}`}>
            {hasDailyTarget ? `${dailyProgress.toFixed(0)}%` : 'Sem meta'}
          </span>
        </div>

        <div className={`w-full h-3 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
          <div
            className={`h-full transition-all duration-500 ${dailyProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${Math.min(dailyProgress, 100)}%` }}
          />
        </div>

        <p className={`text-xs mt-3 ${dailyProgress >= 100 ? 'text-green-500' : isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          {!hasDailyTarget
            ? 'Defina uma meta na página de Metas para acompanhar seu progresso.'
            : dailyProgress >= 100
            ? '🎉 Meta diária atingida!'
            : `Faltam ${money(missingToGoal)} para bater a meta de hoje.`}
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Vendas - Últimos 31 dias
          </h3>

          {hasSalesChartData ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesLast31Days}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="date" stroke={textColor} style={{ fontSize: '12px' }} />
                <YAxis stroke={textColor} style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: bgColor,
                    border: `1px solid ${gridColor}`,
                    borderRadius: '8px',
                    color: isDarkMode ? '#f1f5f9' : '#1e293b',
                  }}
                  formatter={(value) => money(value)}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Vendas"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className={`h-[300px] flex flex-col items-center justify-center text-center rounded-xl border border-dashed ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'}`}>
              <DollarSign className="w-10 h-10 mb-3 text-blue-500" />
              <p className="font-semibold">Sem vendas registradas ainda</p>
              <p className="text-sm mt-1">As vendas aparecerão aqui automaticamente.</p>
            </div>
          )}
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Fluxo de Caixa de Hoje
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} style={{ fontSize: '12px' }} />
              <YAxis stroke={textColor} style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: bgColor,
                  border: `1px solid ${gridColor}`,
                  borderRadius: '8px',
                  color: isDarkMode ? '#f1f5f9' : '#1e293b',
                }}
                formatter={(value) => money(value)}
              />
              <Legend />
              <Bar dataKey="entradas" fill="#10b981" name="Entradas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="saidas" fill="#ef4444" name="Saídas" radius={[8, 8, 0, 0]} />
              <Bar dataKey="lucro" fill="#3b82f6" name="Lucro" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Produtos Mais Vendidos
          </h3>

          {hasMostSoldProducts ? (
            <div className="space-y-4">
              {mostSoldProducts.map((product) => {
                const maxSold = Math.max(...mostSoldProducts.map((p) => p.sold));
                const width = maxSold > 0 ? (product.sold / maxSold) * 100 : 0;

                return (
                  <div key={product.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        {product.name}
                      </span>
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {product.sold}x
                      </span>
                    </div>

                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={`h-40 flex flex-col items-center justify-center text-center rounded-xl border border-dashed ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'}`}>
              <Package className="w-9 h-9 mb-3 text-blue-500" />
              <p className="font-semibold">Nenhum produto vendido ainda</p>
              <p className="text-sm mt-1">Quando houver vendas, os produtos mais vendidos aparecerão aqui.</p>
            </div>
          )}
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Estoque Baixo
          </h3>

          {lowStockProducts.length > 0 ? (
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-yellow-50'} flex items-center justify-between`}
                >
                  <div>
                    <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product.name}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {product.quantity} em estoque · mínimo {product.minQuantity}
                    </p>
                  </div>

                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${product.quantity === 0 ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {product.quantity === 0 ? 'Fora' : 'Baixo'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`h-40 flex flex-col items-center justify-center text-center rounded-xl border border-dashed ${isDarkMode ? 'border-slate-700 text-slate-400' : 'border-slate-300 text-slate-600'}`}>
              <Package className="w-9 h-9 mb-3 text-green-500" />
              <p className="font-semibold">Estoque saudável</p>
              <p className="text-sm mt-1">Nenhum produto está abaixo do mínimo.</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Ticket Médio
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {money(averageTicket)}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Produtos Cadastrados
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {products.length}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Margem de Lucro
          </p>
          <h3 className={`text-2xl font-display font-bold ${profitMargin >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {profitMargin.toFixed(1)}%
          </h3>
        </div>
      </div>
    </div>
  );
}