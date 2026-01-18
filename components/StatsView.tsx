
import React from 'react';
import { ArrowLeft, BarChart3, Users, FileDown, Share2, Calendar } from 'lucide-react';
import { COLORS } from '../constants.ts';

interface StatsData {
  visits: number;
  pdfs: number;
  shares: number;
  lastAccess: string;
}

interface StatsViewProps {
  data: StatsData;
  onBack: () => void;
}

const StatsView: React.FC<StatsViewProps> = ({ data, onBack }) => {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Nenhum acesso';
    return new Date(dateStr).toLocaleString('pt-BR');
  };

  // Cálculo de "Score de Engajamento" fictício para o gráfico
  const maxVal = Math.max(data.visits, 1);
  const pdfPercent = (data.pdfs / maxVal) * 100;
  const sharePercent = (data.shares / maxVal) * 100;

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-3 bg-white rounded-full shadow-md text-primary hover:scale-110 active:scale-95 transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">Relatório de Uso</h1>
          <p className="text-green-100/70 text-xs font-bold uppercase tracking-widest">Métricas de Acesso Local</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Card Acessos */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-5">
          <div className="bg-cardGreen p-4 rounded-xl text-primary">
            <Users size={32} />
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Total de Acessos</span>
            <p className="text-3xl font-black text-gray-900 tabular-nums">{data.visits}</p>
          </div>
        </div>

        {/* Card PDFs */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-5">
          <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
            <FileDown size={32} />
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">PDFs Gerados</span>
            <p className="text-3xl font-black text-gray-900 tabular-nums">{data.pdfs}</p>
          </div>
        </div>

        {/* Card Shares */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-5">
          <div className="bg-cardYellow p-4 rounded-xl text-orange-600">
            <Share2 size={32} />
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Compartilhamentos</span>
            <p className="text-3xl font-black text-gray-900 tabular-nums">{data.shares}</p>
          </div>
        </div>

        {/* Card Último Acesso */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-5">
          <div className="bg-gray-100 p-4 rounded-xl text-gray-600">
            <Calendar size={32} />
          </div>
          <div>
            <span className="text-gray-400 text-xs font-bold uppercase">Última Atividade</span>
            <p className="text-sm font-bold text-gray-900">{formatDate(data.lastAccess)}</p>
          </div>
        </div>
      </div>

      {/* Seção Gráfica Simples */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl mb-12">
        <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
          <BarChart3 size={20} className="text-primary" />
          Taxa de Conversão de Recursos
        </h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-gray-400 mb-2">
              <span>Geração de Relatórios</span>
              <span className="text-primary">{pdfPercent.toFixed(1)}%</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000" 
                style={{ width: `${Math.min(pdfPercent, 100)}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold uppercase text-gray-400 mb-2">
              <span>Engajamento Social (Share)</span>
              <span className="text-orange-500">{sharePercent.toFixed(1)}%</span>
            </div>
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-1000" 
                style={{ width: `${Math.min(sharePercent, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <p className="mt-8 text-[10px] text-gray-400 font-medium italic text-center">
          * Estes dados são armazenados localmente no seu dispositivo para sua privacidade.
        </p>
      </div>
    </div>
  );
};

export default StatsView;
