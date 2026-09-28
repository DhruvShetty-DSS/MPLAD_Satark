import React from 'react';
import { 
  LayoutDashboard, FolderGit2, Copy, AlertTriangle, TrendingUp, MapPin, 
  BarChart3, Sparkles, MessageSquareCode, Database, History, Settings, ShieldCheck 
} from 'lucide-react';

export type ViewType = 
  | 'dashboard' | 'projects' | 'duplicates' | 'alerts' 
  | 'predictive' | 'geospatial' | 'analytics' | 'insights' 
  | 'assistant' | 'datamgmt' | 'audit' | 'settings';

interface SidebarProps {
  currentView: ViewType;
  onSelectView: (view: ViewType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects Registry', icon: FolderGit2 },
    { id: 'duplicates', label: 'Duplicate Detection', icon: Copy, badge: 'AI' },
    { id: 'alerts', label: 'Alert Center', icon: AlertTriangle },
    { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp },
    { id: 'geospatial', label: 'Geospatial Intelligence', icon: MapPin },
    { id: 'analytics', label: 'State & District Matrix', icon: BarChart3 },
    { id: 'insights', label: 'System AI Insights', icon: Sparkles },
    { id: 'assistant', label: 'Intelligence Assistant', icon: MessageSquareCode, badge: 'NL' },
    { id: 'datamgmt', label: 'Data & ML Management', icon: Database },
    { id: 'audit', label: 'Audit Trail', icon: History },
  ];

  return (
    <aside className="w-64 bg-[#F8F1E1] border-r border-[#6F4E37]/25 flex flex-col justify-between h-screen sticky top-0 z-30">
      <div>
        {/* Government Header Branding */}
        <div className="p-5 border-b border-[#6F4E37]/25 flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-tr from-[#6F4E37] to-[#6D3B07] rounded-xl shadow-lg shadow-[#6D3B07]/20 text-[#F5F5DC]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-[#2B1D12] text-sm tracking-tight">SATARK</h1>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id as ViewType)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#D47E30]/12 text-[#6D3B07] border border-[#D47E30]/30 font-semibold'
                    : 'text-[#6F4E37] hover:bg-[#EFE2D1] hover:text-[#2B1D12]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#6D3B07]' : 'text-[#6F4E37]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-[#D47E30]/12 text-[#6D3B07] border border-[#D47E30]/30 uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Tagline */}
      <div className="p-4 border-t border-[#6F4E37]/25 bg-[#F5F5DC] text-[11px] text-[#7C5A46] text-center">
        <p className="font-medium text-[#6D3B07]">Problem ID 26102</p>
        <p className="text-[10px] text-[#7C5A46] mt-0.5">Government Monitoring Prototype</p>
      </div>
    </aside>
  );
};
