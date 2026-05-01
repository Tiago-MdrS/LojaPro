import React, { useState } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle, Filter } from 'lucide-react';
import { useStore } from '../store';

const CATEGORIES = [
  { id: 'all', label: 'Todos',  },
  { id: 'camisas', label: 'Camisas',  },
  { id: 'shorts', label: 'Shorts',  },
  { id: 'calcas', label: 'Calças',  },
  { id: 'vestidos', label: 'Vestidos',  },
  { id: 'casacos', label: 'Casacos',  },
  { id: 'bones', label: 'Bonés',  },
  { id: 'oculos', label: 'Óculos',  },
  { id: 'meias', label: 'Meias',  },
  { id: 'tenis', label: 'Tênis',  },
  { id: 'sapatos', label: 'Sapatos',  },
  { id: 'sandalia', label: 'Sandálias',  },
  { id: 'bolsas', label: 'Bolsas',  },
  { id: 'cintos', label: 'Cintos',  },
  { id: 'relogios', label: 'Relógios',  },
  { id: 'bijuterias', label: 'Bijuterias',  },
  { id: 'moda_praia', label: 'Moda Praia',  },
  { id: 'outros', label: 'Outros',  },
];

const SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'Único'];

function getCategoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id) || { label: id, emoji: '📦' };
}

export function Inventory() {
  const {
    isDarkMode,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getTotalStock,
    getLowStockProducts,
  } = useStore();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    category: 'camisas',
    size: 'M',
    color: '',
    price: 0,
    quantity: 0,
    minQuantity: 5,
    sku: '',
  });

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        category: product.category || 'outros',
        size: product.size || 'Único',
        color: product.color || '',
        price: product.price,
        quantity: product.quantity,
        minQuantity: product.minQuantity,
        sku: product.sku || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        category: 'camisas',
        size: 'M',
        color: '',
        price: 0,
        quantity: 0,
        minQuantity: 5,
        sku: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
    } else {
      addProduct(formData);
    }
    setShowModal(false);
  };

  const lowStockProducts = getLowStockProducts();
  const totalStock = getTotalStock();

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Count per category for badges
  const countByCategory = (catId) =>
    catId === 'all'
      ? products.length
      : products.filter((p) => p.category === catId).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Estoque
          </h1>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Gerencie peças e quantidades
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          {products.length === 0 ? 'Nova Peça' : 'Cadastrar Mais'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Total de Peças
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {products.length}
          </h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Estoque Total
          </p>
          <h3 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {totalStock} unidades
          </h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6 ${lowStockProducts.length > 0 ? (isDarkMode ? 'bg-slate-800 border-yellow-500' : 'bg-yellow-50 border-yellow-500') : ''}`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2 flex items-center gap-2`}>
            {lowStockProducts.length > 0 && <AlertTriangle className="w-4 h-4 text-yellow-500" />}
            Estoque Baixo
          </p>
          <h3 className={`text-2xl font-display font-bold ${lowStockProducts.length > 0 ? 'text-yellow-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {lowStockProducts.length}
          </h3>
        </div>
      </div>

      {/* Category Filter */}
      <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-4`}>
        <div className="flex items-center gap-2 mb-3">
          <Filter className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
          <span className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            Filtrar por Categoria
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const count = countByCategory(cat.id);
            if (cat.id !== 'all' && count === 0) return null;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600'
                    : isDarkMode
                    ? 'bg-slate-700 text-slate-300 border-slate-600 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-blue-500 text-white' : isDarkMode ? 'bg-slate-600 text-slate-400' : 'bg-slate-200 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Products Table / Empty State */}
      {products.length === 0 ? (
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-12 flex flex-col items-center justify-center text-center`}>
          <div className="text-5xl mb-4">👕</div>
          <h2 className={`text-xl font-display font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Nenhuma peça cadastrada ainda
          </h2>
          <p className={`text-sm max-w-md mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Comece adicionando sua primeira peça para controlar categorias, tamanhos, cores, preços e alertas de estoque baixo.
          </p>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Cadastrar Primeira Peça
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-xl p-10 flex flex-col items-center justify-center text-center`}>
          <div className="text-4xl mb-3">{getCategoryLabel(selectedCategory).emoji}</div>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Nenhuma peça na categoria <strong>{getCategoryLabel(selectedCategory).label}</strong>.
          </p>
        </div>
      ) : (
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-slate-700 bg-slate-700' : 'border-slate-200 bg-slate-50'}`}>
                  {['Peça', 'Categoria', 'Tam.', 'Cor', 'Preço', 'Qtd.', 'Mínimo', 'Status', 'Ações'].map((h) => (
                    <th key={h} className={`px-4 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const cat = getCategoryLabel(product.category || 'outros');
                  return (
                    <tr
                      key={product.id}
                      className={`border-b ${isDarkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'} transition-colors`}
                    >
                      <td className={`px-4 py-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {product.name}
                        {product.sku && (
                          <span className={`block text-xs mt-0.5 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            #{product.sku}
                          </span>
                        )}
                      </td>

                      <td className={`px-4 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        <span className="flex items-center gap-1">
                          <span>{cat.emoji}</span>
                          <span>{cat.label}</span>
                        </span>
                      </td>

                      <td className={`px-4 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {product.size || '—'}
                      </td>

                      <td className={`px-4 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {product.color ? (
                          <span className="flex items-center gap-1.5">
                            <span
                              className="w-3 h-3 rounded-full border border-slate-300 inline-block"
                              style={{ background: product.color }}
                            />
                            <span>{product.color}</span>
                          </span>
                        ) : '—'}
                      </td>

                      <td className={`px-4 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>

                      <td className={`px-4 py-4 text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {product.quantity}
                      </td>

                      <td className={`px-4 py-4 text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {product.minQuantity}
                      </td>

                      <td className="px-4 py-4">
                        {product.quantity === 0 ? (
                          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Sem Estoque
                          </span>
                        ) : product.quantity <= product.minQuantity ? (
                          <span className="inline-block bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Baixo
                          </span>
                        ) : (
                          <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            OK
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-4 flex gap-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-600 text-slate-300' : 'hover:bg-slate-200 text-slate-600'}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 rounded-lg hover:bg-red-500 hover:text-white text-slate-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {editingId ? 'Editar Peça' : 'Nova Peça'}
              </h2>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Nome da Peça
                </label>
                <input
                  type="text"
                  placeholder="Ex: Camisa Polo Masculina"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-gray-900'}`}
                  required
                />
              </div>

              {/* Categoria */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Categoria
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-gray-900'}`}
                  required
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tamanho + Cor */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Tamanho
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-gray-900'}`}
                  >
                    {SIZES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Cor (opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Azul Marinho"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-gray-900'}`}
                  />
                </div>
              </div>

              {/* SKU */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Código / SKU (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: CAM-001"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-gray-900'}`}
                />
              </div>

              {/* Preço */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-gray-900'}`}
                  required
                />
              </div>

              {/* Quantidade + Mínimo */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Quantidade
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-gray-900'}`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                    Qtd. Mínima
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minQuantity}
                    onChange={(e) => setFormData({ ...formData, minQuantity: parseInt(e.target.value) })}
                    className={`w-full px-4 py-2 border rounded-lg ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300 text-gray-900'}`}
                    required
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-gray-900'}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingId ? 'Atualizar' : 'Cadastrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}