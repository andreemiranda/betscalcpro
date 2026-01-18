
import React, { useEffect, useState, useRef } from 'react';
import { COLORS } from '../constants.ts';

interface IntroScreenProps {
  onFinish: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const isFinishedRef = useRef(false);

  useEffect(() => {
    let progressTimer: number;
    let exitTimer: number;
    let finalTimer: number;

    // 1. Barra de progresso visual acelerada
    progressTimer = window.setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    // 2. Inicia o processo de saída após 2.2 segundos
    exitTimer = window.setTimeout(() => {
      setIsExiting(true);
      
      // 3. Finaliza de fato após a animação de fade
      finalTimer = window.setTimeout(() => {
        if (!isFinishedRef.current) {
          isFinishedRef.current = true;
          onFinish();
        }
      }, 800);
    }, 2200);

    // Cleanup rigoroso para evitar duplicidade no Strict Mode
    return () => {
      clearInterval(progressTimer);
      clearTimeout(exitTimer);
      clearTimeout(finalTimer);
    };
  }, [onFinish]);

  return (
    <div 
      className={`
        fixed inset-0 z-[10000] flex flex-col items-center justify-center 
        bg-gradient-to-br from-primary to-primaryDark 
        transition-all duration-700 ease-in-out
        ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}
      `}
    >
      <div className="relative flex flex-col items-center">
        
        {/* Logo Animada */}
        <div className="bg-white p-6 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] mb-8 animate-bounce">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M3 19L8.5 13.5L12.5 17.5L21 7" 
              stroke={COLORS.primary} 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-[draw_1.5s_ease-out_forwards]"
              style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
            />
            <path 
              d="M15 7H21V13" 
              stroke={COLORS.primary} 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-[draw_0.5s_ease-out_1s_forwards]"
              style={{ strokeDasharray: 20, strokeDashoffset: 20 }}
            />
          </svg>
        </div>

        {/* Texto do App */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
            BET'S CALC <span className="text-accent">PRO</span>
          </h1>
          <p className="text-green-100/60 text-xs font-bold uppercase tracking-[0.3em] animate-pulse">
            Iniciando Gestão de Banca
          </p>
        </div>
      </div>

      {/* Barra de Carregamento Inferior */}
      <div className="absolute bottom-20 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
