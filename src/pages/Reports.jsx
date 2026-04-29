import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { useStore } from '../store';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export function Reports() {
  const {
    isDarkMode,
    salesToday,
    salesLast31Days,
    expenses,
    targets,
    dailyTargets,
    getTotalExpenses,
    getNetProfit,
  } = useStore();

  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const money = (value) => Number(value || 0).toLocaleString('pt-BR');

  const getSaleDate = (sale) => {
    return sale.date ? sale.date.split('T')[0] : '';
  };

  const getSaleValue = (sale) => {
    return Number(sale.value ?? sale.total ?? 0);
  };

  const formatDate = (date) => {
    if (!date) return 'Sem data';
    return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');
  };

  const allSales = [...salesToday, ...salesLast31Days];

  const filteredSales = allSales.filter((sale) => {
    const saleDate = getSaleDate(sale);
    return saleDate >= dateRange.startDate && saleDate <= dateRange.endDate;
  });

  const filteredExpenses = expenses.filter((exp) => {
    const expDate = exp.date?.split('T')[0] || '';
    return expDate >= dateRange.startDate && expDate <= dateRange.endDate;
  });

  const totalRevenue = filteredSales.reduce((acc, sale) => acc + getSaleValue(sale), 0);
  const totalExpensesAmount = getTotalExpenses();
  const netProfit = getNetProfit();

  const goalsReport = Object.entries(
    filteredSales.reduce((acc, sale) => {
      const date = getSaleDate(sale);

      if (!date) return acc;

      acc[date] = (acc[date] || 0) + getSaleValue(sale);
      return acc;
    }, {})
  ).map(([date, achieved]) => {
    const target = dailyTargets?.[date] || targets.daily || 0;
    const completed = target > 0 && achieved >= target;

    return {
      date,
      achieved,
      target,
      status: target <= 0 ? 'Sem meta' : completed ? 'Cumprida' : 'Não cumprida',
      missing: Math.max(0, target - achieved),
    };
  });

  const completedGoals = goalsReport.filter((goal) => goal.status === 'Cumprida').length;
  const uncompletedGoals = goalsReport.filter((goal) => goal.status === 'Não cumprida').length;

  const exportToPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('RELATÓRIO DE VENDAS, DESPESAS E METAS', pageWidth / 2, yPosition, {
      align: 'center',
    });

    yPosition += 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(
      `Período: ${formatDate(dateRange.startDate)} a ${formatDate(dateRange.endDate)}`,
      pageWidth / 2,
      yPosition,
      { align: 'center' }
    );

    yPosition += 15;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('RESUMO FINANCEIRO', 20, yPosition);

    yPosition += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Receita Total: R$ ${money(totalRevenue)}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Despesas Total: R$ ${money(totalExpensesAmount)}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Lucro Líquido: R$ ${money(netProfit)}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Metas Cumpridas: ${completedGoals}`, 20, yPosition);
    yPosition += 6;
    doc.text(`Metas Não Cumpridas: ${uncompletedGoals}`, 20, yPosition);

    yPosition += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('VENDAS DO PERÍODO', 20, yPosition);
    yPosition += 6;

    const salesData = filteredSales.map((sale) => [
      formatDate(getSaleDate(sale)),
      sale.productName || sale.product || 'Venda',
      sale.quantity || 1,
      `R$ ${money(getSaleValue(sale))}`,
    ]);

    autoTable(doc, {
      head: [['Data', 'Produto', 'Qtd', 'Total']],
      body: salesData.length > 0 ? salesData : [['Nenhuma venda no período', '', '', '']],
      startY: yPosition,
      margin: { left: 20, right: 20 },
      styles: { font: 'helvetica', fontSize: 9 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    yPosition = doc.lastAutoTable?.finalY + 12 ?? 80;

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
      formatDate(exp.date?.split('T')[0]),
      `R$ ${money(exp.value)}`,
    ]);

    autoTable(doc, {
      head: [['Descrição', 'Data', 'Valor']],
      body: expenseData.length > 0 ? expenseData : [['Nenhuma despesa no período', '', '']],
      startY: yPosition,
      margin: { left: 20, right: 20 },
      styles: { font: 'helvetica', fontSize: 9 },
      headStyles: { fillColor: [192, 57, 43] },
    });

    yPosition = doc.lastAutoTable?.finalY + 12 ?? yPosition + 20;

    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('METAS DO PERÍODO', 20, yPosition);
    yPosition += 6;

    const goalsData = goalsReport.map((goal) => [
      formatDate(goal.date),
      `R$ ${money(goal.achieved)}`,
      goal.target > 0 ? `R$ ${money(goal.target)}` : 'Sem meta',
      goal.status,
      goal.missing > 0 ? `R$ ${money(goal.missing)}` : '-',
    ]);

    autoTable(doc, {
      head: [['Data', 'Atingido', 'Meta', 'Status', 'Faltou']],
      body: goalsData.length > 0 ? goalsData : [['Nenhuma meta no período', '', '', '', '']],
      startY: yPosition,
      margin: { left: 20, right: 20 },
      styles: { font: 'helvetica', fontSize: 9 },
      headStyles: { fillColor: [39, 174, 96] },
    });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(
      `Gerado em ${new Date().toLocaleString('pt-BR')}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );

    doc.save(`relatorio-${dateRange.startDate}.pdf`);
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();

    const salesSheet = XLSX.utils.json_to_sheet(
      filteredSales.map((sale) => ({
        Data: formatDate(getSaleDate(sale)),
        Produto: sale.productName || sale.product || 'Venda',
        Quantidade: sale.quantity || 1,
        Total: getSaleValue(sale),
      }))
    );

    const expensesSheet = XLSX.utils.json_to_sheet(
      filteredExpenses.map((exp) => ({
        Descrição: exp.description,
        Data: formatDate(exp.date?.split('T')[0]),
        Valor: exp.value,
      }))
    );

    const goalsSheet = XLSX.utils.json_to_sheet(
      goalsReport.map((goal) => ({
        Data: formatDate(goal.date),
        Atingido: goal.achieved,
        Meta: goal.target > 0 ? goal.target : 'Sem meta',
        Status: goal.status,
        Faltou: goal.missing,
      }))
    );

    const summarySheet = XLSX.utils.json_to_sheet([
      {
        Receita: totalRevenue,
        Despesas: totalExpensesAmount,
        Lucro: netProfit,
        'Metas Cumpridas': completedGoals,
        'Metas Não Cumpridas': uncompletedGoals,
      },
    ]);

    XLSX.utils.book_append_sheet(wb, summarySheet, 'Resumo');
    XLSX.utils.book_append_sheet(wb, salesSheet, 'Vendas');
    XLSX.utils.book_append_sheet(wb, expensesSheet, 'Despesas');
    XLSX.utils.book_append_sheet(wb, goalsSheet, 'Metas');

    XLSX.writeFile(wb, `relatorio-${dateRange.startDate}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className={`text-3xl font-display font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Relatórios
        </h1>
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Gere e exporte relatórios de vendas, despesas, lucros e metas
        </p>
      </div>

      <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border ${isDarkMode ? 'border-slate-700' : 'border-slate-200'} rounded-xl p-6`}>
        <h3 className={`text-lg font-display font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Filtrar por Período
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-xl p-6`}>
          <p className="text-sm text-slate-400 mb-2">Receita</p>
          <h3 className="text-xl font-bold text-green-500">
            R$ {money(totalRevenue)}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-xl p-6`}>
          <p className="text-sm text-slate-400 mb-2">Despesas</p>
          <h3 className="text-xl font-bold text-red-500">
            R$ {money(totalExpensesAmount)}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-xl p-6`}>
          <p className="text-sm text-slate-400 mb-2">Lucro</p>
          <h3 className={`text-xl font-bold ${netProfit >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
            R$ {money(netProfit)}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-xl p-6`}>
          <p className="text-sm text-slate-400 mb-2">Metas Cumpridas</p>
          <h3 className="text-xl font-bold text-green-500">
            {completedGoals}
          </h3>
        </div>

        <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} border rounded-xl p-6`}>
          <p className="text-sm text-slate-400 mb-2">Não Cumpridas</p>
          <h3 className="text-xl font-bold text-red-500">
            {uncompletedGoals}
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button onClick={exportToPDF} className="flex items-center gap-3 p-8 rounded-xl border-2 bg-red-500/10 border-red-500">
          <FileText className="w-8 h-8 text-red-500" />
          <div className="text-left">
            <p className="font-semibold">Exportar para PDF</p>
            <p className="text-sm text-slate-400">Relatório formatado em PDF</p>
          </div>
          <Download className="w-5 h-5 text-red-500 ml-auto" />
        </button>

        <button onClick={exportToExcel} className="flex items-center gap-3 p-8 rounded-xl border-2 bg-green-500/10 border-green-500">
          <FileText className="w-8 h-8 text-green-500" />
          <div className="text-left">
            <p className="font-semibold">Exportar para Excel</p>
            <p className="text-sm text-slate-400">Dados em planilha Excel</p>
          </div>
          <Download className="w-5 h-5 text-green-500 ml-auto" />
        </button>
      </div>
    </div>
  );
}