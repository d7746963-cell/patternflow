import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Check, CheckCircle2, ArrowRight, ChevronDown, LineChart, TrendingDown, TrendingUp, Activity, BarChart2, Target, Zap, BookOpen, ChevronRight, Sparkles, Smartphone, Camera, Send, AlertCircle, Info, ArrowLeft, Upload, Maximize, ThumbsDown, Search, Globe, User } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#30363D] py-6 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center gap-4 hover:text-[#00d060] transition-colors duration-200 text-gray-100">
        <h3 className="text-base font-semibold">{q}</h3>
        <ChevronDown size={18} className={`flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180 text-[#00d060]" : "text-[#555555]"}`} />
      </div>
      {open && <p className="mt-4 text-[#888888] text-sm leading-relaxed pr-8">{a}</p>}
    </div>
  );
};

export default function LandingPage() {
  const [billing, setBilling] = useState("monthly");
  const [sampleView, setSampleView] = useState("technical");
  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 font-sans bg-dust-pattern md:bg-grid-pattern selection:bg-[#00d060] selection:text-gray-100 overflow-x-hidden relative">
      
      {/* Test Hero Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-[120vh] z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 10%',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
        }}
      ></div>

      {/* Background Auras (Parakeet style) */}
      <div className="absolute top-[-5%] left-[-20%] w-[80vw] h-[80vw] min-w-[400px] min-h-[400px] max-w-[900px] max-h-[900px] bg-[#a855f7] opacity-[0.12] sm:opacity-[0.08] blur-[80px] sm:blur-[140px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-20%] w-[70vw] h-[70vw] min-w-[300px] min-h-[300px] max-w-[800px] max-h-[800px] bg-[#a855f7] opacity-[0.1] sm:opacity-[0.06] blur-[80px] sm:blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] min-w-[300px] min-h-[300px] max-w-[700px] max-h-[700px] bg-[#a855f7] opacity-[0.08] sm:opacity-[0.05] blur-[80px] sm:blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-4 sm:px-6 md:px-8 w-full max-w-[1600px] mx-auto z-50 relative">
        {/* Left Section: Logo & Search */}
        <div className="flex items-center gap-6 xl:gap-8">
          <div className="flex items-center gap-2 font-extrabold text-2xl tracking-tight text-gray-100 flex-shrink-0">
            <div className="w-10 h-10 flex items-center justify-center">
               <img src="/logo.png" alt="PatternFlow Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,208,96,0.4)]" />
            </div>
            <span>Pattern<span className="text-[#00d060]">Flow</span></span>
          </div>
        </div>

        {/* Center Section: Links */}
        <div className="hidden md:flex items-center justify-center flex-1 gap-6 lg:gap-8 text-[15px] font-bold text-gray-200">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <div className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">More <ChevronDown size={16} /></div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer transition-colors font-bold text-sm">
            <Globe size={20} />
            <span>EN</span>
          </div>
          
          <SignedIn>
            <Link to="/upload" className="text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:block p-1">
              <User size={22} />
            </Link>
          </SignedIn>
          <SignedOut>
            <Link to="/onboarding" className="text-gray-300 hover:text-white transition-colors cursor-pointer hidden sm:block p-1">
              <User size={22} />
            </Link>
          </SignedOut>
          
          <Link to="/onboarding" className="bg-[#00d060] text-black hover:bg-[#00e56a] px-5 py-2 sm:px-6 sm:py-2.5 text-[15px] rounded-lg font-extrabold transition shadow-[0_0_15px_rgba(0,208,96,0.3)]">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-5 pt-16 sm:pt-16 md:pt-16 lg:pt-20 pb-8 max-w-5xl mx-auto relative z-10">
        
        <div className="bg-[#111111] border border-[#222222] px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#00d060] uppercase mb-8 flex items-center gap-2">
          <CheckCircle2 size={14} /> AI-Driven Clarity
        </div>
        
        {/* Mobile Headline */}
        <h1 className="font-extrabold mb-8 tracking-tighter leading-[1.1] text-center px-2 sm:hidden text-gray-100">
          <span className="block text-[8vw]">Your trusted</span>
          <span className="block text-[9.5vw] text-[#00d060] whitespace-nowrap">Chart Companion</span>
        </h1>
        
        {/* Desktop Headline */}
        <h1 className="hidden sm:flex flex-col items-center text-5xl md:text-7xl font-extrabold text-gray-100 mb-8 tracking-tighter leading-[1.1] px-0">
          <span className="text-center whitespace-nowrap">Understand your charts —</span>
          <span className="text-[#00d060] text-center whitespace-nowrap">not just stare at them.</span>
        </h1>
        
        <p className="text-[#a0a0a0] text-lg sm:text-xl mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          <span className="sm:hidden">
            Stop guessing. Spot winning setups instantly and trade with <span className="text-gray-100 font-bold">AI precision</span>.
          </span>
          <span className="hidden sm:inline">
            Instantly spot high-probability setups and hidden market patterns. Stop guessing and start trading with the absolute confidence of <span className="text-gray-100 font-bold">AI-driven precision</span>.
          </span>
        </p>
        
        <div className="flex flex-col items-center gap-6">
          <Link to="/onboarding" className="bg-white text-black hover:bg-gray-200 border border-white px-6 py-3 text-[15px] sm:px-8 sm:py-3.5 sm:text-base md:px-10 md:py-4 md:text-lg rounded-full font-extrabold transition flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]">
            Get Started <ArrowRight className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-0.5 sm:ml-1" />
          </Link>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="flex -space-x-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border-2 border-[#0D1117] object-cover relative z-[4] shadow-sm" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 2" className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border-2 border-[#0D1117] object-cover relative z-[3] shadow-sm" />
              <img src="https://randomuser.me/api/portraits/men/68.jpg" alt="User 3" className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border-2 border-[#0D1117] object-cover relative z-[2] shadow-sm" />
              <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="User 4" className="w-12 h-12 sm:w-10 sm:h-10 rounded-full border-2 border-[#0D1117] object-cover relative z-[1] shadow-sm" />
            </div>
            <div className="flex flex-col items-center sm:items-start mt-2 sm:mt-0 gap-1.5 sm:gap-1">
              <div className="text-base sm:text-sm text-[#888888] font-medium text-center sm:text-left">
                Trusted by <span className="text-gray-100 font-bold">1,000+</span> traders
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-3 sm:h-3" viewBox="0 0 24 24" fill="#eab308" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
                <span className="text-gray-100 font-bold text-[15px] sm:text-xs ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT SCREENSHOT */}
      <section className="py-16 px-5 sm:px-8 relative z-20 w-full">
        <div className="max-w-[1400px] lg:max-w-[1000px] xl:max-w-[1150px] 2xl:max-w-[1300px] mx-auto w-full">
          <div className="bg-[#161B22] border border-[#30363D] rounded-2xl shadow-[0_0_50px_rgba(0,208,96,0.05)] overflow-hidden">
            <div className="bg-[#0D1117] border-b border-[#30363D] px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <div className="flex-1 bg-[#161B22] border border-[#30363D] rounded-md px-3 py-1 text-xs text-[#888888] ml-4 max-w-xs font-mono">patternflow.app/analysis</div>
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-6 relative">
              {/* Header (Back, Technical, News, Share, Standard View) */}
                <div className="flex items-center justify-between text-[#888888] text-xs md:text-sm font-semibold gap-2 md:gap-4">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-100 transition-colors flex-none">
                    <ArrowLeft size={18} /> <span className="hidden md:inline">Back to Upload</span>
                  </div>
                  <div className="flex items-center justify-center flex-1 min-w-0">
                    <div className="flex items-center bg-[#0D1117] border border-[#30363D] rounded-lg overflow-hidden p-1 shadow-inner w-full max-w-[200px] md:max-w-none md:w-auto mx-auto">
                      <div 
                        onClick={() => setSampleView("technical")}
                        className={`flex-1 md:flex-none text-center px-1 md:px-6 py-1.5 rounded-md cursor-pointer font-bold transition-colors text-[10px] sm:text-xs md:text-sm ${sampleView === "technical" ? "bg-[#00d060] text-black" : "text-[#888888] hover:text-gray-100"}`}
                      >Technical</div>
                      <div 
                        onClick={() => setSampleView("news")}
                        className={`flex-1 md:flex-none text-center px-1 md:px-6 py-1.5 rounded-md cursor-pointer font-bold transition-colors text-[10px] sm:text-xs md:text-sm ${sampleView === "news" ? "bg-[#00d060] text-black" : "text-[#888888] hover:text-gray-100"}`}
                      >News</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 flex-none">
                    <div className="bg-[#00d060] text-black px-2.5 md:px-4 py-1.5 rounded-lg cursor-pointer font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(0,208,96,0.2)] hover:bg-[#00e56a] transition-colors">
                      <Upload size={16} /> <span className="hidden md:inline">Share</span>
                    </div>
                    <div className="hidden md:flex px-4 py-1.5 rounded-lg cursor-pointer hover:text-gray-100 transition-colors items-center gap-2 border border-transparent hover:border-[#333]">
                      <Maximize size={16} /> Standard View
                    </div>
                  </div>
                </div>

              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 relative h-[75vh] lg:h-auto lg:min-h-[600px] xl:min-h-[700px] overflow-y-auto lg:overflow-visible custom-scrollbar">
                {/* Left Column: Chart and Metrics */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Chart Image */}
                <div className="bg-[#0D1117] rounded-xl overflow-hidden border border-[#30363D] h-[200px] sm:h-[240px] lg:h-[320px] xl:h-[380px] w-full shadow-lg sticky top-0 z-40 lg:relative">
                  <img src="/chart_demo.png" alt="Sample chart" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                
                {/* Trend and 4-Grid */}
                <div className={`flex-col gap-2.5 ${sampleView === "news" ? "hidden lg:flex" : "flex"}`}>
                  {/* Big Trend Box */}
                  <div className="bg-[#242634] rounded-xl p-4 sm:p-5 flex flex-col justify-between relative shadow-md">
                    <p className="text-[13px] font-bold text-gray-200 mb-2">Trend</p>
                    <p className="text-3xl font-extrabold text-white mt-2 tracking-tight">Downtrend</p>
                    <div className="absolute top-1/2 -translate-y-1/2 right-5 text-[#f87171]">
                      <TrendingDown size={36} strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* 4-Grid Metrics */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
                    {[
                      { label: "Volatility", value: "Medium", valueColor: "text-orange-500", Icon: Activity, iconColor: "text-blue-400" },
                      { label: "Volume", value: "High", valueColor: "text-white", Icon: BarChart2, iconColor: "text-orange-500" },
                      { label: "Sentiment", value: "Bearish", valueColor: "text-[#f87171]", Icon: ThumbsDown, iconColor: "text-[#f87171]" },
                      { label: "Strength", value: "Moderate", valueColor: "text-white", Icon: Zap, iconColor: "text-[#00d060]" },
                    ].map((item, i) => (
                      <div key={i} className="bg-[#242634] rounded-xl p-4 flex flex-col justify-center shadow-sm">
                        <div className="flex items-center gap-2 text-gray-200 mb-2"><item.Icon size={14} strokeWidth={2.5} className={item.iconColor}/><span className="text-[12px] font-bold">{item.label}</span></div>
                        <p className={`text-xl font-extrabold ${item.valueColor}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Scrollable Content */}
              <div className="flex flex-col lg:h-full lg:max-h-[700px] lg:overflow-hidden relative">
                
                <div className="flex-1 lg:overflow-y-auto pr-0 lg:pr-4 space-y-4 lg:custom-scrollbar pb-10">
                  
                  {sampleView === "technical" ? (
                    <>
                      {/* Header */}
                      <div className="border-l-2 border-[#00d060] pl-4 mt-2 mb-4">
                        <h2 className="text-2xl font-extrabold text-gray-100 mb-1">Educational AI Analysis</h2>
                        <p className="text-xs text-[#888888]">Automated breakdown of visible chart structure.</p>
                      </div>

                      {/* Trend & Structure */}
                      <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-4 md:p-6 shadow-md">
                        <h3 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2"><Activity size={18} className="text-[#00d060]" /> Trend & Structure</h3>
                        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 md:p-5 shadow-inner">
                          <div className="flex gap-3 mb-4">
                            <span className="bg-[#2d1618] border border-[#e06c75]/20 text-[#e06c75] text-[10px] font-extrabold px-3 py-1.5 rounded flex items-center gap-1.5"><TrendingDown size={14} /> DOWNTREND</span>
                            <span className="bg-[#0D1117] border border-[#30363D] text-gray-300 text-[10px] font-extrabold px-3 py-1.5 rounded">MODERATE</span>
                          </div>
                          <p className="text-[#a1a1aa] text-sm leading-relaxed">This chart has two distinct phases. An initial, strong uptrend from November 2025 to May 2026 saw price climb steadily. However, since June 2026, the overall trend has clearly shifted to a downtrend, characterized by a series of lower highs and lower lows. The current movement is a bounce within this larger declining trend.</p>
                        </div>
                      </div>

                      {/* Key Price Levels */}
                      <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-4 md:p-6 shadow-md">
                        <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2"><Target size={18} className="text-[#00d060]" /> Key Price Levels</h3>
                        
                        {/* Card 1: Resistance 260-280 */}
                        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 md:p-5 mb-3 shadow-inner">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="bg-[#2d1618] border border-[#e06c75]/20 text-[#e06c75] text-[10px] font-extrabold px-3 py-1.5 rounded">RESISTANCE</span>
                              <div className="flex gap-1"><div className="w-1.5 h-3.5 bg-[#e06c75] rounded-sm"></div><div className="w-1.5 h-3.5 bg-[#e06c75] rounded-sm"></div><div className="w-1.5 h-3.5 bg-[#444] rounded-sm"></div></div>
                            </div>
                            <span className="bg-[#29230f] border border-[#eab308]/20 text-[#eab308] text-[10px] font-extrabold px-3 py-1.5 rounded flex items-center gap-1"><Info size={12}/> LIKELY <div className="flex gap-0.5 ml-1"><div className="w-1 h-1 bg-[#eab308] rounded-full"></div><div className="w-1 h-1 bg-[#eab308] rounded-full"></div><div className="w-1 h-1 bg-[#eab308]/30 rounded-full"></div></div></span>
                          </div>
                          <p className="text-gray-100 font-extrabold text-sm mb-3">Zone: <span className="text-[#e06c75]">260,000 - 280,000</span></p>
                          <p className="text-[#a1a1aa] text-sm leading-relaxed mb-4">Around 260,000 - 280,000 has acted as a resistance zone. Price struggled to move past this area in July after breaking down from higher levels.</p>
                          <p className="text-[#a1a1aa] text-sm leading-relaxed">It is important to watch as a potential point where the momentum or reverse, offering a short entry opportunity if price is rejected.</p>
                        </div>

                        {/* Card 2: Support 200 */}
                        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 md:p-5 mb-3 shadow-inner">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="bg-[#0f2e1b] border border-[#4ade80]/20 text-[#4ade80] text-[10px] font-extrabold px-3 py-1.5 rounded">SUPPORT</span>
                              <div className="flex gap-1"><div className="w-1.5 h-3.5 bg-[#4ade80] rounded-sm"></div><div className="w-1.5 h-3.5 bg-[#4ade80] rounded-sm"></div><div className="w-1.5 h-3.5 bg-[#444] rounded-sm"></div></div>
                            </div>
                            <span className="bg-[#0f2e1b] border border-[#4ade80]/20 text-[#4ade80] text-[10px] font-extrabold px-3 py-1.5 rounded flex items-center gap-1"><Check size={12}/> CLEAR <div className="flex gap-0.5 ml-1"><div className="w-1 h-1 bg-[#4ade80] rounded-full"></div><div className="w-1 h-1 bg-[#4ade80] rounded-full"></div><div className="w-1 h-1 bg-[#4ade80] rounded-full"></div></div></span>
                          </div>
                          <p className="text-gray-100 font-extrabold text-sm mb-3">Zone: <span className="text-[#4ade80]">195,000 - 205,000</span></p>
                          <p className="text-gray-100 font-bold text-sm leading-relaxed mb-3">The recent low around 200,000 (roughly 195,000 - 205,000) served as a temporary support level, with price bouncing from it in late July/early August.</p>
                          <p className="text-[#a1a1aa] text-sm leading-relaxed mb-5">This level is crucial for understanding the immediate short-term trend. If price breaks below 200,000 again, it would signal a continuation of the downtrend and potentially target lower prices, a key risk invalidation point for any bullish short-term bets.</p>
                          <div className="border-t border-[#30363D] pt-4 flex flex-col md:flex-row gap-2 md:gap-4">
                            <span className="text-gray-100 font-bold text-xs whitespace-nowrap mt-0.5">Why this rating:</span>
                            <span className="text-[#a1a1aa] text-xs leading-relaxed">Price made a visible low point here in late July/early August, and has since bounced from it.</span>
                          </div>
                        </div>

                        {/* Card 3: Resistance 240 */}
                        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 md:p-5 shadow-inner">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className="bg-[#2d1618] border border-[#e06c75]/20 text-[#e06c75] text-[10px] font-extrabold px-3 py-1.5 rounded">RESISTANCE</span>
                              <div className="flex gap-1"><div className="w-1.5 h-3.5 bg-[#e06c75] rounded-sm"></div><div className="w-1.5 h-3.5 bg-[#e06c75] rounded-sm"></div><div className="w-1.5 h-3.5 bg-[#444] rounded-sm"></div></div>
                            </div>
                            <span className="bg-[#29230f] border border-[#eab308]/20 text-[#eab308] text-[10px] font-extrabold px-3 py-1.5 rounded flex items-center gap-1"><Info size={12}/> LIKELY <div className="flex gap-0.5 ml-1"><div className="w-1 h-1 bg-[#eab308] rounded-full"></div><div className="w-1 h-1 bg-[#eab308] rounded-full"></div><div className="w-1 h-1 border border-[#eab308] rounded-full bg-transparent"></div></div></span>
                          </div>
                          <p className="text-gray-100 font-extrabold text-sm mb-3">Zone: <span className="text-[#e06c75]">240,000</span></p>
                          <p className="text-gray-100 font-bold text-sm leading-relaxed mb-3">The area around 240,000 acted as a ceiling for price in early May before the final push higher, and the current price is testing this former pivot area.</p>
                          <p className="text-[#a1a1aa] text-sm leading-relaxed mb-5">A swing trader would watch this level closely to see if it acts as resistance to the current bounce. A clear rejection could confirm the continuation of the downtrend, while a sustained break above it might suggest the bounce has more strength.</p>
                          <div className="border-t border-[#30363D] pt-4 flex flex-col md:flex-row gap-2 md:gap-4">
                            <span className="text-gray-100 font-bold text-xs whitespace-nowrap mt-0.5">Why this rating:</span>
                            <span className="text-[#a1a1aa] text-xs leading-relaxed">This area served as a consolidation point and short-term resistance in early May, and the current bounce is approaching it.</span>
                          </div>
                        </div>
                      </div>

                      {/* Detected Patterns */}
                      <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-4 md:p-6 shadow-md mb-6">
                        <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2"><Eye size={18} className="text-[#00d060]" /> Detected Patterns</h3>
                        
                        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 md:p-5 shadow-inner">
                          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                            <h4 className="text-gray-100 font-extrabold text-lg">Bearish Reversal (Complex Top Formation)</h4>
                            <span className="bg-[#fef08a] text-[#854d0e] text-[10px] font-extrabold px-3 py-1.5 rounded flex items-center gap-1 w-fit mt-3 md:mt-0"><Info size={12}/> Likely <div className="flex gap-0.5 ml-1"><div className="w-1 h-1 bg-[#854d0e] rounded-full"></div><div className="w-1 h-1 bg-[#854d0e] rounded-full"></div><div className="w-1 h-1 border border-[#854d0e] rounded-full bg-transparent"></div></div></span>
                          </div>
                          <p className="text-[#888888] text-sm mb-5">Location: From May to August 2026</p>
                          <p className="text-[#e2e2e2] text-sm leading-relaxed mb-6">A bearish reversal pattern, especially a complex top formation, indicates that buying pressure has exhausted, and sellers have taken control. This often leads to a sustained downtrend as seen on the chart.</p>
                          
                          <div className="border-t border-[#30363D] pt-5 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                              <span className="text-gray-100 font-bold text-xs col-span-1">Why this rating:</span>
                              <span className="text-[#a1a1aa] text-xs leading-relaxed col-span-3">The chart shows a rounded top formation from May to August, characterized by a peak followed by a decline and lower highs, suggesting a shift from bullish to bearish momentum rather than a simple 'V-top'.</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
                              <span className="text-gray-100 font-bold text-xs col-span-1 mt-0.5">Keep in mind:</span>
                              <span className="text-[#a1a1aa] text-xs leading-relaxed col-span-3 italic">Patterns like this work best combined with other confirming signals, never treat as standalone. Observing follow-through price action below key support levels after such a pattern provides stronger confirmation.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                  {/* Volume Observations */}
                  <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-4 md:p-6 shadow-md">
                    <h3 className="text-lg font-bold text-gray-100 mb-6 flex items-center gap-2"><BarChart2 size={18} className="text-[#00d060]" /> Volume Observations</h3>
                    <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-3 md:p-5 shadow-inner">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#0f2e1b] border border-[#4ade80]/20 text-[#4ade80] text-[10px] font-extrabold px-3 py-1.5 rounded">VOLUME LEVEL</span>
                        </div>
                        <span className="text-gray-100 text-[11px] font-extrabold tracking-wider">MEDIUM</span>
                      </div>
                      <div className="w-full bg-[#0D1117] border border-[#30363D] h-2.5 rounded-full mb-5 overflow-hidden relative">
                        <div className="absolute top-0 left-0 bg-gradient-to-r from-[#00d060]/40 to-[#00d060] h-full w-[60%] shadow-[0_0_15px_rgba(0,208,96,0.6)] rounded-full"></div>
                      </div>
                      <p className="text-[#a1a1aa] text-sm leading-relaxed">Volume was notably higher during significant price moves, both during periods of strong buying in the uptrend (e.g., in March/April 2026) and during the recent sharp downtrend (late July/early August 2026). This suggests active trading during periods of significant price change. The current volume of 23.2 million is moderately high, accompanying the recent bounce from lows, which could be a positive sign if sustained on further upward movement.</p>
                    </div>
                  </div>

                  {/* Risk Invalidation Points */}
                  <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-4 md:p-6 shadow-md">
                    <h3 className="text-lg font-bold text-red-500 mb-6 flex items-center gap-2"><AlertCircle size={18} /> Risk Invalidation Points</h3>
                    <div className="space-y-3">
                      <div className="bg-[#161B22] border border-red-500/20 shadow-inner rounded-xl p-3 md:p-4 flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                        <p className="text-red-400/90 text-sm">If price drops and closes significantly below the recent low around 190,000-200,000, it would invalidate the current bounce and suggest a continuation of the downtrend.</p>
                      </div>
                      <div className="bg-[#161B22] border border-red-500/20 shadow-inner rounded-xl p-3 md:p-4 flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                        <p className="text-red-400/90 text-sm">If price fails to break decisively above the 260,000-270,000 resistance area and instead creates a new lower high, it would reinforce the existing downtrend.</p>
                      </div>
                    </div>
                  </div>

                  {/* What to Watch Next */}
                  <div className="bg-[#0D1117] border border-[#00d060]/30 rounded-2xl p-4 md:p-6 relative overflow-hidden shadow-[0_0_20px_rgba(0,208,96,0.05)]">
                    <div className="absolute top-0 left-0 w-full h-full bg-[#00d060]/5 pointer-events-none"></div>
                    <div className="absolute -right-10 -bottom-10 opacity-20 blur-2xl pointer-events-none"><Sparkles size={120} className="text-[#00d060]" /></div>
                    <h3 className="text-lg font-bold text-[#00d060] mb-6 flex items-center gap-2 relative z-10"><Info size={18} /> What to Watch Next</h3>
                    <div className="space-y-3 relative z-10">
                      <div className="bg-[#161B22] border border-[#30363D] shadow-inner rounded-xl p-3 md:p-4 flex gap-3">
                        <ChevronRight size={16} className="text-[#00d060] flex-shrink-0 mt-0.5" />
                        <p className="text-gray-100 text-sm">Monitor whether the recent bounce can gain further momentum and challenge the prior resistance levels (e.g., 260,000-270,000) or if it fades out, indicating the downtrend will resume.</p>
                      </div>
                      <div className="bg-[#161B22] border border-[#30363D] shadow-inner rounded-xl p-3 md:p-4 flex gap-3">
                        <ChevronRight size={16} className="text-[#00d060] flex-shrink-0 mt-0.5" />
                        <p className="text-gray-100 text-sm">Observe if the stock establishes a higher low after this bounce and then potentially a higher high, which would be an early sign of a potential short-term trend reversal for swing trades.</p>
                      </div>
                      <div className="bg-[#161B22] border border-[#30363D] shadow-inner rounded-xl p-3 md:p-4 flex gap-3">
                        <ChevronRight size={16} className="text-[#00d060] flex-shrink-0 mt-0.5" />
                        <p className="text-gray-100 text-sm">Watch if volume remains elevated during any sustained upward movement, which could suggest stronger buying interest, or if it diminishes, indicating a weaker bounce and likely return to the downtrend.</p>
                      </div>
                    </div>
                  </div>

                  {/* IN VERY SHORT */}
                  <div className="bg-[#0D1117] border border-[#30363D] rounded-2xl p-4 md:p-6 text-center shadow-md">
                    <p className="text-[#00d060] text-xs font-bold uppercase tracking-widest mb-4 flex items-center justify-center gap-2"><Zap size={14}/> IN VERY SHORT</p>
                    <p className="text-gray-100 font-bold text-base leading-relaxed mb-6">The stock experienced a strong uptrend through early 2026, peaking in mid-2026, and has since entered a significant downtrend, recently finding a temporary bounce from new lows.</p>
                    <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 md:p-5 shadow-inner">
                      <ul className="text-left space-y-3">
                        <li className="flex gap-3 text-sm text-[#a1a1aa]"><div className="w-1.5 h-1.5 rounded-full bg-[#00d060] mt-1.5 flex-shrink-0 shadow-[0_0_5px_rgba(0,208,96,0.8)]"></div> Significant uptrend from late 2025 to mid-2026, reaching highs around 370,000.</li>
                        <li className="flex gap-3 text-sm text-[#a1a1aa]"><div className="w-1.5 h-1.5 rounded-full bg-[#00d060] mt-1.5 flex-shrink-0 shadow-[0_0_5px_rgba(0,208,96,0.8)]"></div> Shifted to a clear downtrend since June 2026, breaking below multiple support levels.</li>
                        <li className="flex gap-3 text-sm text-[#a1a1aa]"><div className="w-1.5 h-1.5 rounded-full bg-[#00d060] mt-1.5 flex-shrink-0 shadow-[0_0_5px_rgba(0,208,96,0.8)]"></div> Currently exhibiting a short-term bounce from support around 200,000.</li>
                      </ul>
                    </div>
                  </div>
                    </>
                  ) : (
                    <>
                      {/* News Header */}
                      <div className="border-l-2 border-[#00d060] pl-4 mt-2">
                        <h2 className="text-2xl font-extrabold text-gray-100 mb-1 flex items-center gap-2"><Sparkles size={20} className="text-[#00d060]"/> Latest News & Market Impact</h2>
                        <p className="text-xs text-[#888888]">Real-time news analysis affecting this asset.</p>
                      </div>

                      {/* News Card 1 */}
                      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-4 md:p-6">
                        <h3 className="text-lg font-bold text-gray-100 mb-3">Wall Street flirts with a record after AI stocks rise and worries about inflation ease a bit</h3>
                        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">Wall Street is nearing a record high after several artificial intelligence (AI) stocks reported stronger-than-expected growth, and a report indicated slightly moderated inflation in the United States last month. The S&P 500 gained 0.3%, the Dow Jones...</p>
                        
                        <div className="bg-[#00d060]/5 border border-[#00d060]/20 rounded-xl p-3 md:p-5 mb-5">
                          <h4 className="text-[#00d060] font-bold text-sm mb-3 flex items-center gap-2"><Activity size={16}/> Impact Analysis</h4>
                          <p className="text-gray-100 text-sm font-semibold leading-relaxed">This news is likely to boost investor sentiment due to positive earnings from the high-growth AI sector and easing inflation concerns. This could lead to continued upward movement in stock prices, particularly for tech and growth stocks, and a generally positive chart outlook.</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#30363D]">
                          <span className="bg-[#00d060]/10 text-[#00d060] text-[10px] font-bold px-3 py-1 rounded">THE ASSOCIATE...</span>
                          <span className="text-xs text-[#666666]">August 12, 2026, 8:23 a.m. Updated</span>
                        </div>
                      </div>

                      {/* News Card 2 */}
                      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-4 md:p-6">
                        <h3 className="text-lg font-bold text-gray-100 mb-3">Stock Market Today (Aug. 12, 2026): S&P 500 climbs following key inflation report</h3>
                        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">Stocks advanced after a key inflation report showed the Consumer Price Index (CPI) rose 0.1% in July on a seasonally adjusted basis, with an annual rate of 3.4%, both in line with forecasts. Upbeat earnings from technology companies, particularly AI...</p>
                        
                        <div className="bg-[#00d060]/5 border border-[#00d060]/20 rounded-xl p-3 md:p-5 mb-5">
                          <h4 className="text-[#00d060] font-bold text-sm mb-3 flex items-center gap-2"><Activity size={16}/> Impact Analysis</h4>
                          <p className="text-gray-100 text-sm font-semibold leading-relaxed">The in-line CPI report reinforces expectations for the Federal Reserve to hold interest rates steady, which is positive for market stability and investor confidence. Strong earnings from major AI players will likely drive continued interest and investment in the technology sector, potentially pushing their stock prices higher and improving overall market breadth.</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#30363D]">
                          <span className="bg-[#00d060]/10 text-[#00d060] text-[10px] font-bold px-3 py-1 rounded">INVESTOPEDIA</span>
                          <span className="text-xs text-[#666666]">August 12, 2026, 12:03 PM EDT</span>
                        </div>
                      </div>

                      {/* News Card 3 */}
                      <div className="bg-[#161B22] border border-[#30363D] rounded-2xl p-4 md:p-6">
                        <h3 className="text-lg font-bold text-gray-100 mb-3">US Premarket Movers for August 12, 2026</h3>
                        <p className="text-[#a1a1aa] text-sm leading-relaxed mb-6">S&P 500 Index futures were up 0.3% in premarket trading as upbeat results from AI infrastructure firms boosted appetite for tech stocks ahead of a key US inflation reading. Notable movers included H&R Block (HRB) climbing 12% on a strong full-...</p>
                        
                        <div className="bg-[#00d060]/5 border border-[#00d060]/20 rounded-xl p-3 md:p-5 mb-5">
                          <h4 className="text-[#00d060] font-bold text-sm mb-3 flex items-center gap-2"><Activity size={16}/> Impact Analysis</h4>
                          <p className="text-gray-100 text-sm font-semibold leading-relaxed">Positive premarket movers indicate strong investor confidence fueled by better-than-expected corporate earnings, especially in the tech and AI sectors. This suggests a bullish opening for the market, driving up individual stock prices for companies with strong forecasts and positively influencing broader investor sentiment and overall market charts for the day.</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#30363D]">
                          <span className="bg-[#00d060]/10 text-[#00d060] text-[10px] font-bold px-3 py-1 rounded">FINANCIAL POST</span>
                          <span className="text-xs text-[#666666]">August 12, 2026</span>
                        </div>
                      </div>
                    </>
                  )}

                </div>
                {/* Scroll Fade Bottom */}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#111111] to-transparent z-10 pointer-events-none"></div>
              </div>
            </div>

            {/* Floating Chat Input Mockup (Centered at bottom) */}
            <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-30 flex-col items-center pointer-events-none">
              <Link to="/onboarding" className="w-full bg-[#222222]/95 backdrop-blur-md border border-[#333333] rounded-full px-6 py-3.5 flex items-center justify-between shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:border-[#444] transition-colors cursor-pointer group pointer-events-auto">
                <span className="text-[#888888] text-sm group-hover:text-gray-300 transition-colors">Ask anything</span>
                <div className="w-8 h-8 rounded-full bg-[#333333] flex items-center justify-center text-[#555555] group-hover:text-gray-100 group-hover:bg-[#00d060] transition-colors">
                  <Send size={14} />
                </div>
              </Link>
              <p className="text-center text-[10px] text-[#555555] mt-2 drop-shadow-md">For educational purposes only. Not financial advice.</p>
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-5 sm:px-8 py-24 relative">
        {/* Subtle green glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-[#00d060] opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0"></div>
        
        <div className="mb-14 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-xs px-3 py-1 rounded-full mb-4">
            <span className="opacity-70">&lt;/&gt;</span> HOW IT WORKS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-tight">Get answers in 3 steps</h2>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center md:items-start gap-8 md:gap-6 relative z-10">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[88px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#00d060]/30 to-transparent z-0"></div>
          
          {[
            { num: "01", title: "Upload your chart", desc: "Take a photo or upload a screenshot from any platform — TradingView, your broker app, anywhere.", Icon: Target },
            { num: "02", title: "AI reads it instantly", desc: "Our AI identifies trends, patterns, support/resistance zones, volume, and momentum — automatically.", Icon: Zap },
            { num: "03", title: "Read plain-English insights", desc: "No jargon. No black-box scores. Just a clear, structured breakdown you can actually understand.", Icon: BookOpen },
          ].map((step, i) => (
            <div 
              key={i} 
              className="relative z-10 w-full md:w-1/3 bg-[#0D1117]/80 backdrop-blur-2xl border border-[#ffffff08] rounded-[2rem] p-8 md:p-10 hover:border-[#00d060]/40 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,208,96,0.1)] group overflow-hidden"
            >
              {/* Massive background number */}
              <div className="absolute -right-4 -bottom-6 text-[160px] font-black text-gray-100/[0.02] group-hover:text-[#00d060]/[0.05] transition-colors duration-500 select-none pointer-events-none leading-none tracking-tighter">
                {step.num}
              </div>
              
              <div className="w-14 h-14 bg-[#161B22] border border-[#30363D] group-hover:border-[#00d060]/50 text-[#00d060] rounded-2xl flex items-center justify-center mb-8 relative transition-colors duration-500 shadow-lg">
                <div className="absolute inset-0 bg-[#00d060] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"></div>
                <step.Icon size={24} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <h3 className="text-xl font-extrabold text-gray-100 mb-4 transition-colors duration-300 relative z-10">{step.title}</h3>
              <p className="text-[#888888] text-sm leading-relaxed relative z-10 group-hover:text-[#aaaaaa] transition-colors duration-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-5 sm:px-8 relative overflow-hidden">
        {/* Green Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 208, 96, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 208, 96, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}
        ></div>
        {/* Gradients to fade out the grid at the edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none z-0"></div>
        
        {/* Central subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00d060] opacity-[0.04] blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-14">
            <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-xs px-3 py-1 rounded-full mb-4 border border-[#00d060]/20">
              <span className="opacity-70">&lt;/&gt;</span> FEATURES
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-tight max-w-2xl">Everything you need to read any chart</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            {/* Top Wide Box */}
            <div className="md:col-span-2 bg-[#00d060]/[0.02] backdrop-blur-2xl border border-[#00d060]/10 hover:border-[#00d060]/30 transition-colors duration-500 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-12 overflow-hidden relative group shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {/* Left Content */}
              <div className="flex-1 z-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-[10px] sm:text-xs px-3 py-1 rounded-full mb-6 w-max border border-[#00d060]/20 shadow-[0_0_15px_rgba(0,208,96,0.1)]">
                  <span className="opacity-70">&lt;/&gt;</span> AI SUMMARY
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-100 mb-4 tracking-tight">Instant Chart Analysis</h3>
                <p className="text-[#a1a1aa] text-lg leading-relaxed max-w-md">You can upload chart screenshots from any platform and get a complete breakdown of trends, patterns, and support/resistance zones.</p>
              </div>
              
              {/* Right Mockup */}
              <div className="flex-1 relative min-h-[250px] md:min-h-[300px]">
                <div className="absolute top-0 md:top-1/2 md:-translate-y-1/2 right-0 w-[120%] md:w-[130%] bg-gradient-to-br from-[#111111]/95 to-[#050505]/95 backdrop-blur-xl border border-[#333333] rounded-tl-3xl rounded-bl-3xl p-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col gap-4 overflow-hidden group/mockup">
                  {/* Subtle animated background glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#3B82F6] opacity-[0.15] blur-[50px] rounded-full group-hover/mockup:opacity-[0.25] transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                    <div className="bg-[#161B22]/80 backdrop-blur-md rounded-2xl p-6 border border-[#2a2a2a] flex flex-col items-center justify-center gap-3 hover:bg-[#1c1c1c] hover:border-[#00d060]/50 hover:shadow-[0_0_25px_rgba(0,208,96,0.15)] transition-all duration-300 cursor-default group">
                      <div className="text-[#00d060] group-hover:scale-110 transition-transform duration-300 relative">
                        <Activity size={28} className="relative z-10" />
                        <div className="absolute inset-0 bg-[#00d060] blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>
                      <p className="text-[#888888] group-hover:text-gray-100 text-xs font-bold transition-colors">Upload Chart</p>
                    </div>
                    <div className="bg-[#161B22]/80 backdrop-blur-md rounded-2xl p-5 border border-[#2a2a2a] flex flex-col justify-center hover:border-[#444] transition-colors relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00d060]/50 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                      <p className="text-[#00d060] text-[10px] uppercase font-bold mb-1.5 tracking-wider flex items-center gap-1.5"><TrendingUp size={12}/> Trend Analysis</p>
                      <p className="text-gray-100 font-extrabold text-sm sm:text-base">Bullish Flag</p>
                    </div>
                    <div className="bg-[#161B22]/80 backdrop-blur-md rounded-2xl p-5 border border-[#2a2a2a] flex flex-col justify-center hover:border-[#444] transition-colors">
                      <p className="text-[#888888] text-[10px] uppercase font-bold mb-1.5 tracking-wider">Key Support</p>
                      <p className="text-gray-100 font-extrabold text-sm sm:text-base flex items-baseline gap-1"><span className="text-[#00d060]">$</span>45,200</p>
                    </div>
                    <div className="bg-[#161B22]/80 backdrop-blur-md rounded-2xl p-5 border border-[#2a2a2a] flex flex-col justify-center hover:border-[#444] transition-colors">
                      <p className="text-[#888888] text-[10px] uppercase font-bold mb-1.5 tracking-wider">Key Resistance</p>
                      <p className="text-gray-100 font-extrabold text-sm sm:text-base flex items-baseline gap-1"><span className="text-[#f87171]">$</span>48,500</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Left Box */}
            <div className="bg-[#00d060]/[0.02] backdrop-blur-2xl border border-[#00d060]/10 hover:border-[#00d060]/30 transition-colors duration-500 rounded-[32px] p-8 md:p-10 flex flex-col overflow-hidden relative group min-h-[450px] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-[10px] sm:text-xs px-3 py-1 rounded-full mb-6 w-max border border-[#00d060]/20 z-10 shadow-[0_0_15px_rgba(0,208,96,0.1)]">
                <span className="opacity-70">&lt;/&gt;</span> DUAL MODES
              </div>
              <h3 className="text-3xl font-extrabold text-gray-100 mb-3 tracking-tight z-10">Technical & News</h3>
              <p className="text-[#a1a1aa] text-[15px] leading-relaxed max-w-sm z-10 relative mb-8">Get the complete picture. Seamlessly toggle between deep technical charting breakdowns and real-time fundamental news impact with a single click.</p>
              
              <div className="mt-auto w-full flex justify-center relative z-10">
                <div className="w-[90%] bg-gradient-to-b from-[#161616]/95 to-[#0a0a0a]/95 backdrop-blur-2xl border border-[#333333] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center gap-5 relative overflow-hidden group/card hover:border-[#00d060]/40 transition-colors duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00d060]/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  {/* Mock Toggle */}
                  <div className="flex items-center bg-[#0D1117] border border-[#30363D] rounded-xl overflow-hidden p-1.5 shadow-inner w-full max-w-[220px] relative z-10">
                    <div className="flex-1 text-center py-2 rounded-lg font-extrabold text-sm bg-[#00d060] text-black shadow-md cursor-default">Technical</div>
                    <div className="flex-1 text-center py-2 rounded-lg font-bold text-sm text-[#888888] cursor-default">News</div>
                  </div>
                  
                  <div className="w-full py-3 rounded-xl bg-[#161B22] border border-[#333333] hover:border-[#00d060] text-gray-100 text-xs font-extrabold hover:bg-[#00d060] hover:text-black transition-all duration-300 flex items-center justify-center gap-2 mt-1 relative z-10 shadow-lg group cursor-default">
                    SWITCH CONTEXT <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none opacity-60"></div>
            </div>

            {/* Bottom Right Box */}
            <div className="bg-[#00d060]/[0.02] backdrop-blur-2xl border border-[#00d060]/10 hover:border-[#00d060]/30 transition-colors duration-500 rounded-[32px] p-8 md:p-10 flex flex-col overflow-hidden relative group min-h-[450px] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-[10px] sm:text-xs px-3 py-1 rounded-full mb-6 w-max border border-[#00d060]/20 z-10 shadow-[0_0_15px_rgba(0,208,96,0.1)]">
                <span className="opacity-70">&lt;/&gt;</span> AI NOTES
              </div>
              <h3 className="text-3xl font-extrabold text-gray-100 mb-3 tracking-tight z-10">AI Chat & Q&A</h3>
              <p className="text-[#a1a1aa] text-[15px] leading-relaxed max-w-sm z-10 relative mb-8">Have a specific doubt? Use the interactive question bar to ask anything about the chart's technicals and get detailed, high-quality answers instantly.</p>
              
              <div className="mt-auto w-full flex justify-center relative z-10">
                <div className="w-[90%] bg-gradient-to-br from-[#161616]/95 to-[#0a0a0a]/95 backdrop-blur-2xl border border-[#333333] rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-4 relative group/chat hover:border-[#00d060]/30 transition-colors duration-500">
                  <div className="flex items-center justify-between border-b border-[#2a2a2a] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#161B22] flex items-center justify-center overflow-hidden border-2 border-[#333333]">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" className="w-full h-full object-cover" alt="User" />
                      </div>
                      <div>
                        <p className="text-gray-100 font-extrabold text-sm flex items-center gap-1.5">AI Analyst <Sparkles size={12} className="text-[#00d060]"/></p>
                        <p className="text-[#00d060] text-[10px] font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00d060] animate-pulse"></span> Online</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#161B22] rounded-2xl rounded-tl-sm p-4 border border-[#2a2a2a] shadow-inner relative">
                    <p className="text-[#d1d1d1] text-sm leading-relaxed">The chart shows a clear breakout above the 50-day moving average. Volume is strongly confirming the upward momentum. <span className="inline-block px-1.5 py-0.5 bg-[#00d060]/20 text-[#00d060] rounded font-mono text-[10px] ml-1 border border-[#00d060]/30 cursor-pointer hover:bg-[#00d060] hover:text-black transition-colors">View Details</span></p>
                  </div>
                  
                  <div className="absolute -right-6 -bottom-6 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] backdrop-blur-xl border border-[#444] rounded-2xl p-4 shadow-[0_15px_30px_rgba(0,0,0,0.9)] z-20 w-[200px] hover:border-[#00d060] transition-colors duration-300">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-7 h-7 rounded-full bg-[#00d060] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,208,96,0.4)]">
                        <CheckCircle2 size={16} className="text-black" />
                      </div>
                      <div>
                        <p className="text-gray-100 font-extrabold text-xs mb-0.5">Analysis Ready</p>
                        <p className="text-[#888888] text-[10px] leading-tight">Key levels and patterns mapped.</p>
                      </div>
                    </div>
                    <div className="block text-center w-full py-2 rounded-xl bg-[#222] border border-[#444] hover:border-[#00d060] text-gray-100 text-[11px] font-extrabold hover:bg-[#00d060] hover:text-black transition-all duration-300 shadow-md cursor-default">
                      OPEN REPORT
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* MACRO & NEWS SECTION */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-[40%] h-[40%] bg-[#00d060] opacity-[0.03] blur-[150px] rounded-full pointer-events-none z-0"></div>
        
        <div className="mb-14 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-xs px-3 py-1 rounded-full mb-4 border border-[#00d060]/20">
            <span className="opacity-70">&lt;/&gt;</span> MACRO CONTEXT
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-tight">Trade with the full picture</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Top Stories */}
          <div className="lg:col-span-5 bg-[#0D1117]/80 backdrop-blur-xl border border-[#30363D] rounded-3xl p-6 md:p-8 flex flex-col shadow-lg">
            <h3 className="text-xl font-extrabold text-gray-100 mb-6 flex items-center gap-2">Top stories <ChevronRight size={20} className="text-[#888888]"/></h3>
            <div className="flex flex-col gap-5 flex-1">
              {[
                { ticker: "RDDT", title: "Reddit Stock Rockets 12% on S&P 500 Promotion. Passive Funds Must Buy", time: "yesterday", color: "bg-orange-500" },
                { ticker: "NFLX", title: "Netflix Stock Jumps 5% as Bill Ackman Returns for the Sequel. Red Light, Green Light?", time: "yesterday", color: "bg-red-600" },
                { ticker: "SPX", title: "S&P 500 Hits Record Just Under 7,800 as Inflation Cools Down at Factory Gate", time: "yesterday", color: "bg-blue-500" },
                { ticker: "GBP/USD", title: "Pound Wobbles as UK Growth Slows to 0.4%. Inflation Trouble Ahead?", time: "2 days ago", color: "bg-[#00d060]" },
                { ticker: "NBIS", title: "Nebius Stock Explodes 34% as Red-Hot AI Demand Outruns Data Center Buildout", time: "2 days ago", color: "bg-yellow-500" }
              ].map((news, i) => (
                <div key={i} className="group cursor-pointer border-b border-[#30363D] pb-5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 text-xs text-[#888888] mb-2 font-medium">
                    <div className={`w-4 h-4 rounded-full ${news.color} flex items-center justify-center text-[7px] text-white font-bold overflow-hidden`}>{news.ticker.substring(0, 2)}</div>
                    <span>{news.time}</span> <span className="w-1 h-1 rounded-full bg-[#30363D]"></span> <span>PatternFlow</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-gray-200 leading-snug group-hover:text-[#00d060] transition-colors">{news.title}</h4>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-[#30363D]">
              <span className="text-[#3B82F6] hover:text-[#60A5FA] text-sm font-bold flex items-center gap-1 cursor-pointer transition-colors">Keep reading <ChevronRight size={16}/></span>
            </div>
          </div>

          {/* Economy & Calendar */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Economy Map */}
            <div className="bg-[#0D1117]/80 backdrop-blur-xl border border-[#30363D] rounded-3xl p-6 md:p-8 flex flex-col shadow-lg flex-1">
              <h3 className="text-xl font-extrabold text-gray-100 mb-2 flex items-center gap-2">Economy <ChevronRight size={20} className="text-[#888888]"/></h3>
              <p className="text-sm font-bold text-gray-300 mb-6 flex items-center gap-2">Global inflation map <ChevronRight size={16} className="text-[#888888]"/></p>
              
              <div className="flex-1 w-full flex flex-col items-center justify-center py-4 relative min-h-[200px]">
                {/* Abstract World Map Representation */}
                <div className="w-full max-w-lg h-full absolute inset-0 mx-auto opacity-70" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', filter: 'invert(0.5) sepia(1) hue-rotate(80deg) saturate(3) opacity(0.4)' }}>
                </div>
                {/* Heatmap Dots overlaying the map */}
                <div className="absolute top-[30%] left-[30%] w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,1)]"></div>
                <div className="absolute top-[40%] left-[35%] w-2 h-2 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)]"></div>
                <div className="absolute top-[25%] left-[55%] w-4 h-4 rounded-full bg-[#00d060] shadow-[0_0_15px_rgba(0,208,96,1)]"></div>
                <div className="absolute top-[45%] left-[65%] w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,1)]"></div>
                <div className="absolute top-[60%] left-[40%] w-3 h-3 rounded-full bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,1)]"></div>
                <div className="absolute top-[50%] left-[75%] w-3 h-3 rounded-full bg-[#00d060] shadow-[0_0_15px_rgba(0,208,96,1)]"></div>

                {/* Legend */}
                <div className="w-full max-w-sm mt-auto relative z-10 flex flex-col gap-2 pt-8">
                  <div className="flex justify-between text-[10px] text-[#888888] font-bold px-1">
                    <span>0%</span>
                    <span>7%</span>
                    <span>25%</span>
                  </div>
                  <div className="h-2 w-full flex rounded-full overflow-hidden">
                    <div className="flex-1 bg-[#161B22] border-r border-[#0D1117]"></div>
                    <div className="flex-1 bg-yellow-500/80 border-r border-[#0D1117]"></div>
                    <div className="flex-1 bg-orange-400/80 border-r border-[#0D1117]"></div>
                    <div className="flex-1 bg-orange-600/80 border-r border-[#0D1117]"></div>
                    <div className="flex-1 bg-red-600/80"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <span className="text-[#3B82F6] hover:text-[#60A5FA] text-sm font-bold flex items-center gap-1 cursor-pointer transition-colors">See more global trends <ChevronRight size={16}/></span>
              </div>
            </div>

            {/* Economic Calendar */}
            <div className="bg-[#0D1117]/80 backdrop-blur-xl border border-[#30363D] rounded-3xl p-6 md:p-8 flex flex-col shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-extrabold text-gray-100 flex items-center gap-2">Economic Calendar <ChevronRight size={20} className="text-[#888888]"/></h3>
                <div className="text-[#888888] hover:text-gray-200 cursor-pointer transition-colors font-mono font-bold tracking-widest">&lt;/&gt;</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { date: "Aug 17", time: "05:20", title: "GDP Capital Expenditure Q...", actual: "—", forecast: "0.4%", prior: "-0.7%", impact: "red" },
                  { date: "Aug 17", time: "05:20", title: "GDP External Demand Q...", actual: "—", forecast: "0.3%", prior: "-0.3%", impact: "red" }
                ].map((event, i) => (
                  <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-2xl p-4 md:p-5 hover:border-[#444] transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center text-[11px] text-[#888888] font-bold mb-3">
                      <span>{event.date} &bull; {event.time}</span>
                      <BarChart2 size={12} className="text-[#3B82F6] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-5 h-5 rounded-full bg-[#111] border border-[#333] flex items-center justify-center flex-shrink-0">
                        <div className={`w-2 h-2 rounded-full ${event.impact === 'red' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-yellow-500'}`}></div>
                      </div>
                      <p className="text-sm font-bold text-gray-200 truncate group-hover:text-[#00d060] transition-colors">{event.title}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#666666] font-bold mb-0.5 uppercase tracking-wider">Actual</span>
                        <span className="text-[15px] font-extrabold text-gray-200">{event.actual}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#666666] font-bold mb-0.5 uppercase tracking-wider">Forecast</span>
                        <span className="text-[15px] font-extrabold text-gray-200">{event.forecast}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[#666666] font-bold mb-0.5 uppercase tracking-wider">Prior</span>
                        <span className="text-[15px] font-extrabold text-gray-200">{event.prior}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <span className="text-[#3B82F6] hover:text-[#60A5FA] text-sm font-bold flex items-center gap-1 cursor-pointer transition-colors">See all market events <ChevronRight size={16}/></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 relative max-w-7xl mx-auto px-5 sm:px-8 border-t border-[#111111]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-100 tracking-tight mb-4">From chart to strategy in 3 seconds</h2>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto">No complex setup. Just upload your chart and let PatternFlow do the heavy lifting, explaining everything in simple terms.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-[#161B22] via-[#30363D] to-[#161B22] z-0"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-2xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center mb-6 shadow-xl group-hover:border-[#00d060]/50 transition-colors">
              <Upload size={40} className="text-[#00d060]" />
            </div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#161B22] border border-[#30363D] text-gray-100 font-bold mb-4 shadow-inner">1</div>
            <h3 className="text-xl font-bold text-gray-100 mb-3">Upload any chart</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">Take a screenshot from TradingView, your broker app, or anywhere else. Stocks, forex, or crypto — it doesn't matter.</p>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-2xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center mb-6 shadow-xl group-hover:border-[#00d060]/50 transition-colors">
              <Activity size={40} className="text-[#00d060]" />
            </div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#161B22] border border-[#30363D] text-gray-100 font-bold mb-4 shadow-inner">2</div>
            <h3 className="text-xl font-bold text-gray-100 mb-3">AI processes the data</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">Our system instantly maps support, resistance, trends, and volume using institutional-grade technical analysis.</p>
          </div>
          
          <div className="relative z-10 flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-2xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center mb-6 shadow-xl group-hover:border-[#00d060]/50 transition-colors">
              <BookOpen size={40} className="text-[#00d060]" />
            </div>
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#161B22] border border-[#30363D] text-gray-100 font-bold mb-4 shadow-inner">3</div>
            <h3 className="text-xl font-bold text-gray-100 mb-3">Get a simple explanation</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">Read a jargon-free summary explaining exactly what the chart is doing. We translate complex indicators into simple English.</p>
          </div>
        </div>
      </section>

      {/* FEATURES / BENEFITS GRID */}
      <section className="py-24 relative bg-[#0D1117] border-y border-[#111111]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-100 tracking-tight mb-4">Built for clarity. Built for any market.</h2>
            <p className="text-[#888888] text-lg max-w-2xl mx-auto">We cut through the noise so you can focus on finding high-probability setups without needing a finance degree.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#161B22] border border-[#30363D] rounded-3xl p-8 hover:border-[#00d060]/30 transition-all duration-300 shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <BookOpen size={24} className="text-[#00d060]" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">No Jargon, Just English</h3>
              <p className="text-[#a1a1aa] leading-relaxed text-sm">We don't spit out complex technical terms. We explain exactly what is happening on the chart in simple, easy-to-understand language that anyone can grasp.</p>
            </div>
            
            <div className="bg-[#161B22] border border-[#30363D] rounded-3xl p-8 hover:border-[#00d060]/30 transition-all duration-300 shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <Globe size={24} className="text-[#00d060]" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Stocks, Forex & Crypto</h3>
              <p className="text-[#a1a1aa] leading-relaxed text-sm">A chart is a chart. Whether you are trading Apple stock, the EUR/USD forex pair, or Bitcoin, our AI applies universal technical principles to find the edge.</p>
            </div>
            
            <div className="bg-[#161B22] border border-[#30363D] rounded-3xl p-8 hover:border-[#00d060]/30 transition-all duration-300 shadow-md group">
              <div className="w-12 h-12 rounded-xl bg-[#0D1117] border border-[#30363D] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <Target size={24} className="text-[#00d060]" />
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-3">Unbiased Precision</h3>
              <p className="text-[#a1a1aa] leading-relaxed text-sm">The AI doesn't have emotions or FOMO. It objectively maps support, resistance, and trend structure so you can trade what you see, not what you feel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-xs px-3 py-1 rounded-full mb-4 border border-[#00d060]/20 shadow-[0_0_15px_rgba(0,208,96,0.1)]">
            <Sparkles size={14}/> TRUSTED BY TRADERS
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-100 tracking-tight mb-4">Don't just take our word for it</h2>
        </div>
        
        <div className="relative w-full overflow-hidden flex flex-col gap-6 bg-transparent py-4 group">
          {/* Edge Gradients for smooth fade in/out */}
          <div className="absolute top-0 left-0 w-16 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>
          
          {/* First Row: Right to Left */}
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap gap-6 w-max pl-6">
            {[
              { name: "Michael R.", role: "Forex Trader", review: "Finally, an AI that doesn't just throw indicators at me. It actually explains the 'why' behind the setup in plain English. My win rate has noticeably improved.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Sarah J.", role: "Stock Swing Trader", review: "I used to spend 2 hours every night analyzing charts. Now I just upload the ones on my watchlist and let PatternFlow do the heavy lifting. Incredible time saver.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "David K.", role: "Crypto Enthusiast", review: "The way it breaks down complex crypto charts into simple, actionable zones is a game changer. It forces me to be objective when I'm feeling FOMO.", img: "https://randomuser.me/api/portraits/men/85.jpg" },
              { name: "Elena M.", role: "Day Trader", review: "It catches patterns I completely missed. The plain English explanation is a lifesaver when the market is moving fast. Simply unmatched.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
              { name: "James T.", role: "Options Trader", review: "I use this to validate my own technical analysis before taking a position. Unbiased and incredibly precise. Highly recommended.", img: "https://randomuser.me/api/portraits/men/22.jpg" },
              { name: "Michael R.", role: "Forex Trader", review: "Finally, an AI that doesn't just throw indicators at me. It actually explains the 'why' behind the setup in plain English. My win rate has noticeably improved.", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Sarah J.", role: "Stock Swing Trader", review: "I used to spend 2 hours every night analyzing charts. Now I just upload the ones on my watchlist and let PatternFlow do the heavy lifting. Incredible time saver.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
              { name: "David K.", role: "Crypto Enthusiast", review: "The way it breaks down complex crypto charts into simple, actionable zones is a game changer. It forces me to be objective when I'm feeling FOMO.", img: "https://randomuser.me/api/portraits/men/85.jpg" },
              { name: "Elena M.", role: "Day Trader", review: "It catches patterns I completely missed. The plain English explanation is a lifesaver when the market is moving fast. Simply unmatched.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
              { name: "James T.", role: "Options Trader", review: "I use this to validate my own technical analysis before taking a position. Unbiased and incredibly precise. Highly recommended.", img: "https://randomuser.me/api/portraits/men/22.jpg" }
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-3xl p-6 relative shadow-md w-[320px] md:w-[400px] flex-shrink-0 whitespace-normal flex flex-col">
                <div className="flex gap-1 mb-4 text-[#00d060] text-lg tracking-widest font-serif">
                  ★★★★★
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-6 font-medium italic flex-grow">"{item.review}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#0D1117] border border-[#30363D] flex items-center justify-center flex-shrink-0 shadow-inner overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-gray-100 font-bold text-sm">{item.name}</p>
                    <p className="text-[#00d060] text-xs font-semibold">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row: Left to Right */}
          <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused] whitespace-nowrap gap-6 w-max pl-6 ml-[-50px]">
            {[
              { name: "John S.", role: "Prop Firm Trader", review: "The volume analysis is surprisingly nuanced. It correctly identified a bull trap that I was about to fall for.", img: "https://randomuser.me/api/portraits/men/52.jpg" },
              { name: "Linda P.", role: "Crypto Investor", review: "I'm not a professional, but this tool gives me the confidence to make my own decisions without blindly following Twitter influencers.", img: "https://randomuser.me/api/portraits/women/25.jpg" },
              { name: "Marcus T.", role: "Algorithmic Trader", review: "Clean interface, fast processing, and the AI's understanding of market structure is on par with senior analysts. Very impressed.", img: "https://randomuser.me/api/portraits/men/73.jpg" },
              { name: "Sophia R.", role: "Forex Scalper", review: "I use the short-term bias feature constantly. It helps me filter out bad setups when the 15m chart gets choppy.", img: "https://randomuser.me/api/portraits/women/59.jpg" },
              { name: "Alex W.", role: "Part-time Trader", review: "Worth every penny. The way it breaks down risk invalidation points keeps me from holding onto losing trades too long.", img: "https://randomuser.me/api/portraits/men/46.jpg" },
              { name: "John S.", role: "Prop Firm Trader", review: "The volume analysis is surprisingly nuanced. It correctly identified a bull trap that I was about to fall for.", img: "https://randomuser.me/api/portraits/men/52.jpg" },
              { name: "Linda P.", role: "Crypto Investor", review: "I'm not a professional, but this tool gives me the confidence to make my own decisions without blindly following Twitter influencers.", img: "https://randomuser.me/api/portraits/women/25.jpg" },
              { name: "Marcus T.", role: "Algorithmic Trader", review: "Clean interface, fast processing, and the AI's understanding of market structure is on par with senior analysts. Very impressed.", img: "https://randomuser.me/api/portraits/men/73.jpg" },
              { name: "Sophia R.", role: "Forex Scalper", review: "I use the short-term bias feature constantly. It helps me filter out bad setups when the 15m chart gets choppy.", img: "https://randomuser.me/api/portraits/women/59.jpg" },
              { name: "Alex W.", role: "Part-time Trader", review: "Worth every penny. The way it breaks down risk invalidation points keeps me from holding onto losing trades too long.", img: "https://randomuser.me/api/portraits/men/46.jpg" }
            ].map((item, i) => (
              <div key={i} className="bg-[#161B22] border border-[#30363D] rounded-3xl p-6 relative shadow-md w-[320px] md:w-[400px] flex-shrink-0 whitespace-normal flex flex-col">
                <div className="flex gap-1 mb-4 text-[#00d060] text-lg tracking-widest font-serif">
                  ★★★★★
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-6 font-medium italic flex-grow">"{item.review}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-[#0D1117] border border-[#30363D] flex items-center justify-center flex-shrink-0 shadow-inner overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-gray-100 font-bold text-sm">{item.name}</p>
                    <p className="text-[#00d060] text-xs font-semibold">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS WITH ANY CHART */}
      <section className="hidden md:block max-w-7xl mx-auto px-5 sm:px-8 py-24 relative">
        <div className="absolute top-1/2 right-1/4 w-[60%] h-[60%] bg-[#00d060] opacity-[0.03] blur-[150px] rounded-full pointer-events-none z-0"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-xs px-3 py-1 rounded-full mb-4">
              <span className="opacity-70">&lt;/&gt;</span> UNIVERSAL
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-tight mb-6">Works with any chart, from any platform</h2>
            <p className="text-[#888888] text-lg leading-relaxed mb-8">Whether it is a screenshot from your broker app, a TradingView chart, or a photo from your phone — just upload it.</p>
            <ul className="space-y-3">
              {["Stocks & ETFs", "Crypto (BTC, ETH, altcoins)", "Forex pairs", "Indices (S&P 500, NASDAQ)", "Commodities (Gold, Oil)"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[#a1a1aa] text-sm font-medium">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:grid grid-cols-3 gap-4">
            {[
              { name: "TradingView", img: "https://cdn.simpleicons.org/tradingview", color: "#2962FF" },
              { name: "Zerodha", img: "https://cdn.simpleicons.org/zerodha", color: "#387ED1" },
              { name: "Binance", img: "https://cdn.simpleicons.org/binance", color: "#F3BA2F" },
              { name: "Robinhood", img: "https://cdn.simpleicons.org/robinhood", color: "#00C805" },
              { name: "Upstox", icon: TrendingUp, color: "#533278" },
              { name: "Any App", icon: Smartphone, color: "#00d060" },
              { name: "Coinbase", img: "https://cdn.simpleicons.org/coinbase", color: "#0052FF" },
              { name: "Angel One", icon: Activity, color: "#FF6600" },
              { name: "Screenshot", icon: Camera, color: "#00d060" },
            ].map((p, i) => (
              <div 
                key={i} 
                className="bg-[#161B22]/50 backdrop-blur-md border border-[#2a2a2a] rounded-2xl p-4 flex flex-col items-center justify-center text-center h-[100px] transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
                style={{ "--brand": p.color }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(to top, var(--brand)15, transparent)`, opacity: 0.15 }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 10px 20px var(--brand)20, inset 0 0 0 1px var(--brand)` }}
                ></div>
                
                {p.img ? (
                  <div className="relative h-7 w-7 mb-3 transition-all duration-300 group-hover:scale-110 z-10 flex items-center justify-center">
                    <img src={`${p.img}/${p.color.replace('#', '')}`} alt={p.name} className="h-full w-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ) : p.icon ? (
                  <div className="relative h-7 w-7 mb-3 transition-all duration-300 group-hover:scale-110 z-10 flex items-center justify-center">
                    <p.icon size={28} className="opacity-90 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--brand)" }} />
                  </div>
                ) : null}
                <span className="text-[11px] font-extrabold text-[#777777] group-hover:text-gray-100 transition-colors relative z-10 tracking-wide uppercase">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE SECTION */}
      <section className="py-24 relative overflow-hidden bg-[#0D1117] border-y border-[#111111]">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00d060]/5 to-transparent"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#00d060]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* Left side: Founder Image */}
            <div className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Outer decorative rings */}
              <div className="absolute inset-0 rounded-full border border-[#30363D] scale-110"></div>
              <div className="absolute inset-0 rounded-full border border-[#00d060]/20 scale-105"></div>
              
              {/* Image container */}
              <div className="w-full h-full rounded-full overflow-hidden border border-[#333333] relative z-10 bg-[#161B22] p-2 shadow-[0_0_50px_rgba(0,208,96,0.1)]">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Founder" 
                  className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-4 -right-4 lg:bottom-10 lg:-right-8 bg-[#161B22] border border-[#30363D] rounded-2xl p-4 shadow-xl z-20 flex items-center gap-3 animate-fade-in-up">
                <div className="w-10 h-10 rounded-full bg-[#00d060]/10 flex items-center justify-center">
                  <CheckCircle2 size={20} className="text-[#00d060]" />
                </div>
                <div>
                  <p className="text-gray-100 text-xs font-bold uppercase tracking-wider">Built for</p>
                  <p className="text-[#00d060] text-sm font-extrabold">Real Traders</p>
                </div>
              </div>
            </div>
            
            {/* Right side: Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[#00d060] font-bold text-xs uppercase tracking-widest mb-8">
                <div className="w-12 h-px bg-[#00d060]/50"></div>
                A NOTE FROM THE FOUNDER
              </div>
              
              <div className="relative">
                <div className="absolute -top-10 -left-8 text-[#00d060]/10 font-serif text-[100px] leading-none pointer-events-none select-none hidden lg:block">
                  "
                </div>
                
                <h3 className="text-gray-100 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.2] mb-8 tracking-tight">
                  I built PatternFlow because I was tired of black-box trading alerts built on fake confidence.
                </h3>
                
                <p className="text-[#a1a1aa] text-lg md:text-xl leading-relaxed mb-10 font-medium">
                  You don't need a robot telling you to blindly buy or sell. You need absolute clarity, institutional-grade pattern recognition, and an AI <img src="/landing-emoji-1.png" alt="Brain" className="inline-block w-6 h-6 md:w-8 md:h-8 align-middle mx-1 -mt-1 drop-shadow-md" /> that breaks down the market exactly as it is—giving you the true edge to make your own highly profitable decisions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6 lg:gap-12 pt-8 border-t border-[#30363D]">
                <div className="text-center lg:text-left">
                  <p className="text-gray-100 font-extrabold text-2xl tracking-tight mb-1">Alex Mercer</p>
                  <p className="text-[#00d060] font-bold tracking-wide uppercase text-xs">Founder, PatternFlow</p>
                </div>
                <div className="opacity-40 scale-125 transform origin-left">
                  <svg width="120" height="40" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 45C30 35 45 20 60 15C75 10 80 25 70 35C60 45 50 40 45 30C40 20 55 10 75 10C95 10 110 30 130 40C150 50 170 35 180 25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M120 15C115 25 110 40 120 50" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-5 sm:px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#00d060] opacity-[0.02] blur-[150px] rounded-full pointer-events-none z-0"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-100 tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-[#888888] text-lg">Unlock the full power of AI-driven chart analysis.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            
            {/* Pro Monthly */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-[32px] p-8 md:p-10 flex flex-col mt-4">
              <h3 className="text-2xl font-extrabold text-gray-100 mb-2">Pro Monthly</h3>
              <p className="text-[#888888] text-sm mb-6">Flexible, month-to-month access.</p>
              
              <div className="flex items-end gap-1 mb-10">
                <span className="text-5xl font-black text-gray-100 tracking-tighter">$29.99</span>
                <span className="text-[#888888] text-sm font-semibold mb-1">/ month</span>
              </div>
              
              <Link to="/onboarding" className="w-full block text-center border border-[#333333] hover:border-[#444444] hover:bg-[#1a1a1a] text-gray-100 font-bold py-4 rounded-xl text-sm transition-all mb-10">
                Get Monthly
              </Link>
              
              <ul className="space-y-4">
                {["Unlimited AI chart analyses", "All timeframes including 1m, 5m, 15m", "Advanced pattern recognition", "Access to all future SaaS updates"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-[#d1d1d1]"><CheckCircle2 size={18} className="text-[#00d060] flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

            {/* Pro Yearly */}
            <div className="bg-[#0D1117] border border-[#00d060] rounded-[32px] p-8 md:p-10 flex flex-col relative shadow-[0_0_50px_rgba(0,208,96,0.1)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#00d060] text-black text-[10px] sm:text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-[0_5px_15px_rgba(0,208,96,0.3)]">
                <Sparkles size={14} className="text-black" /> SAVE 60%
              </div>
              
              <h3 className="text-2xl font-extrabold text-[#00d060] mb-2">Pro Yearly</h3>
              <p className="text-[#888888] text-sm mb-6">Best value for serious traders.</p>
              
              <div className="flex items-end gap-1 mb-2">
                <span className="text-5xl font-black text-gray-100 tracking-tighter">$12.00</span>
                <span className="text-[#888888] text-sm font-semibold mb-1">/ month</span>
              </div>
              <p className="text-[#00d060] text-sm font-bold mb-6">Billed $144 yearly</p>
              
              <Link to="/onboarding" className="w-full block text-center bg-[#00d060] hover:bg-[#00e56a] text-black font-bold py-4 rounded-xl text-sm transition-all mb-10 shadow-[0_0_20px_rgba(0,208,96,0.2)]">
                Get Yearly
              </Link>
              
              <ul className="space-y-4">
                {["Unlimited AI chart analyses", "All timeframes including 1m, 5m, 15m", "Advanced pattern recognition", "Access to all future SaaS updates"].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-[#d1d1d1]"><CheckCircle2 size={18} className="text-[#00d060] flex-shrink-0" />{f}</li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-5 sm:px-8 py-24 relative">
        <div className="mb-12 flex flex-col items-start">
          <div className="inline-flex items-center gap-1.5 bg-[#00d060]/10 text-[#00d060] font-mono text-xs px-3 py-1 rounded-full mb-4">
            <span className="opacity-70">&lt;/&gt;</span> FAQ
          </div>
          <h2 className="text-4xl font-extrabold text-gray-100 tracking-tight">Common questions <img src="/landing-emoji-2.png" alt="Computer" className="inline-block w-10 h-10 md:w-12 md:h-12 align-middle ml-2 -mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" /></h2>
        </div>
        <div className="space-y-2">
          <FAQItem q="Is this financial advice?" a="No. Everything is educational analysis of what is visible in your chart — never a recommendation to buy, sell, or hold anything." />
          <FAQItem q="How accurate is it?" a="It depends on the chart. That is why we label every read as Clear, Likely, or Uncertain instead of pretending everything is certain." />
          <FAQItem q="What charts can I upload?" a="Any stock, crypto, or forex chart image — from your broker app, TradingView, a screenshot, or even a photo of a screen." />
          <FAQItem q="Do I need to know technical analysis?" a="No — that is the point. Every term is explained when it comes up, and you can set your experience level to get more or less detail." />
          <FAQItem q="Can I use it on my phone?" a="Yes. The app is fully mobile-optimized and you can take a photo of a chart directly from within the app." />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#30363D] py-16 px-5 sm:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 font-extrabold text-xl text-gray-100 mb-4">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img src="/logo.png" alt="PatternFlow Logo" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,208,96,0.3)]" />
                </div>
                <span>Pattern<span className="text-[#3B82F6]">Flow</span></span>
              </div>
              <p className="text-sm text-[#888888] leading-relaxed">AI-powered chart analysis for traders of all levels.</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#555555] mb-4">Product</p>
              <ul className="space-y-2.5">
                {[["How it works","#how-it-works"],["Features","#features"],["Pricing","#pricing"],["FAQ","#faq"]].map(([label, href]) => (
                  <li key={label}><a href={href} className="text-sm text-[#888888] hover:text-gray-100 transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#555555] mb-4">Company</p>
              <ul className="space-y-2.5">
                {[["About","/about"],["Contact","/contact"],["Terms","/terms"]].map(([label, href]) => (
                  <li key={label}><Link to={href} className="text-sm text-[#888888] hover:text-gray-100 transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#555555] mb-4">Get started</p>
              <ul className="space-y-2.5">
                <li><Link to="/onboarding" className="text-sm text-[#888888] hover:text-gray-100 transition-colors">Sign up free</Link></li>
                <li><Link to="/billing" className="text-sm text-[#888888] hover:text-gray-100 transition-colors">View plans</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#30363D] pt-8 flex flex-col gap-10 md:gap-12">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#555555]">© {new Date().getFullYear()} PatternFlow. All rights reserved.</p>
              <p className="text-xs text-[#555555]">Educational tool only — not financial advice.</p>
            </div>
            
            <div className="w-full text-center pb-6">
              <h1 className="text-[10vw] sm:text-[5.5vw] md:text-[4.5vw] lg:text-[4vw] leading-[1.2] sm:leading-none font-black text-gray-100 tracking-[0.05em] sm:tracking-[0.15em] opacity-80 select-none">
                <span className="block sm:inline">LOOK FIRST / </span>
                <span className="inline-flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                  THEN LEAP. <img src="/landing-emoji-3.png" alt="Cursor" className="inline-block w-[10vw] sm:w-[5vw] md:w-[4vw] h-[10vw] sm:h-[5vw] md:h-[4vw] object-contain align-middle drop-shadow-[0_0_15px_rgba(0,100,255,0.5)] -mt-2" />
                </span>
              </h1>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
