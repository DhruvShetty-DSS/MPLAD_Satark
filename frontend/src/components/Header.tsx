import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, Bell, LogOut, Sparkles } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const { user, role, logout } = useAuth();

  return (
    <header className="h-16 bg-[#F8F1E1]/90 backdrop-blur border-b border-[#6F4E37]/30 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="flex items-center space-x-4 w-1/3">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C5A46]" />
          <input
            type="text"
            placeholder="Search projects, IDs, MPs, districts..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="w-full bg-[#F5F5DC] border border-[#6F4E37]/30 rounded-lg pl-9 pr-4 py-1.5 text-xs text-[#2B1D12] placeholder-[#7C5A46] focus:outline-none focus:border-[#D47E30] transition"
          />
        </div>
      </div>

      {/* Right Controls: Role Switcher & Profile */}
      <div className="flex items-center space-x-4">
        {/* Demo Indicator Tag */}
        <div className="hidden md:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-[#D47E30]/10 border border-[#D47E30]/40 text-[#6D3B07] text-[11px] font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Data Mode Enabled</span>
        </div>

        {/* Notification Bell */}
        <div className="relative p-2 text-[#7C5A46] hover:text-[#6D3B07] transition cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D47E30] rounded-full animate-ping"></span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#D47E30] rounded-full"></span>
        </div>

        {/* Active User Avatar */}
        <div className="flex items-center space-x-2 pl-2 border-l border-[#6F4E37]/30">
          <div className="w-8 h-8 rounded-full bg-[#6F4E37]/15 border border-[#6F4E37]/40 text-[#6D3B07] flex items-center justify-center font-bold text-xs">
            {user?.full_name?.charAt(0) || 'A'}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-[#2B1D12] leading-tight">{user?.full_name?.split(' ')[0]}</p>
            <p className="text-[10px] text-[#7C5A46] leading-tight">{role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1.5 px-2.5 py-2 text-xs text-[#2B1D12] hover:text-[#6D3B07] hover:bg-[#EFE2D1] rounded-lg transition"
          title="Log out"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Log out</span>
        </button>
      </div>
    </header>
  );
};
