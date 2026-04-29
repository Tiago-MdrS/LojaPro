import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useStore } from '../store';

export function Sales() {
  const {
    isDarkMode,
    products,
    salesToday,
    addSale,
    deleteSale,
    getTotalRevenue,
  } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [saleToCancel, setSaleToCancel] = useState(null);

  const [formData, setFormData] = useState({
    productId: products[0]?.id || '',
    quantity: 1,
  });

  const handleAddSale = (e) => {
    e.preventDefault();

    const product = products.find((p) => p.id === Number(formData.productId));
    const quantity = Number(formData.quantity || 1);

    if (!product) return;

    addSale({
      productId: Number(formData.productId),
      quantity,
      value: Number(product.price || 0) * quantity,
    });

    setFormData({
      productId: products[0]?.id || '',
      quantity: 1,
    });

    setShowModal(false);
  };

  const handleCancelSale = () => {
    if (!saleToCancel) return;

    deleteSale(saleToCancel.id);
    setShowCancelModal(false);
    setSaleToCancel(null);
  };

  const totalRevenue = getTotalRevenue();

  return (
    <div className="space-y-6">
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
          onClick={() => {
            setFormData({
              productId: products[0]?.id || '',
              quantity: 1,
            });
            setShowModal(true);
          }}
          disabled={products.length === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            products.length === 0
              ? 'bg-slate-500 cursor-not-allowed text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Plus className="w-5 h-5" />
          Nova Venda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Total de Vendas
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Transações
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {salesToday.length}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Ticket Médio
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            R$ {(totalRevenue / (salesToday.length || 1)).toLocaleString('pt-BR')}
          </h3>
        </div>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl overflow-hidden`}>
        {salesToday.length === 0 ? (
          <div className="p-10 text-center">
            <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Nenhuma venda registrada hoje.
            </p>
          </div>
        ) : (
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
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {salesToday.map((sale) => {
                  const product = products.find((p) => Number(p.id) === Number(sale.productId));
                  const unitPrice = sale.quantity > 0 ? Number(sale.value || 0) / Number(sale.quantity || 1) : product?.price || 0;

                  return (
                    <tr
                      key={sale.id}
                      className={`border-b ${isDarkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'} transition-colors`}
                    >
                      <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {sale.productName || product?.name || 'Produto removido'}
                      </td>

                      <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {sale.quantity}
                      </td>

                      <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        R$ {Number(unitPrice || 0).toLocaleString('pt-BR')}
                      </td>

                      <td className={`px-6 py-4 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        R$ {Number(sale.value || 0).toLocaleString('pt-BR')}
                      </td>

                      <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {new Date(sale.date).toLocaleTimeString('pt-BR')}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSaleToCancel(sale);
                            setShowCancelModal(true);
                          }}
                          className="p-2 rounded-lg text-yellow-400 hover:bg-yellow-500 hover:text-white transition-colors"
                          title="Cancelar venda"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-8 w-full max-w-md`}>
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
                  required
                >
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - R$ {Number(product.price || 0).toLocaleString('pt-BR')} | Estoque: {product.quantity}
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
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Total
                </label>

                <div className={`px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600' : 'bg-slate-100 border-slate-300'}`}>
                  <p className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    R$ {(
                      (products.find((p) => Number(p.id) === Number(formData.productId))?.price || 0) *
                      Number(formData.quantity || 0)
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

      {showCancelModal && saleToCancel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border p-6 rounded-xl w-full max-w-md`}>
            <h2 className="text-xl font-bold mb-3 text-yellow-500">
              Cancelar Venda
            </h2>

            <p className={`${isDarkMode ? 'text-slate-300' : 'text-gray-700'} mb-4`}>
              Tem certeza que deseja cancelar esta venda? O estoque será devolvido automaticamente.
            </p>

            <div className={`${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'} p-4 rounded-lg mb-4 space-y-1`}>
              <p className={isDarkMode ? 'text-slate-200' : 'text-gray-800'}>
                <strong>Produto:</strong> {saleToCancel.productName || 'Produto'}
              </p>
              <p className={isDarkMode ? 'text-slate-200' : 'text-gray-800'}>
                <strong>Quantidade:</strong> {saleToCancel.quantity}
              </p>
              <p className={isDarkMode ? 'text-slate-200' : 'text-gray-800'}>
                <strong>Valor:</strong> R$ {Number(saleToCancel.value || 0).toLocaleString('pt-BR')}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSaleToCancel(null);
                }}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-gray-900'
                }`}
              >
                Voltar
              </button>

              <button
                onClick={handleCancelSale}
                className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition-colors"
              >
                Cancelar Venda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}