import React, { useState } from 'react';
import { useAuth, UserRole, DEMO_USERS } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('admin@mplads.gov.in');
  const [password, setPassword] = useState('admin123');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Ministry Admin');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickFill = (r: UserRole) => {
    setSelectedRole(r);
    const demo = DEMO_USERS[r];
    setEmail(demo.email);
    setPassword({
      'Ministry Admin': 'admin123',
      'State Nodal Authority': 'state123',
      'District Authority': 'district123',
      MP: 'mp123',
    }[r]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    login(email, password)
      .catch((requestError) => {
        setError(requestError.response?.data?.detail || 'Login failed. Check your email and password.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex flex-col justify-center items-center p-6 text-[#2B1D12] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D47E30]/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Branding Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3.5 bg-gradient-to-tr from-[#6F4E37] to-[#6D3B07] rounded-2xl shadow-xl shadow-[#6D3B07]/20 text-[#F5F5DC]">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#2B1D12] tracking-tight">SATARK</h1>
          </div>
          <p className="text-xs text-[#7C5A46]">
            AI-powered intelligence & early-warning platform for transparent, efficient and accountable MPLADS implementation.
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[#F8F1E1]/90 border border-[#6F4E37]/25 p-8 rounded-2xl shadow-2xl backdrop-blur space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#2B1D12] mb-1.5">Select Role Portal</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full bg-[#F5F5DC] border border-[#6F4E37]/30 rounded-lg px-3.5 py-2.5 text-xs text-[#2B1D12] focus:outline-none focus:border-[#D47E30]"
              >
                <option value="Ministry Admin">Ministry Admin (MoSPI HQ)</option>
                <option value="State Nodal Authority">State Nodal Authority</option>
                <option value="District Authority">District Authority (Collector)</option>
                <option value="MP">Member of Parliament (MP)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B1D12] mb-1.5">Government Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C5A46]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-[#F5F5DC] border border-[#6F4E37]/30 rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#2B1D12] focus:outline-none focus:border-[#D47E30]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2B1D12] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7C5A46]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-[#F5F5DC] border border-[#6F4E37]/30 rounded-lg pl-9 pr-4 py-2.5 text-xs text-[#2B1D12] focus:outline-none focus:border-[#D47E30]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#D47E30] hover:bg-[#C76F29] text-[#F5F5DC] font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center space-x-2 pt-3"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Access Security Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {error && <p className="text-xs text-[#6F4E37]" role="alert">{error}</p>}
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-4 border-t border-[#6F4E37]/25 space-y-2">
            <p className="text-[11px] text-[#6F4E37] font-semibold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D47E30]" />
              <span>Quick Demo Role Fill:</span>
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {(['Ministry Admin', 'State Nodal Authority', 'District Authority', 'MP'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleQuickFill(r)}
                  className="p-2 bg-[#F5F5DC] hover:bg-[#EFE2D1] text-[#2B1D12] rounded border border-[#6F4E37]/30 text-left transition"
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#7C5A46] text-center">
          Problem Statement 26102 Demonstration • Smart Automation Category
        </p>
      </div>
    </div>
  );
};
