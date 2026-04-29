import React, { useState } from 'react';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { useStore } from '../store';

export function Expenses() {
  const {
    isDarkMode,
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    getTotalExpenses,
  } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [formData, setFormData] = useState({
    description: '',
    value: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingExpense) {
      updateExpense(editingExpense.id, {
        description: formData.description,
        value: Number(formData.value),
      });
    } else {
      addExpense({
        description: formData.description,
        value: Number(formData.value),
      });
    }

    setFormData({ description: '', value: '' });
    setEditingExpense(null);
    setShowModal(false);
  };

  const handleEdit = (exp) => {
    setEditingExpense(exp);
    setFormData({
      description: exp.description,
      value: exp.value,
    });
    setShowModal(true);
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
          onClick={() => {
            setEditingExpense(null);
            setFormData({ description: '', value: '' });
            setShowModal(true);
          }}
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
              className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-lg p-4 flex justify-between items-center`}
            >
              <div>
                <p className="font-semibold">{exp.description}</p>
                <p className="text-xs text-slate-400">
                  {new Date(exp.date).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-red-500 font-bold">
                  R$ {exp.value.toLocaleString('pt-BR')}
                </span>

                {/* Botões */}
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteExpense(exp.id)}
                  className="p-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
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
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {editingExpense ? 'Editar Despesa' : 'Nova Despesa'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Descrição"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-slate-300 text-gray-900'
                }`}
                required
              />

              <input
                type="number"
                placeholder="Valor"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                className={`w-full px-4 py-2 border rounded-lg ${
                  isDarkMode
                    ? 'bg-slate-700 border-slate-600 text-white'
                    : 'bg-white border-slate-300 text-gray-900'
                }`}
                required
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-400 text-white p-2 rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white p-2 rounded-lg"
                >
                  {editingExpense ? 'Atualizar' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}