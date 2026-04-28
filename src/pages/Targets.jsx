import React, { useState } from 'react';
import { Target, TrendingUp, Calendar } from 'lucide-react';
import { useStore } from '../store';

export function Targets() {
  const {
    isDarkMode,
    targets,
    updateTargets,
    getTotalRevenue,
    salesLast31Days,
  } = useStore();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    daily: targets.daily,
    monthly: targets.monthly,
  });

  const handleSave = () => {
    updateTargets(formData.daily, formData.monthly);
    setEditMode(false);
  };

  const totalRevenue = getTotalRevenue();
  const monthlyRevenue = salesLast31Days.reduce((acc, day) => acc + day.total, 0);
  const dailyProgress = (totalRevenue / targets.daily) * 100;
  const monthlyProgress = (monthlyRevenue / targets.monthly) * 100;

  const stats = [
    {
      label: 'Meta Diária',
      target: targets.daily,
      achieved: totalRevenue,
      progress: dailyProgress,
      period: 'Hoje',
    },
    {
      label: 'Meta Mensal',
      target: targets.monthly,
      achieved: monthlyRevenue,
      progress: monthlyProgress,
      period: 'Este Mês',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Metas
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Acompanhe e configure suas metas de vendas
          </p>
        </div>
        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Target className="w-5 h-5" />
            Editar Metas
          </button>
        )}
      </div>

      {/* Edit Form */}
      {editMode && (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-8`}>
          <h2 className={`text-2xl font-display font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Configurar Metas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Meta Diária (R$)
              </label>
              <input
                type="number"
                value={formData.daily}
                onChange={(e) => setFormData({ ...formData, daily: parseFloat(e.target.value) })}
                className={`w-full px-4 py-2 border rounded-lg ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-slate-300 text-gray-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Meta Mensal (R$)
              </label>
              <input
                type="number"
                value={formData.monthly}
                onChange={(e) => setFormData({ ...formData, monthly: parseFloat(e.target.value) })}
                className={`w-full px-4 py-2 border rounded-lg ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-slate-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setEditMode(false)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-slate-200 hover:bg-slate-300 text-gray-900'
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Salvar Metas
            </button>
          </div>
        </div>
      )}

      {/* Goals Progress */}
      <div className="space-y-6">
        {stats.map((stat, index) => {
          const isAchieved = stat.progress >= 100;
          return (
            <div
              key={index}
              className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6 ${isAchieved ? (isDarkMode ? 'border-green-500' : 'border-green-300 bg-green-50') : ''}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className={`w-5 h-5 ${isAchieved ? 'text-green-500' : 'text-blue-500'}`} />
                    <h3 className={`text-xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {stat.label}
                    </h3>
                  </div>
                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {stat.period}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-display font-bold ${isAchieved ? 'text-green-500' : 'text-blue-500'}`}>
                    {stat.progress.toFixed(1)}%
                  </p>
                  {isAchieved && (
                    <p className="text-xs text-green-500 font-semibold mt-1">✓ Meta Atingida!</p>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className={`w-full h-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                  <div
                    className={`h-full transition-all duration-500 ${
                      isAchieved ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(stat.progress, 100)}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase mb-1`}>
                    Atingido
                  </p>
                  <p className={`text-xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    R$ {stat.achieved.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase mb-1`}>
                    Meta
                  </p>
                  <p className={`text-xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    R$ {stat.target.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase mb-1`}>
                    Faltando
                  </p>
                  <p className={`text-xl font-display font-bold ${stat.progress >= 100 ? 'text-green-500' : 'text-red-500'}`}>
                    R$ {Math.max(0, stat.target - stat.achieved).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              {/* Status Message */}
              <div className={`mt-4 p-4 rounded-lg ${isAchieved ? (isDarkMode ? 'bg-green-500 bg-opacity-10 border border-green-500' : 'bg-green-100 border border-green-300') : (isDarkMode ? 'bg-blue-500 bg-opacity-10 border border-blue-500' : 'bg-blue-100 border border-blue-300')}`}>
                <p className={`text-sm font-medium ${isAchieved ? 'text-green-500' : 'text-blue-500'}`}>
                  {isAchieved
                    ? `🎉 Parabéns! Você atingiu sua meta de ${stat.label.toLowerCase()}!`
                    : `Você precisa de R$ ${(stat.target - stat.achieved).toLocaleString('pt-BR')} para atingir sua meta de ${stat.label.toLowerCase()}.`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Breakdown */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
        <h3 className={`text-xl font-display font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Últimos 15 Dias
        </h3>
        <div className="space-y-3">
          {salesLast31Days.slice(0, 15).map((day, index) => {
            const dayProgress = (day.total / targets.daily) * 100;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24">
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {day.date}
                  </p>
                </div>
                <div className="flex-1">
                  <div className={`h-2 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden`}>
                    <div
                      className={`h-full ${dayProgress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                      style={{ width: `${Math.min(dayProgress, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="w-32 text-right">
                  <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    R$ {day.total.toLocaleString('pt-BR')}
                  </p>
                  <p className={`text-xs ${dayProgress >= 100 ? 'text-green-500' : 'text-slate-400'}`}>
                    {dayProgress.toFixed(0)}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
