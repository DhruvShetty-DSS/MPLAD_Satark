import React from 'react';

interface RiskBadgeProps {
  level: 'Low' | 'Medium' | 'High' | 'Critical' | string;
  score?: number;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, score }) => {
  const normalized = level || 'Low';
  
  let styles = 'bg-[#6F4E37]/10 text-[#6F4E37] border-[#6F4E37]/25';
  if (normalized === 'Medium') styles = 'bg-[#D47E30]/10 text-[#6D3B07] border-[#D47E30]/30';
  if (normalized === 'High') styles = 'bg-[#D47E30]/15 text-[#6D3B07] border-[#D47E30]/40';
  if (normalized === 'Critical') styles = 'bg-[#6D3B07]/10 text-[#6D3B07] border-[#6D3B07]/30 shadow-lg shadow-[#6D3B07]/10 animate-pulse';

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        normalized === 'Critical' ? 'bg-[#6D3B07]' :
        normalized === 'High' ? 'bg-[#D47E30]' :
        normalized === 'Medium' ? 'bg-[#D47E30]' : 'bg-[#6F4E37]'
      }`}></span>
      {normalized} {score !== undefined ? `(${score})` : ''}
    </span>
  );
};
