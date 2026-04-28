import React, { useState } from 'react';
import { Plus, X, DollarSign } from 'lucide-react';
import { useStore } from '../store';

export function Sales() {
  const {
    isDarkMode,
    products,
    salesToday,
    addSale,
    getTotalRevenue,
  } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    productId: products[0]?.id,
    quantity: 1,
  });

  const handleAddSale = (e) => {
    e.preventDefault();
    const product = products.find((p) => p.id === parseInt(formData.productId));
    if (product) {
      addSale({
        productId: parseInt(formData.productId),
        quantity: parseInt(formData.quantity),
        value: product.price * parseInt(formData.quantity),
      });
      setFormData({
        productId: products[0]?.id,
        quantity: 1,
      });
      setShowModal(false);
    }
  };

  const totalRevenue = getTotalRevenue();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Vendas
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Gerenciar e registrar vendas do dia
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Venda
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Total de Vendas
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Transações
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {salesToday.length}
          </h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Ticket Médio
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            R$ {(totalRevenue / (salesToday.length || 1)).toLocaleString('pt-BR')}
          </h3>
        </div>
      </div>

      {/* Sales Table */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Produto
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Quantidade
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Valor Unitário
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Total
                </th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Hora
                </th>
              </tr>
            </thead>
            <tbody>
              {salesToday.map((sale) => {
                const product = products.find((p) => p.id === sale.productId);
                return (
                  <tr
                    key={sale.id}
                    className={`border-b ${isDarkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'} transition-colors`}
                  >
                    <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {product?.name}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {sale.quantity}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      R$ {(product?.price || 0).toLocaleString('pt-BR')}
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      R$ {sale.value.toLocaleString('pt-BR')}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {new Date(sale.date).toLocaleTimeString('pt-BR')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-8 w-full max-w-md`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Registrar Venda
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSale} className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Produto
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-slate-300 text-gray-900'
                  }`}
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - R$ {product.price.toLocaleString('pt-BR')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Quantidade
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-slate-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Total
                </label>
                <div className={`px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-300'}`}>
                  <p className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    R$ {(
                      (products.find((p) => p.id === parseInt(formData.productId))?.price || 0) *
                      parseInt(formData.quantity)
                    ).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
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
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
