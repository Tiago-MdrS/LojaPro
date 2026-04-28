import { create } from 'zustand';

export const useStore = create((set) => ({
  // Tema
  isDarkMode: true,
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Produtos
  products: [],

  // Vendas do dia
  salesToday: [],

  // Vendas dos últimos 31 dias
  salesLast31Days: [],

  // Despesas
  expenses: [],

  // Metas
  targets: {
    daily: 0,
    monthly: 0,
  },

  // Histórico de movimentações
  inventory: [],

  // Ações
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: Date.now() }],
    })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  addSale: (sale) =>
    set((state) => ({
      salesToday: [...state.salesToday, { ...sale, id: Date.now(), date: new Date().toISOString() }],
    })),

  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, { ...expense, id: Date.now(), date: new Date().toISOString() }],
    })),

  updateTargets: (daily, monthly) =>
    set({ targets: { daily, monthly } }),

  addInventoryMovement: (movement) =>
    set((state) => ({
      inventory: [...state.inventory, { ...movement, id: Date.now(), date: new Date().toISOString() }],
    })),

  // Cálculos
  getTotalRevenue: () => {
    const state = useStore.getState();
    return state.salesToday.reduce((acc, sale) => acc + sale.value, 0);
  },

  getTotalExpenses: () => {
    const state = useStore.getState();
    return state.expenses.reduce((acc, exp) => acc + exp.value, 0);
  },

  getNetProfit: () => {
    const state = useStore.getState();
    return state.getTotalRevenue() - state.getTotalExpenses();
  },

  getLowStockProducts: () => {
    const state = useStore.getState();
    return state.products.filter((p) => p.quantity <= p.minQuantity);
  },

  getMostSoldProducts: () => {
    const state = useStore.getState();
    const productSales = {};
    state.salesToday.forEach((sale) => {
      productSales[sale.productId] = (productSales[sale.productId] || 0) + sale.quantity;
    });
    return Object.entries(productSales)
      .map(([id, qty]) => {
        const product = state.products.find((p) => p.id === parseInt(id));
        return { ...product, sold: qty };
      })
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);
  },

  getAverageTicket: () => {
    const state = useStore.getState();
    if (state.salesToday.length === 0) return 0;
    return state.getTotalRevenue() / state.salesToday.length;
  },

  getTotalStock: () => {
    const state = useStore.getState();
    return state.products.reduce((acc, p) => acc + p.quantity, 0);
  },
}));