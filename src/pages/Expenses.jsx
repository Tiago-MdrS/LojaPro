import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store';

export function Expenses() {
  const {
    isDarkMode,
    expenses,
    addExpense,
    getTotalExpenses,
  } = useStore();

  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    value: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addExpense({
      description: formData.description,
      value: Number(formData.value),
    });

    setFormData({ description: '', value: '' });
    setShowModal(false);
  };

  const total = getTotalExpenses();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Despesas
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Controle seus gastos
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          <Plus className="w-5 h-5" />
          Nova Despesa
        </button>
      </div>

      {/* Total */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-xl p-6`}>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Total de Despesas
        </p>
        <h2 className="text-2xl font-bold text-red-500">
          R$ {total.toLocaleString('pt-BR')}
        </h2>
      </div>

      {/* Lista */}
      {expenses.length === 0 ? (
        <div className="text-center py-10 text-slate-400">
          Nenhuma despesa cadastrada
        </div>
      ) : (
        <div className="space-y-3">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-lg p-4 flex justify-between`}
            >
              <div>
                <p className="font-semibold">{exp.description}</p>
                <p className="text-xs text-slate-400">
                  {new Date(exp.date).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <span className="text-red-500 font-bold">
                R$ {exp.value.toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
            } border p-6 rounded-xl w-full max-w-md`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Nova Despesa
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Descrição */}
              <input
                type="text"
                placeholder="Descrição"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg outline-none ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400'
                    : 'bg-white border-slate-300 text-gray-900 placeholder:text-slate-500'
                }`}
                required
              />

              {/* Valor */}
              <input
                type="number"
                placeholder="Valor"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg outline-none ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400'
                    : 'bg-white border-slate-300 text-gray-900 placeholder:text-slate-500'
                }`}
                required
              />

              {/* Botões */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                    isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-gray-900'
                  }`}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}