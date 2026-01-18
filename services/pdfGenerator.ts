
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CalcResults, InvestmentState } from '../types.ts';
import { formatCurrency, formatPercent } from '../utils/formatters.ts';

export const generatePDFReport = async (
  results: CalcResults,
  inputs: InvestmentState
) => {
  const doc = new jsPDF();
  const now = new Date();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Formatação para exibição e nome do arquivo
  const pad = (n: number) => n.toString().padStart(2, '0');
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  
  const fullDateDisplay = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  
  // Nome do arquivo: Relatorio-Bets-Calc-Pro-17012026-200703
  const fileTimestamp = `${day}${month}${year}-${hours}${minutes}${seconds}`;
  const fileName = `Relatorio-Bets-Calc-Pro-${fileTimestamp}.pdf`;

  // Cabeçalho persistente
  const drawHeader = (docInstance: jsPDF) => {
    docInstance.setFont("helvetica", "bold");
    docInstance.setFontSize(8);
    docInstance.setTextColor(140, 140, 140);
    
    docInstance.text("Bet's Calc Pro - Relatório Gerencial", 15, 10);
    
    docInstance.setFont("helvetica", "normal");
    const dateTextWidth = docInstance.getTextWidth(fullDateDisplay);
    docInstance.text(fullDateDisplay, pageWidth - 15 - dateTextWidth, 10);
    
    docInstance.setDrawColor(230, 230, 230);
    docInstance.setLineWidth(0.1);
    docInstance.line(15, 12, pageWidth - 15, 12);
  };

  // Branding com logo corrigida (Seta sem distorção)
  const drawBranding = (docInstance: jsPDF) => {
    const startY = 20;
    
    // Fundo da Logo
    docInstance.setFillColor(0, 107, 61);
    docInstance.roundedRect(15, startY, 14, 14, 3, 3, "F");
    
    // Gráfico de Seta (Correção de proporção)
    docInstance.setDrawColor(251, 238, 35);
    docInstance.setLineWidth(0.8);
    docInstance.setLineCap("round");
    docInstance.setLineJoin("round");

    // Traçado da linha de crescimento (x, y)
    docInstance.line(17.5, startY + 11, 20.5, startY + 7); 
    docInstance.line(20.5, startY + 7, 23.5, startY + 10); 
    docInstance.line(23.5, startY + 10, 27, startY + 3.5); 

    // Ponta da seta (Triângulo aberto/Ponta)
    docInstance.line(24.5, startY + 3.5, 27, startY + 3.5); 
    docInstance.line(27, startY + 3.5, 27, startY + 6); 

    // Texto do Título
    docInstance.setFont("helvetica", "bold");
    docInstance.setFontSize(22);
    docInstance.setTextColor(0, 107, 61);
    docInstance.text("Bet's Calc Pro", 33, startY + 9);
    
    docInstance.setFontSize(9);
    docInstance.setTextColor(160, 160, 160);
    docInstance.text("INTELIGÊNCIA EM GESTÃO DE BANCA", 33, startY + 13);
    
    return startY + 22;
  };

  drawHeader(doc);
  let currentY = drawBranding(doc);

  // Inputs
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("Configuração da Simulação:", 15, currentY);
  
  autoTable(doc, {
    startY: currentY + 3,
    body: [
      [`Banca Inicial: ${inputs.initialInvestment}`, `Odd Média Alvo: ${inputs.averageOdd}%`],
      [`Meta de Ciclo: ${inputs.numberOfGames} jogos`, `Tipo: Progressão Acumulada`]
    ],
    theme: 'plain',
    styles: { cellPadding: 2, fontSize: 10, font: "helvetica" },
  });

  currentY = (doc as any).lastAutoTable.finalY + 10;

  // Análise Estratégica (Simplificada conforme pedido)
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 107, 61);
  doc.text("Análise Estratégica de Performance:", 15, currentY);
  currentY += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);

  const numGames = parseInt(inputs.numberOfGames) || 1;
  const avgProfitPerGame = results.totalReturns / numGames;

  // Apenas uma linha conforme solicitado
  doc.text(`• Lucro médio estimado por operação: ${formatCurrency(avgProfitPerGame)}.`, 20, currentY);
  currentY += 12;

  // Tabela Principal
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("Detalhamento Jogo a Jogo:", 15, currentY);

  autoTable(doc, {
    startY: currentY + 5,
    head: [['Jogo', 'Odd Dec.', 'Odd (%)', 'Saldo Acumulado', 'Lucro Acum.']],
    body: results.progression.map(row => [
      row.game.toString(),
      (1 + row.odd / 100).toFixed(2),
      `${row.odd}%`,
      formatCurrency(row.balance),
      formatCurrency(row.returns)
    ]),
    headStyles: { fillColor: [0, 107, 61], halign: 'center' },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { halign: 'center', cellWidth: 25 },
      2: { halign: 'center', cellWidth: 25 },
      3: { halign: 'right' },
      4: { halign: 'right' }
    },
    alternateRowStyles: { fillColor: [245, 250, 247] },
    margin: { top: 20, bottom: 20 },
    didDrawPage: (data) => {
      drawHeader(doc);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("© 2026 Bet's Calc Pro by André Miranda", 15, doc.internal.pageSize.getHeight() - 10);
      const pageText = `Página ${data.pageNumber}`;
      doc.text(pageText, pageWidth - 15 - doc.getTextWidth(pageText), doc.internal.pageSize.getHeight() - 10);
    }
  });

  // Levantamento Final
  currentY = (doc as any).lastAutoTable.finalY + 15;
  if (currentY + 50 > doc.internal.pageSize.getHeight()) {
    doc.addPage();
    currentY = 25;
  }

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Levantamento Final dos Resultados:", 15, currentY);
  
  autoTable(doc, {
    startY: currentY + 6,
    body: [
      [`Valor Inicial:`, inputs.initialInvestment],
      [`Valor Final de Banca:`, formatCurrency(results.finalValue)],
      [`Total de Lucro Líquido:`, formatCurrency(results.totalReturns)],
      [`ROI (Retorno Total):`, formatPercent(results.rentability)]
    ],
    theme: 'grid',
    styles: { cellPadding: 2.5, fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [230, 240, 235], cellWidth: 60 },
      1: { halign: 'right', fontStyle: 'bold' }
    }
  });

  doc.save(fileName);
};
