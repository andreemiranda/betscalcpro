
import React, { useState, useEffect, useMemo } from 'react';
import { Share2, Download, MessageCircle, Send } from 'lucide-react';
import InputGroup from './components/InputGroup';
import ResultCard from './components/ResultCard';
import ProgressionTable from './components/ProgressionTable';
import { InvestmentState } from './types';
import { calculateProgression } from './utils/calculations';
import { maskCurrency, parseBRL, formatCurrency, formatPercent } from './utils/formatters';
import { generatePDFReport } from './services/pdfGenerator';
import { shareResult, shareToWhatsApp, shareToTelegram } from './services/shareService';
import { STORAGE_KEYS, COLORS } from './constants';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<InvestmentState>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_CALC);
    return saved ? JSON.parse(saved) : {
      initialInvestment: 'R$ 1.000,00',
      averageOdd: '11',
      numberOfGames: '30'
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_CALC, JSON.stringify(inputs));
  }, [inputs]);

  const results = useMemo(() => {
    const val = parseBRL(inputs.initialInvestment);
    const odd = parseFloat(inputs.averageOdd) || 0;
    const n = parseInt(inputs.numberOfGames) || 0;
    return calculateProgression(val, odd, n);
  }, [inputs]);

  const handleInvestmentChange = (val: string) => {
    setInputs(prev => ({ ...prev, initialInvestment: maskCurrency(val) }));
  };

  const handlePDF = async () => {
    setIsLoading(true);
    try {
      await generatePDFReport(results, inputs);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-[clamp(12px,3vw,24px)] pb-0 overflow-x-hidden">
      <div className="max-w-[1200px] w-full flex-1">
        
        {/* Header */}
        <header className="bg-white rounded-responsive p-6 shadow-xl mb-6 flex items-center gap-4 animate-in slide-in-from-top duration-700">
          <div className="bg-primary p-3 rounded-2xl shadow-inner flex items-center justify-center">
            {/* Logo SVG Customizado - Agora com fundo verde e gráfico amarelo */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 19L8.5 13.5L12.5 17.5L21 7" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 7H21V13" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h1 className="text-[clamp(18px,4vw,24px)] font-black text-primary leading-tight uppercase tracking-tight">
              Bet's Calc Pro
            </h1>
            <p className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Gestão de Banca</p>
          </div>
        </header>

        {/* Form & Results */}
        <main className="bg-white rounded-responsive p-6 shadow-xl mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputGroup label="Banca Inicial" value={inputs.initialInvestment} onChange={handleInvestmentChange} inputMode="decimal" />
            <InputGroup label="Odd Média (%)" value={inputs.averageOdd} onChange={(v) => setInputs(p => ({...p, averageOdd: v}))} type="number" inputMode="decimal" />
            <InputGroup label="Qtd. Jogos" value={inputs.numberOfGames} onChange={(v) => setInputs(p => ({...p, numberOfGames: v}))} type="number" inputMode="numeric" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <ResultCard label="Banca Final" value={formatCurrency(results.finalValue)} variant="green" />
            <ResultCard label="Lucro Total" value={formatCurrency(results.totalReturns)} variant="yellow" />
            <ResultCard label="Rentabilidade" value={formatPercent(results.rentability)} variant="purple" />
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
               <button onClick={() => shareToWhatsApp(results, inputs)} className="bg-[#25D366] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-sm">
                 <MessageCircle size={18} /> WhatsApp
               </button>
               <button onClick={() => shareToTelegram(results, inputs)} className="bg-[#0088cc] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-sm">
                 <Send size={18} /> Telegram
               </button>
               <button onClick={() => shareResult(results, inputs)} className="col-span-2 sm:col-span-1 bg-gray-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-95 transition-all text-sm">
                 <Share2 size={18} /> Outros
               </button>
            </div>
            
            <button 
              onClick={handlePDF}
              disabled={isLoading}
              className="w-full bg-primary text-white p-5 rounded-xl font-black text-lg shadow-lg hover:bg-primaryDark flex items-center justify-center gap-3 transition-all disabled:opacity-50"
            >
              <Download size={22} /> {isLoading ? 'GERANDO...' : 'BAIXAR RELATÓRIO PDF'}
            </button>
          </div>
        </main>

        {/* Table View */}
        <section className="bg-white rounded-responsive p-6 shadow-xl mb-12">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="w-4 h-1 bg-primary rounded-full"></span>
            Projeção Detalhada
          </h2>
          <ProgressionTable data={results.progression} />
        </section>
      </div>

      {/* Footer Minimalista com Lógica de Cores Solicitada */}
      <footer className="w-full py-8 text-center mt-auto bg-white rounded-t-[40px] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] border-t border-gray-100">
        <p className="text-primary text-[14px] font-bold tracking-wide">
          © Bet's Calc Pro by <a 
            href="https://github.com/andreemiranda" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-black border-b-2 border-primary hover:border-accent hover:text-accent transition-all duration-300 px-1"
          >
            André Miranda
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
