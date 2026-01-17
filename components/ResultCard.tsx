
import React from 'react';

interface ResultCardProps {
  label: string;
  value: string;
  variant: 'green' | 'yellow' | 'purple';
}

const ResultCard: React.FC<ResultCardProps> = ({ label, value, variant }) => {
  const styles = {
    green: 'bg-cardGreen border-primary',
    yellow: 'bg-cardYellow border-accent',
    purple: 'bg-cardAccent border-success',
  };

  return (
    <div className={`
      flex flex-col justify-center
      p-[clamp(12px,3vw,20px)] 
      min-h-[clamp(90px,18vw,110px)]
      rounded-[clamp(14px,3vw,18px)] 
      border-[3px] shadow-[0_10px_25px_rgba(0,0,0,0.15)] 
      transition-all duration-400 
      hover:md:translate-y-[-6px] 
      active:scale-[0.98]
      overflow-hidden
      ${styles[variant]}
    `}>
      <span className="text-gray-600 font-bold block mb-1 text-[clamp(11px,2.5vw,14px)] uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </span>
      <strong className="text-[clamp(16px,4.5vw,26px)] font-black whitespace-nowrap tabular-nums leading-tight text-gray-900">
        {value}
      </strong>
    </div>
  );
};

export default ResultCard;
