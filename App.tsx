
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Share2, Download, MessageCircle, Send, BarChart2 } from 'lucide-react';
import InputGroup from './components/InputGroup.tsx';
import ResultCard from './components/ResultCard.tsx';
import ProgressionTable from './components/ProgressionTable.tsx';
import StatsView from './components/StatsView.tsx';
import IntroScreen from './components/IntroScreen.tsx';
import { InvestmentState } from './types.ts';
import { calculateProgression } from './utils/calculations.ts';
import { maskCurrency, parseBRL, formatCurrency, formatPercent } from './utils/formatters.ts';
import { generatePDFReport } from './services/pdfGenerator.ts';
import { shareResult, shareToWhatsApp, shareToTelegram } from './services/shareService.ts';
import { STORAGE_KEYS, COLORS } from './constants.ts';

const App: React.FC = () => {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [view, setView] = useState<'home' | 'stats'>('home');

  const [inputs, setInputs] = useState<InvestmentState>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_CALC);
    return saved ? JSON.parse(saved) : {
      initialInvestment: 'R$ 1.000,00',
      averageOdd: '11',
      numberOfGames: '30'
    };
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    try {
      return saved ? JSON.parse(saved) : {
        visits: 0,
        pdfs: 0,
        shares: 0,
        lastAccess: ''
      };
    } catch {
      return { visits: 0, pdfs: 0, shares: 0, lastAccess: '' };
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleIntroFinish = useCallback(() => {
    setIsIntroActive(false);
  }, []);

  // Fail-safe: Força o encerramento da intro após 5 segundos, independente de qualquer erro
  useEffect(() => {
    const safetyTimeout = setTimeout(() => {
      setIsIntroActive(false);
    }, 5000);
    return () => clearTimeout(safetyTimeout);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash;
      if (currentHash === '#/stats') {
        setView('stats');
      } else {
        setView('home');
      }
    };

    if (window.location.hash === '#/stats') {
      window.history.replaceState(null, '', window.location.pathname);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const isNewSession = !sessionStorage.getItem('bets_calc_session_active');
    if (isNewSession) {
      setStats(prev => {
        const newStats = {
          ...prev,
          visits: prev.visits + 1,
          lastAccess: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
        return newStats;
      });
      sessionStorage.setItem('bets_calc_session_active', 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_CALC, JSON.stringify(inputs));
  }, [inputs]);

  const results = useMemo(() => {
    const val = parseBRL(inputs.initialInvestment);
    const odd = parseFloat(inputs.averageOdd) || 0;
    const n = parseInt(inputs.numberOfGames) || 0;
    return calculateProgression(val, odd, n);
  }, [inputs]);

  const updateStat = (key: 'pdfs' | 'shares') => {
    setStats(prev => {
      const newStats = { ...prev, [key]: prev[key] + 1 };
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
      return newStats;
    });
  };

  const handleInvestmentChange = (val: string) => {
    setInputs(prev => ({ ...prev, initialInvestment: maskCurrency(val) }));
  };

  const handlePDF = async () => {
    setIsLoading(true);
    try {
      await generatePDFReport(results, inputs);
      updateStat('pdfs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (platform: 'whatsapp' | 'telegram' | 'native') => {
    if (platform === 'whatsapp') shareToWhatsApp(results, inputs);
    else if (platform === 'telegram') shareToTelegram(results, inputs);
    else await shareResult(results, inputs);
    updateStat('shares');
  };

  const goToStats = () => { window.location.hash = '#/stats'; };
  const goToHome = () => { 
    window.location.hash = '';
    setView('home');
  };

  return (
    <div className="relative min-h-screen bg-primary">
      {isIntroActive && <IntroScreen onFinish={handleIntroFinish} />}
      
      <div 
        className="w-full min-h-screen flex flex-col items-center p-[clamp(12px,3vw,24px)] pb-0 overflow-x-hidden"
      >
        <div className="max-w-[1200px] w-full flex-1">
          {view === 'stats' ? (
            <StatsView data={stats} onBack={goToHome} />
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="bg-white rounded-responsive p-6 shadow-xl mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary p-3 rounded-2xl shadow-inner flex items-center justify-center">
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
                </div>
                
                <button 
                  onClick={goToStats}
                  className="p-3 bg-cardGreen text-primary rounded-xl hover:bg-primary hover:text-white transition-all duration-300 shadow-sm flex items-center gap-2 font-bold text-xs"
                >
                  <BarChart2 size={18} />
                  <span className="hidden sm:inline">VIEW STATS</span>
                </button>
              </header>

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

                <div className="mt-8 flex flex-col gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                     <button onClick={() => handleShare('whatsapp')} className="bg-[#25D366] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-sm">
                       <MessageCircle size={18} /> WhatsApp
                     </button>
                     <button onClick={() => handleShare('telegram')} className="bg-[#0088cc] text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-sm">
                       <Send size={18} /> Telegram
                     </button>
                     <button onClick={() => handleShare('native')} className="col-span-2 sm:col-span-1 bg-gray-900 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black active:scale-95 transition-all text-sm">
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

              <section className="bg-white rounded-responsive p-6 shadow-xl mb-12">
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                  <span className="w-4 h-1 bg-primary rounded-full"></span>
                  Projeção Detalhada
                </h2>
                <ProgressionTable data={results.progression} />
              </section>
            </div>
          )}
        </div>

        <footer className="w-full py-8 text-center mt-auto bg-white rounded-t-[40px] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] border-t border-gray-100">
          <p className="text-primary text-[14px] font-bold tracking-wide">
            © 2026 Bet's Calc Pro by <a 
              href="https://github.com/andreemiranda" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-black border-b-2 border-primary hover:text-accent hover:border-accent transition-all duration-300"
            >
              André Miranda
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
