import React, { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { useStore } from '../store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export function Reports() {
  const {
    isDarkMode,
    products,
    salesToday,
    salesLast31Days,
    expenses,
    targets,
    getTotalRevenue,
    getTotalExpenses,
    getNetProfit,
  } = useStore();

  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  // Filtered data based on date range
  const filteredSales = salesLast31Days.filter((sale) => {
const saleDate = sale.date?.split('T')[0] || '';
    return saleDate >= dateRange.startDate && saleDate <= dateRange.endDate;
  });

  const filteredExpenses = expenses.filter((exp) => {
    const expDate = exp.date?.split('T')[0] || '';
    return expDate >= dateRange.startDate && expDate <= dateRange.endDate;
  });

  const totalRevenue = getTotalRevenue();
  const totalExpensesAmount = getTotalExpenses();
  const netProfit = getNetProfit();

  // Export to PDF
const exportToPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Header
  doc.setFont('helvetica', 'bold');   // ← helvetica, não Poppins
  doc.setFontSize(18);
  doc.text('RELATÓRIO DE VENDAS E DESPESAS', pageWidth / 2, yPosition, { align: 'center' });

  yPosition += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(
    `Período: ${dateRange.startDate} a ${dateRange.endDate}`,
    pageWidth / 2,
    yPosition,
    { align: 'center' }
  );

  // Resumo Financeiro
  yPosition += 15;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('RESUMO FINANCEIRO', 20, yPosition);

  yPosition += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Receita Total: R$ ${totalRevenue.toLocaleString('pt-BR')}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Despesas Total: R$ ${totalExpensesAmount.toLocaleString('pt-BR')}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Lucro Líquido: R$ ${netProfit.toLocaleString('pt-BR')}`, 20, yPosition);
  yPosition += 6;
  const margin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(2) : '0.00';
  doc.text(`Margem de Lucro: ${margin}%`, 20, yPosition);

  // Tabela de Vendas
  yPosition += 14;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('VENDAS DO PERÍODO', 20, yPosition);
  yPosition += 6;

  const salesData = filteredSales.map((sale) => [
    sale.date.split('T')[0],
    `R$ ${sale.total.toLocaleString('pt-BR')}`,
  ]);

  autoTable(doc, {                  // ← autoTable como função separada
    head: [['Data', 'Total']],
    body: salesData.length > 0 ? salesData : [['Nenhuma venda no período', '']],
    startY: yPosition,
    margin: { left: 20, right: 20 },
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [41, 128, 185] },
  });

yPosition = doc.lastAutoTable?.finalY + 12 ?? 80;
  // Tabela de Despesas
  if (yPosition > pageHeight - 50) {
    doc.addPage();
    yPosition = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DESPESAS DO PERÍODO', 20, yPosition);
  yPosition += 6;

  const expenseData = filteredExpenses.map((exp) => [
    exp.description,
    new Date(exp.date).toLocaleDateString('pt-BR'),
    `R$ ${exp.value.toLocaleString('pt-BR')}`,
  ]);

  autoTable(doc, {
    head: [['Descrição', 'Data', 'Valor']],
    body: expenseData.length > 0 ? expenseData : [['Nenhuma despesa no período', '', '']],
    startY: yPosition,
    margin: { left: 20, right: 20 },
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [192, 57, 43] },
  });

  // Rodapé
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    `Gerado em ${new Date().toLocaleString('pt-BR')}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: 'center' }
  );

  doc.save(`relatorio-vendas-${dateRange.startDate}.pdf`);
};
const exportToExcel = () => {
  const wb = XLSX.utils.book_new();

  const salesSheet = XLSX.utils.json_to_sheet(
    filteredSales.map((sale) => ({
      Data: sale.date.split('T')[0],
      Total: sale.total,
    }))
  );

  const expensesSheet = XLSX.utils.json_to_sheet(
    filteredExpenses.map((exp) => ({
      Descrição: exp.description,
      Data: new Date(exp.date).toLocaleDateString('pt-BR'),
      Valor: exp.value,
    }))
  );

  XLSX.utils.book_append_sheet(wb, salesSheet, 'Vendas');
  XLSX.utils.book_append_sheet(wb, expensesSheet, 'Despesas');

  XLSX.writeFile(wb, `relatorio-${dateRange.startDate}.xlsx`);
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Relatórios
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Gere e exporte relatórios de vendas, despesas e lucros
        </p>
      </div>

      {/* Date Range Filter */}
      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
        <h3 className={`text-lg font-display font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Filtrar por Período
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Data Inicial
            </label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-slate-300 text-gray-900'
              }`}
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Data Final
            </label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg ${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600 text-white'
                  : 'bg-white border-slate-300 text-gray-900'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Receita Total
          </p>
          <h3 className={`text-2xl font-display font-bold text-green-500`}>
            R$ {totalRevenue.toLocaleString('pt-BR')}
          </h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Despesas Total
          </p>
          <h3 className={`text-2xl font-display font-bold text-red-500`}>
            R$ {totalExpensesAmount.toLocaleString('pt-BR')}
          </h3>
        </div>
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} mb-2`}>
            Lucro Líquido
          </p>
          <h3 className={`text-2xl font-display font-bold ${netProfit >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
            R$ {netProfit.toLocaleString('pt-BR')}
          </h3>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={exportToPDF}
          className={`flex items-center justify-center gap-3 p-8 rounded-xl border-2 transition-all ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700 hover:border-red-500 hover:bg-red-500 hover:bg-opacity-10'
              : 'bg-white border-slate-200 hover:border-red-500 hover:bg-red-50'
          }`}
        >
          <div>
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <div className="text-left">
            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Exportar para PDF
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Relatório formatado em PDF
            </p>
          </div>
          <Download className="w-5 h-5 text-red-500 ml-auto" />
        </button>

        <button
          onClick={exportToExcel}
          className={`flex items-center justify-center gap-3 p-8 rounded-xl border-2 transition-all ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700 hover:border-green-500 hover:bg-green-500 hover:bg-opacity-10'
              : 'bg-white border-slate-200 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          <div>
            <FileText className="w-8 h-8 text-green-500" />
          </div>
          <div className="text-left">
            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Exportar para Excel
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Dados em planilha Excel
            </p>
          </div>
          <Download className="w-5 h-5 text-green-500 ml-auto" />
        </button>
      </div>

      {/* Data Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Preview */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <h3 className={`text-lg font-display font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Vendas do Período
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredSales.map((sale, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}
              >
                <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {sale.date.split('T')[0]}
                </span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  R$ {sale.total.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses Preview */}
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
          <h3 className={`text-lg font-display font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Despesas do Período
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {filteredExpenses.map((expense, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                }`}
              >
                <div>
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {expense.description}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {new Date(expense.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span className={`font-semibold text-red-500`}>
                  -R$ {expense.value.toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
