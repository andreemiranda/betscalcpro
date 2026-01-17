
import React from 'react';

interface InputGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
}

const InputGroup: React.FC<InputGroupProps> = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder,
  inputMode = "text"
}) => {
  return (
    <div className="flex flex-col w-full mb-[clamp(16px,4vw,20px)] min-w-0">
      <label className="text-[clamp(15px,3.5vw,17px)] font-bold mb-2 text-gray-700 ml-1 uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[clamp(56px,11vw,66px)] px-[clamp(14px,3vw,18px)] rounded-[clamp(12px,3vw,14px)] border-[3px] border-primary text-[clamp(18px,4vw,24px)] shadow-[0_10px_25px_rgba(0,0,0,0.15)] focus:outline-none focus:border-accent focus:ring-[5px] focus:ring-accent/30 focus:scale-[1.02] active:scale-[0.98] transition-all duration-300 bg-white placeholder-gray-300 tabular-nums whitespace-nowrap overflow-hidden"
      />
    </div>
  );
};

export default InputGroup;
