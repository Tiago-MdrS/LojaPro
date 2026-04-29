import React, { useEffect, useState } from 'react';
import { Target, Trash2, Calendar } from 'lucide-react';
import { useStore } from '../store';

const getBrasiliaDate = () => {
  return new Date().toLocaleDateString('en-CA', {
    timeZone: 'America/Sao_Paulo',
  });
};

export function Targets() {
  const {
    isDarkMode,
    targets,
    dailyTargets,
    updateTargets,
    setDailyTargetByDate,
    deleteDailyTargetByDate,
    getTotalRevenue,
    salesLast31Days,
    checkAndResetDailyData,
  } = useStore();

  const [customDate, setCustomDate] = useState('');
  const [customTarget, setCustomTarget] = useState('');
  const [dailyTargetInput, setDailyTargetInput] = useState(targets.daily || '');
  const [monthlyTargetInput, setMonthlyTargetInput] = useState(targets.monthly || '');

  useEffect(() => {
    checkAndResetDailyData();

    const interval = setInterval(() => {
      checkAndResetDailyData();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [checkAndResetDailyData]);

  const totalRevenue = getTotalRevenue();

  const monthlyRevenue = salesLast31Days.reduce(
    (acc, day) => acc + Number(day.total || 0),
    0
  ) + totalRevenue;

  const todayKey = getBrasiliaDate();
  const todayTarget = dailyTargets?.[todayKey] || targets.daily || 0;

  const formatMoney = (value) => Number(value || 0).toLocaleString('pt-BR');

  const formatDate = (date) =>
    new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');

  const calculateProgress = (achieved, target) => {
    if (!target || target <= 0) return 0;
    return (Number(achieved || 0) / Number(target || 0)) * 100;
  };

  const saveDefaultDailyTarget = () => {
    updateTargets(Number(dailyTargetInput) || 0, targets.monthly || 0);
  };

  const saveMonthlyTarget = () => {
    updateTargets(targets.daily || 0, Number(monthlyTargetInput) || 0);
  };

  const deleteDefaultDailyTarget = () => {
    updateTargets(0, targets.monthly || 0);
    setDailyTargetInput('');
  };

  const deleteMonthlyTarget = () => {
    updateTargets(targets.daily || 0, 0);
    setMonthlyTargetInput('');
  };

  const handleSaveCustomDailyTarget = () => {
    if (!customDate || !customTarget) return;

    setDailyTargetByDate(customDate, Number(customTarget));
    setCustomDate('');
    setCustomTarget('');
  };

  const goalCards = [
    {
      type: 'daily',
      label: dailyTargets?.[todayKey] ? 'Meta de Hoje' : 'Meta Diária',
      target: todayTarget,
      achieved: totalRevenue,
      progress: calculateProgress(totalRevenue, todayTarget),
      period: dailyTargets?.[todayKey]
        ? `Personalizada para ${formatDate(todayKey)}`
        : `Meta padrão de hoje (${formatDate(todayKey)})`,
      onDelete: dailyTargets?.[todayKey]
        ? () => deleteDailyTargetByDate(todayKey)
        : deleteDefaultDailyTarget,
    },
    {
      type: 'monthly',
      label: 'Meta Mensal',
      target: targets.monthly || 0,
      achieved: monthlyRevenue,
      progress: calculateProgress(monthlyRevenue, targets.monthly),
      period: 'Este mês',
      onDelete: deleteMonthlyTarget,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Metas
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Acompanhe metas diárias, mensais e metas personalizadas por data
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {goalCards.map((goal) => {
          const hasTarget = goal.target > 0;
          const isAchieved = hasTarget && goal.progress >= 100;
          const missing = Math.max(0, goal.target - goal.achieved);

          return (
            <div
              key={goal.type}
              className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className={`w-5 h-5 ${isAchieved ? 'text-green-500' : 'text-blue-500'}`} />
                    <h3 className={`text-xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {goal.label}
                    </h3>
                  </div>

                  <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {goal.period}
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-right">
                    <p className={`text-2xl font-display font-bold ${isAchieved ? 'text-green-500' : hasTarget ? 'text-blue-500' : 'text-yellow-500'}`}>
                      {hasTarget ? `${goal.progress.toFixed(1)}%` : 'Sem meta'}
                    </p>

                    {isAchieved && (
                      <p className="text-xs text-green-500 font-semibold mt-1">
                        ✓ Meta Atingida!
                      </p>
                    )}
                  </div>

                  {hasTarget && (
                    <button
                      onClick={goal.onDelete}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      title={`Apagar ${goal.label}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className={`w-full h-3 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'} rounded-full overflow-hidden mb-5`}>
                <div
                  className={`h-full transition-all duration-500 ${isAchieved ? 'bg-green-500' : 'bg-blue-500'}`}
                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase mb-1`}>
                    Atingido
                  </p>
                  <p className={`text-lg font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    R$ {formatMoney(goal.achieved)}
                  </p>
                </div>

                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase mb-1`}>
                    Meta
                  </p>
                  <p className={`text-lg font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {hasTarget ? `R$ ${formatMoney(goal.target)}` : 'Não definida'}
                  </p>
                </div>

                <div>
                  <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} uppercase mb-1`}>
                    Faltando
                  </p>
                  <p className={`text-lg font-display font-bold ${isAchieved ? 'text-green-500' : 'text-red-500'}`}>
                    {hasTarget ? `R$ ${formatMoney(missing)}` : '-'}
                  </p>
                </div>
              </div>

              <div
                className={`mt-4 p-3 rounded-lg border ${
                  isAchieved
                    ? 'bg-green-500/10 border-green-500'
                    : hasTarget
                    ? 'bg-blue-500/10 border-blue-500'
                    : 'bg-yellow-500/10 border-yellow-500'
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    isAchieved
                      ? 'text-green-500'
                      : hasTarget
                      ? 'text-blue-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {!hasTarget
                    ? `Nenhuma ${goal.label.toLowerCase()} foi definida ainda.`
                    : isAchieved
                    ? `🎉 Parabéns! Você atingiu sua ${goal.label.toLowerCase()}!`
                    : `Faltam R$ ${formatMoney(missing)} para atingir sua ${goal.label.toLowerCase()}.`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
        <h3 className={`text-xl font-display font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Configurações de Metas
        </h3>

        <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Edite as metas padrão e cadastre metas específicas para datas especiais.
        </p>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-500" />
              <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Meta Diária Padrão
              </h4>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="number"
                min="0"
                placeholder="Ex: 500"
                value={dailyTargetInput}
                onChange={(e) => setDailyTargetInput(e.target.value)}
                className={`flex-1 px-4 py-2 border rounded-lg outline-none ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-400'
                    : 'bg-white border-slate-300 text-gray-900'
                }`}
              />

              <button
                onClick={saveDefaultDailyTarget}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Salvar
              </button>

              <button
                onClick={deleteDefaultDailyTarget}
                disabled={!targets.daily}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  targets.daily
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Apagar
              </button>
            </div>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-xl p-4`}>
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-blue-500" />
              <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Meta do Mês
              </h4>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="number"
                min="0"
                placeholder="Ex: 10000"
                value={monthlyTargetInput}
                onChange={(e) => setMonthlyTargetInput(e.target.value)}
                className={`flex-1 px-4 py-2 border rounded-lg outline-none ${
                  isDarkMode
                    ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-400'
                    : 'bg-white border-slate-300 text-gray-900'
                }`}
              />

              <button
                onClick={saveMonthlyTarget}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Salvar
              </button>

              <button
                onClick={deleteMonthlyTarget}
                disabled={!targets.monthly}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  targets.monthly
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : isDarkMode
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Apagar
              </button>
            </div>
          </div>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-xl p-4 mt-6`}>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h4 className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Meta Personalizada por Dia
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className={`px-4 py-2 border rounded-lg outline-none ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-600 text-white'
                  : 'bg-white border-slate-300 text-gray-900'
              }`}
            />

            <input
              type="number"
              min="0"
              placeholder="Meta do dia"
              value={customTarget}
              onChange={(e) => setCustomTarget(e.target.value)}
              className={`px-4 py-2 border rounded-lg outline-none ${
                isDarkMode
                  ? 'bg-slate-800 border-slate-600 text-white placeholder:text-slate-400'
                  : 'bg-white border-slate-300 text-gray-900'
              }`}
            />

            <button
              onClick={handleSaveCustomDailyTarget}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Atualizar Meta do Dia
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {Object.keys(dailyTargets || {}).length === 0 ? (
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Nenhuma meta personalizada cadastrada.
              </p>
            ) : (
              Object.entries(dailyTargets)
                .sort(([a], [b]) => new Date(a) - new Date(b))
                .map(([date, value]) => (
                  <div
                    key={date}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isDarkMode ? 'bg-slate-800' : 'bg-white'
                    }`}
                  >
                    <div>
                      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formatDate(date)}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Meta: R$ {formatMoney(value)}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteDailyTargetByDate(date)}
                      className="flex items-center gap-2 text-red-400 hover:bg-red-500 hover:text-white px-3 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Apagar
                    </button>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
        <h3 className={`text-xl font-display font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Últimos 15 Dias
        </h3>

        <div className="space-y-3">
          {salesLast31Days.slice(0, 15).map((day, index) => {
            const dailyTarget = dailyTargets?.[day.date] || targets.daily || 0;
            const dayProgress = calculateProgress(day.total, dailyTarget);

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
                    R$ {formatMoney(day.total)}
                  </p>
                  <p className={`text-xs ${dayProgress >= 100 ? 'text-green-500' : 'text-slate-400'}`}>
                    {dailyTarget > 0 ? `${dayProgress.toFixed(0)}%` : 'Sem meta'}
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