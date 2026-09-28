import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'positive' | 'negative' | 'neutral';
  color?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'neutral',
  color = 'blue'
}) => {
  return (
    <div className="bg-[#F8F1E1] backdrop-blur border border-[#6F4E37]/20 rounded-xl p-5 shadow-lg relative overflow-hidden transition-all hover:border-[#D47E30]/30 hover:shadow-[#6D3B07]/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[#7C5A46] uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-[#2B1D12] mt-1 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-[#7C5A46] mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${
          color === 'blue' ? 'bg-[#D47E30]/10 border border-[#D47E30]/30 text-[#6D3B07]' :
          color === 'emerald' ? 'bg-[#6F4E37]/10 border border-[#6F4E37]/20 text-[#6F4E37]' :
          color === 'amber' ? 'bg-[#F3DEB7] border border-[#D47E30]/30 text-[#6D3B07]' :
          'bg-[#6F4E37]/10 border border-[#6F4E37]/20 text-[#6F4E37]'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 pt-3 border-t border-[#6F4E37]/20 flex items-center text-xs">
          <span className={`font-semibold ${
            trendType === 'positive' ? 'text-[#6F4E37]' :
            trendType === 'negative' ? 'text-[#6D3B07]' : 'text-[#7C5A46]'
          }`}>
            {trend}
          </span>
          <span className="text-[#7C5A46] ml-1.5">vs previous period</span>
        </div>
      )}
    </div>
  );
};
