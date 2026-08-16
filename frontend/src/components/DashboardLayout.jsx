import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LineChart, LayoutDashboard, History, Star, Bell, Settings, CreditCard, HelpCircle, Menu, X, Crown, Sparkles } from 'lucide-react';
import { UserButton, useAuth } from '@clerk/clerk-react';

export default function DashboardLayout() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || (path === '/upload' && location.pathname === '/');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const [isFullSize, setIsFullSize] = useState(false);
  const [isProUser, setIsProUser] = useState(false);
  const [isLoadingPro, setIsLoadingPro] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const checkProStatus = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const response = await fetch('/api/subscription/status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.isPro) setIsProUser(true);
      } catch (e) {
        console.error('Failed to check pro status', e);
      } finally {
        setIsLoadingPro(false);
      }
    };
    checkProStatus();
  }, []);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const navItems = [
    { name: 'Analyze Chart', icon: LineChart, path: '/upload', proOnly: true },
  ];

  const bottomNavItems = [
    { name: 'Billing', icon: CreditCard, path: '/billing' },
    { name: 'Help & Support', icon: HelpCircle, path: '/support' },
  ];

  const renderNavLink = (item) => {
    const active = isActive(item.path);
    const classes = `flex items-center gap-3 px-6 py-3 font-medium transition-colors ${
      active 
        ? 'text-white bg-[#00d060]/10 border-l-4 border-[#00d060]' 
        : 'text-[#888888] hover:text-white hover:bg-[#111111] border-l-4 border-transparent'
    } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

    if (item.disabled) {
      return (
        <div key={item.name} className={classes}>
          <item.icon size={20} className={active ? 'text-white' : 'text-[#888888]'} />
          {item.name}
        </div>
      );
    }

    if (item.proOnly && !isProUser && !isLoadingPro) {
      return (
        <div key={item.name} onClick={() => setShowUpgradeModal(true)} className={`${classes} cursor-pointer`}>
          <item.icon size={20} className={active ? 'text-white' : 'text-[#888888]'} />
          {item.name}
        </div>
      );
    }

    return (
      <Link key={item.name} to={item.path} className={classes}>
        <item.icon size={20} className={active ? 'text-white' : 'text-[#888888]'} />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="flex h-[100dvh] bg-[#050505] bg-grid-pattern text-white font-sans overflow-hidden selection:bg-[#00d060] selection:text-[#050505]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {!isFullSize && (
        <aside className={`fixed inset-y-0 left-0 w-[260px] bg-[#0a0a0a] border-r border-[#222222] flex flex-col h-full shadow-sm z-40 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo */}
        <div className="px-6 py-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex items-center justify-center">
               <img src="/logo.png" alt="PatternFlow Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,208,96,0.4)]" />
            </div>
            <span className="font-extrabold text-2xl text-white tracking-tight">Pattern<span className="text-[#00d060]">Flow</span></span>
          </Link>
          <button className="lg:hidden text-[#888888]" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2 flex flex-col">
          <nav className="space-y-1 mb-8">
            {navItems.map(renderNavLink)}
            <div className="my-2 border-t border-[#222222] mx-4"></div>
            {bottomNavItems.map(renderNavLink)}
          </nav>
          
          {/* Bottom Section */}
          <div className="mt-auto flex flex-col">
            {/* Upgrade to Pro Card */}
            {!isProUser && !isLoadingPro && (
              <div className="px-6 pb-6">
                  <div className="bg-[#111111] border border-[#222222] rounded-2xl p-5 relative overflow-hidden group hover:border-white/20 transition-colors">
                    <div className="absolute top-0 right-0 p-8 bg-white/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center gap-2 text-white font-bold mb-2">
                       <Crown size={18} className="fill-white/20 text-white" />
                       Upgrade to Pro
                    </div>
                    <p className="text-sm text-[#888888] mb-5 leading-relaxed">Unlock more analyses, AI insights & advanced features.</p>
                    <Link to="/billing" className="w-full bg-[#00d060]/10 hover:bg-[#00d060]/20 border border-[#00d060]/30 text-[#00d060] font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                      Upgrade Now <Sparkles size={16} className="text-[#00d060]" />
                    </Link>
                  </div>
              </div>
            )}
            
            {/* User Profile */}
            <div className="border-t border-[#222222] p-6 flex items-center gap-3">
               <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: "w-10 h-10" } }} />
               <span className="font-medium text-gray-300">My Account</span>
            </div>
          </div>
        </div>
      </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#222222] bg-[#0a0a0a] sticky top-0 z-20 shadow-sm">
          <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-xl hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="PatternFlow Logo" className="w-7 h-7 object-contain drop-shadow-[0_0_10px_rgba(0,208,96,0.3)]" />
            <span>Pattern<span className="text-[#00d060]">Flow</span></span>
          </Link>
          <button onClick={() => setIsSidebarOpen(true)} className="text-[#888888] hover:text-white">
            <Menu size={24} />
          </button>
        </div>

        <div className={`p-4 sm:p-6 md:p-8 relative z-10 w-full mx-auto ${isFullSize ? 'max-w-[1450px]' : 'max-w-[1400px]'}`}>
          <Outlet context={{ isFullSize, setIsFullSize }} />
        </div>
      </main>

      {/* Upgrade to Pro Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111111] border border-[#00d060]/30 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,208,96,0.15)] relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-12 h-12 bg-[#00d060]/10 rounded-full flex items-center justify-center mb-6">
               <Sparkles size={24} className="text-[#00d060]" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-white mb-2">Upgrade to Pro</h2>
            <p className="text-[#888888] text-sm mb-6 leading-relaxed">
              You need a Pro subscription to generate AI chart analyses. Upgrade now to unlock advanced pattern recognition and unlimited insights.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 bg-[#1a1a1a] border border-[#333333] text-gray-300 font-bold py-3 px-4 rounded-xl hover:bg-[#222222] transition-colors"
              >
                Cancel
              </button>
              <Link 
                to="/billing"
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 bg-[#00d060] hover:bg-[#00e56a] text-black font-bold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(0,208,96,0.3)] transition-colors flex items-center justify-center gap-2"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
