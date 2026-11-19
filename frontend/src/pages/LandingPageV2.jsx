import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, ArrowRight, ChevronDown, TrendingDown, TrendingUp, 
  Activity, BarChart2, Target, Zap, BookOpen, ChevronRight, Sparkles, 
  Send, AlertCircle, Info, Upload, ThumbsUp, ShieldCheck, 
  Layers, Lock, Cpu, Clock, Terminal, Check
} from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div 
      className="border-b border-[#181c26] py-6 cursor-pointer group" 
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center gap-4 text-gray-200 group-hover:text-[#00d060] transition-colors duration-200">
        <h3 className="text-base sm:text-lg font-semibold">{q}</h3>
        <div className={`w-8 h-8 rounded-full border border-[#232936] flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180 bg-[#00d060]/10 border-[#00d060]/30 text-[#00d060]" : "text-gray-400"}`}>
          <ChevronDown size={16} />
        </div>
      </div>
      {open && (
        <p className="mt-4 text-[#94a3b8] text-sm sm:text-base leading-relaxed pr-6 animate-fadeIn">
          {a}
        </p>
      )}
    </div>
  );
};

export default function LandingPageV2() {
  const [sampleView, setSampleView] = useState("technical");
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD");

  const tickerItems = [
    { pair: "BTC/USD", price: "$94,280", change: "+4.12%", up: true },
    { pair: "NVDA", price: "$146.50", change: "+3.85%", up: true },
    { pair: "ETH/USD", price: "$3,450", change: "+2.40%", up: true },
    { pair: "SPY", price: "$594.20", change: "+0.75%", up: true },
    { pair: "TSLA", price: "$342.10", change: "+5.18%", up: true },
    { pair: "EUR/USD", price: "1.0845", change: "-0.18%", up: false },
    { pair: "SOL/USD", price: "$218.40", change: "+7.64%", up: true },
    { pair: "GOLD", price: "$2,684", change: "+0.45%", up: true }
  ];

  return (
    <div className="min-h-screen bg-[#06080c] text-slate-100 font-sans selection:bg-[#00d060] selection:text-black overflow-x-hidden relative">
      
      {/* Liquid-Style Background Ambient Grid & Mesh Glows */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          backgroundPosition: 'center top'
        }}
      ></div>

      {/* Top Ambient Radial Lights */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00d060]/12 via-[#06b6d4]/5 to-transparent blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] right-[-150px] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00d060]/8 to-transparent blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute top-[65%] left-[-150px] w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#06b6d4]/8 to-transparent blur-[140px] pointer-events-none z-0"></div>

      {/* FLOATING GLASS NAVIGATION (Liquid.trade style) */}
      <header className="sticky top-4 z-50 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <nav className="bg-[#0b0e14]/80 backdrop-blur-xl border border-[#1b212d] rounded-2xl px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d060]/20 to-[#06b6d4]/10 border border-[#00d060]/40 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(0,208,96,0.3)]">
              <img src="/logo.png" alt="PatternFlow" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-1.5 font-black text-xl tracking-tight text-white">
              <span>Pattern<span className="text-[#00d060]">Flow</span></span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#00d060]/10 text-[#00d060] border border-[#00d060]/20 font-bold ml-1">v2.0</span>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#demo" className="hover:text-white transition-colors">Terminal Demo</a>
            <a href="#features" className="hover:text-white transition-colors">SMC Engine</a>
            <a href="#comparison" className="hover:text-white transition-colors">Why PatternFlow</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 sm:gap-4">
            <SignedIn>
              <Link 
                to="/upload" 
                className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <Link 
                to="/onboarding" 
                className="text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-colors hidden sm:block"
              >
                Sign In
              </Link>
            </SignedOut>

            <Link 
              to="/onboarding" 
              className="bg-[#00d060] hover:bg-[#00f575] text-black text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-2.5 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(0,208,96,0.3)] hover:shadow-[0_0_25px_rgba(0,208,96,0.5)] flex items-center gap-1.5"
            >
              Get Started <ArrowRight size={14} className="stroke-[3]" />
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-12 px-5 sm:px-8 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Shimmer Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d121c] border border-[#20293a] text-xs font-semibold text-slate-200 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#00d060] animate-pulse"></span>
          <span className="text-slate-400">Institutional Engine Live</span>
          <span className="text-[#00d060] font-bold flex items-center">SMC & FVG Analysis →</span>
        </div>

        {/* Liquid-Style Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6 max-w-4xl">
          Decode Any Chart With <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#00d060] via-[#38ef7d] to-[#06b6d4] bg-clip-text text-transparent">
            Institutional Clarity.
          </span>
        </h1>

        {/* Crisp Subtitle */}
        <p className="text-slate-400 text-base sm:text-xl max-w-2xl leading-relaxed mb-10">
          Upload any screenshot from TradingView, your broker app, or a phone photo. 
          PatternFlow maps <span className="text-white font-semibold">Order Blocks, Break of Structure, and Fair Value Gaps</span> in under 3 seconds. Zero black-box signals.
        </p>

        {/* Dual Liquid CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <Link 
            to="/onboarding" 
            className="w-full sm:w-auto bg-[#00d060] hover:bg-[#00f575] text-black font-extrabold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(0,208,96,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Start Analyzing Free <ArrowRight size={18} className="stroke-[2.5]" />
          </Link>
          
          <a 
            href="#demo" 
            className="w-full sm:w-auto bg-[#0d111a]/80 hover:bg-[#151c2a] text-slate-200 hover:text-white border border-[#212a3b] hover:border-[#00d060]/40 font-bold text-base px-7 py-4 rounded-xl transition-all duration-200 backdrop-blur-md flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            Explore Live Sample ↓
          </a>
        </div>

        {/* Social Proof Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#00d060]" />
            <span>100% Free Trial Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#00d060]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-[#00d060]" />
            <span>Instant &lt; 3.2s Processing</span>
          </div>
        </div>
      </section>

      {/* LIQUID SIGNATURE TICKER TAPE */}
      <section className="w-full border-y border-[#151b26] bg-[#070a0f]/60 backdrop-blur-md py-3.5 overflow-hidden relative z-20">
        <div className="flex items-center gap-8 w-max animate-marquee pl-4">
          {[...tickerItems, ...tickerItems].map((t, idx) => (
            <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-mono whitespace-nowrap">
              <span className="font-bold text-slate-200">{t.pair}</span>
              <span className="text-slate-400">{t.price}</span>
              <span className={`px-1.5 py-0.5 rounded font-sans font-bold text-[11px] ${t.up ? "bg-[#00d060]/10 text-[#00d060]" : "bg-red-500/10 text-red-400"}`}>
                {t.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE TERMINAL SHOWCASE (#demo) */}
      <section id="demo" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative z-20 scroll-mt-24">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d060]/10 border border-[#00d060]/20 text-[#00d060] font-mono text-xs font-bold mb-4">
            <Terminal size={14} /> LIVE TERMINAL PREVIEW
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            See How PatternFlow Reads A Chart
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            This is the exact breakdown generated when you drop in a chart. Clean structure, annotated zones, and no ambiguity.
          </p>
        </div>

        {/* High-Fidelity Terminal Frame */}
        <div className="bg-[#0b0e14] border border-[#1b222f] rounded-2xl sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Terminal Titlebar */}
          <div className="bg-[#0e121a] border-b border-[#1b222f] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="text-xs font-mono text-slate-400 ml-3 hidden sm:inline">patternflow-engine://analysis/live-preview</span>
            </div>

            {/* Asset Selector Tabs */}
            <div className="flex items-center bg-[#07090e] border border-[#1b222f] rounded-xl p-1 text-xs font-bold">
              {["BTC/USD", "NVDA", "ETH/USD"].map((asset) => (
                <button
                  key={asset}
                  onClick={() => setSelectedAsset(asset)}
                  className={`px-3 py-1 rounded-lg transition-colors ${selectedAsset === asset ? "bg-[#00d060] text-black font-extrabold" : "text-slate-400 hover:text-white"}`}
                >
                  {asset}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#07090e] border border-[#1b222f] rounded-xl p-1 text-xs font-bold">
              <button 
                onClick={() => setSampleView("technical")}
                className={`px-3 py-1 rounded-lg transition-colors ${sampleView === "technical" ? "bg-[#1f2737] text-white" : "text-slate-400 hover:text-white"}`}
              >
                Technical Breakdown
              </button>
              <button 
                onClick={() => setSampleView("news")}
                className={`px-3 py-1 rounded-lg transition-colors ${sampleView === "news" ? "bg-[#1f2737] text-white" : "text-slate-400 hover:text-white"}`}
              >
                News & Macro Impact
              </button>
            </div>
          </div>

          {/* Terminal Content Grid */}
          <div className="p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Left Column: Simulated Chart Canvas & Instant Readout */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-[#080b10] border border-[#19202c] rounded-2xl overflow-hidden relative min-h-[260px] sm:min-h-[340px] flex items-center justify-center p-3">
                <img 
                  src="/chart_demo.png" 
                  alt="PatternFlow Analysis Visual" 
                  className="w-full h-full object-cover rounded-xl opacity-90"
                />
                <div className="absolute top-4 left-4 bg-[#0a0d14]/90 backdrop-blur-md border border-[#00d060]/30 rounded-xl px-3 py-1.5 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00d060] animate-ping"></div>
                  <span className="text-xs font-mono font-bold text-white">SMC Overlay Active</span>
                </div>
              </div>

              {/* 4-Grid Institutional Metric Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0e131c] border border-[#1c2433] rounded-xl p-3.5">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Market Regime</span>
                  <span className="text-base font-extrabold text-[#00d060] flex items-center gap-1.5">
                    <TrendingUp size={16} /> Bullish Impulse
                  </span>
                </div>
                <div className="bg-[#0e131c] border border-[#1c2433] rounded-xl p-3.5">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Volume Profile</span>
                  <span className="text-base font-extrabold text-white flex items-center gap-1.5">
                    <BarChart2 size={16} className="text-cyan-400" /> Expanding Buy Vol
                  </span>
                </div>
                <div className="bg-[#0e131c] border border-[#1c2433] rounded-xl p-3.5">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">RSI Confluence</span>
                  <span className="text-base font-extrabold text-white flex items-center gap-1.5">
                    <Activity size={16} className="text-yellow-400" /> Hidden Bull Divergence
                  </span>
                </div>
                <div className="bg-[#0e131c] border border-[#1c2433] rounded-xl p-3.5">
                  <span className="text-[11px] uppercase font-bold text-slate-400 block mb-1">Asymmetric R:R</span>
                  <span className="text-base font-extrabold text-white flex items-center gap-1.5">
                    <Target size={16} className="text-[#00d060]" /> 1 : 2.8 Ratio
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Deep Structured Insights */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {sampleView === "technical" ? (
                <>
                  {/* Executive Summary Card */}
                  <div className="bg-[#0e131c] border border-[#1c2433] rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#00d060] uppercase tracking-wider">Structure Breakdown</span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#00d060]/10 text-[#00d060] border border-[#00d060]/20">🟢 High Confidence</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Order Block Retest with Break of Structure (BOS)</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Price confirmed a decisive 4H candle close above prior swing resistance, establishing a valid Break of Structure. 
                      The current pullback is cleanly testing the 0.618 Fibonacci Golden Pocket, aligning with the unmitigated bullish Order Block.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1b2230] text-xs">
                      <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">Institutional Demand Zone:</span>
                        <span className="text-[#00d060] font-mono font-bold text-sm">$92,100 – $92,850</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5 font-medium">Measured Continuation Target:</span>
                        <span className="text-white font-mono font-bold text-sm">$97,400 (1.618 Fib Ext)</span>
                      </div>
                    </div>
                  </div>

                  {/* Smart Invalidation Box */}
                  <div className="bg-[#140e10] border border-red-500/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-bold text-sm mb-1">Structural Invalidation (Stop-Loss Boundary)</h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        A 4H candle body close below <span className="font-mono text-red-300 font-bold">$91,400</span> invalidates the bullish flag and breaks market character (ChoCH). This provides an asymmetric stop-loss with clear risk limits.
                      </p>
                    </div>
                  </div>

                  {/* What To Watch Next */}
                  <div className="bg-[#0e131c] border border-[#1c2433] rounded-2xl p-5">
                    <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <Zap size={16} className="text-[#00d060]" /> What To Monitor In The Next 1-3 Candles
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#00d060] font-bold">›</span>
                        <span>Confirm buy volume expansion as price taps the $92,500 Order Block zone.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#00d060] font-bold">›</span>
                        <span>Watch for 15-minute bullish pin-bar / engulfing trigger candle before execution.</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="bg-[#0e131c] border border-[#1c2433] rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    <Sparkles size={14} /> Macro & News Impact Layer
                  </div>
                  <h3 className="text-lg font-bold text-white">Institutional ETF Inflows Surge +42%</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Net institutional capital allocation recorded $840M in positive inflows over the last 48 hours. This macro tailwind corroborates the technical breakout above the 50-day moving average.
                  </p>
                  <div className="p-4 rounded-xl bg-[#090d14] border border-[#1c2433] text-xs text-slate-400">
                    <span className="text-[#00d060] font-bold block mb-1">Macro Verdict:</span>
                    Catalyst alignment score is 4.8/5, lowering the probability of false breakdown at primary support.
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </section>

      {/* BENTO GRID: INSTITUTIONAL SMC FEATURES (Liquid style) */}
      <section id="features" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d060]/10 border border-[#00d060]/20 text-[#00d060] font-mono text-xs font-bold mb-4">
            <Cpu size={14} /> THE PATTERNFLOW EDGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Hedge-Fund Grade Analysis, Simplified
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Traditional retail indicators lag. Our engine applies modern Smart Money Concepts to uncover where institutional liquidity truly sits.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Order Blocks & SMC */}
          <div className="md:col-span-2 bg-[#0a0d14] border border-[#1a2230] hover:border-[#00d060]/40 rounded-3xl p-8 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d060]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="w-12 h-12 rounded-2xl bg-[#141b26] border border-[#222d40] text-[#00d060] flex items-center justify-center mb-6">
              <Layers size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Smart Money Concepts & Order Blocks</h3>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
              Detect institutional footprints before retail traders react. Automatically map Break of Structure (BOS), Change of Character (ChoCH), and unmitigated Order Blocks with verified visual precision.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[#171e2c] text-center">
              <div>
                <span className="text-xs text-slate-400 block mb-1">BOS Detection</span>
                <span className="text-sm font-extrabold text-white">Automatic</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">ChoCH Alerts</span>
                <span className="text-sm font-extrabold text-[#00d060]">Early Warning</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1">Order Blocks</span>
                <span className="text-sm font-extrabold text-white">Visual Zones</span>
              </div>
            </div>
          </div>

          {/* Card 2: Fair Value Gaps (FVG) */}
          <div className="bg-[#0a0d14] border border-[#1a2230] hover:border-cyan-500/40 rounded-3xl p-8 transition-all duration-300 relative overflow-hidden group">
            <div className="w-12 h-12 rounded-2xl bg-[#141b26] border border-[#222d40] text-cyan-400 flex items-center justify-center mb-6">
              <Target size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Fair Value Gaps (FVG)</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Identifies 3-candle imbalance voids where price was pushed too fast. These liquidity magnets frequently offer high-probability re-entry points.
            </p>
            <div className="p-3.5 rounded-xl bg-[#0e131d] border border-[#1f293a] text-xs text-slate-300 font-mono">
              Imbalance mapped • 61.8% Fill Zone
            </div>
          </div>

          {/* Card 3: 3-Dimension Confluence Voting */}
          <div className="bg-[#0a0d14] border border-[#1a2230] hover:border-yellow-500/40 rounded-3xl p-8 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#141b26] border border-[#222d40] text-yellow-400 flex items-center justify-center mb-6">
              <Activity size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">3-D Confluence Voting</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Synthesizes Trend (EMA 20/50/200), Momentum (RSI Divergences), and Volatility (Bollinger Squeeze). Never calls a setup without 2+ dimension agreement.
            </p>
          </div>

          {/* Card 4: 2N Turtle Invalidation */}
          <div className="md:col-span-2 bg-[#0a0d14] border border-[#1a2230] hover:border-[#00d060]/40 rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#141b26] border border-[#222d40] text-[#00d060] flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Calculated Risk Invalidation (2N ATR Stops)</h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
                Every setup includes a strict mathematical failure price. We use 2N Average True Range buffers beyond swing pivots to prevent noise stop-outs and force asymmetric 1:2+ risk-to-reward ratios.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-[#171e2c]">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#131b26] text-slate-300">Minimum 1:2 Risk-to-Reward</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#131b26] text-slate-300">No Ambiguous Levels</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#131b26] text-[#00d060]">Zero Financial Advice</span>
            </div>
          </div>

        </div>
      </section>

      {/* BEFORE VS AFTER (HIGH CRO MATRIX) */}
      <section id="comparison" className="py-24 px-4 sm:px-8 max-w-5xl mx-auto relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Trade What You See. Not What You Hope.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Stop losing capital to emotional guesswork and cluttered chart screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Without PatternFlow */}
          <div className="bg-[#120a0d] border border-red-500/20 rounded-3xl p-8">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase tracking-wider mb-6">
              <AlertCircle size={18} /> Traditional Guesswork
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Staring at 15 overlapping indicators with analysis paralysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Chasing breakouts at the top and getting trapped in liquidity sweeps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Moving stop-losses further away out of emotional denial</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Blindly following Twitter/Telegram signal groups and pump accounts</span>
              </li>
            </ul>
          </div>

          {/* With PatternFlow */}
          <div className="bg-[#0a120e] border border-[#00d060]/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,208,96,0.08)]">
            <div className="flex items-center gap-2 text-[#00d060] font-bold text-sm uppercase tracking-wider mb-6">
              <CheckCircle2 size={18} /> With PatternFlow v2.0
            </div>
            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Instant structural breakdown of trend, Order Blocks, and FVGs in 3s</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Clear visual support/resistance zones drawn directly on your chart</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Rigid mathematical invalidation price before you ever take risk</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Objective confidence tags (Clear, Likely, Uncertain) — zero fake certainty</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* PRICING SECTION (Liquid / Low-Friction) */}
      <section id="pricing" className="py-24 px-4 sm:px-8 max-w-5xl mx-auto relative z-20 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d060]/10 border border-[#00d060]/20 text-[#00d060] font-mono text-xs font-bold mb-4">
            TRANSPARENT VALUE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Invest in Your Trading Discipline
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            One bad emotional trade costs more than an entire year of PatternFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Monthly */}
          <div className="bg-[#0b0e14] border border-[#1b222f] rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro Monthly</h3>
              <p className="text-slate-400 text-sm mb-6">Flexible month-to-month access.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black text-white">$29.99</span>
                <span className="text-slate-400 text-sm font-semibold">/ month</span>
              </div>

              <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span>Unlimited AI Chart Analyses</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span>All Timeframes (1m, 5m, 15m, 1H, Daily)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span>Smart Money Concepts (SMC & FVG)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span>Interactive AI Chart Chat</span>
                </li>
              </ul>
            </div>

            <Link 
              to="/onboarding" 
              className="w-full text-center py-4 rounded-xl font-bold text-sm bg-[#131924] hover:bg-[#1a2333] text-white border border-[#232e40] transition-colors"
            >
              Start Monthly Plan
            </Link>
          </div>

          {/* Yearly (Highlighted Liquid Style) */}
          <div className="bg-[#0b1017] border-2 border-[#00d060] rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative shadow-[0_0_50px_rgba(0,208,96,0.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00d060] text-black font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              Save 60% • Most Popular
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#00d060] mb-2">Pro Annual</h3>
              <p className="text-slate-400 text-sm mb-6">Best value for disciplined traders.</p>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-black text-white">$12.00</span>
                <span className="text-slate-400 text-sm font-semibold">/ month</span>
              </div>
              <p className="text-xs text-[#00d060] font-semibold mb-8">Billed $144 annually (Save $215/yr)</p>

              <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span className="font-semibold text-white">Everything in Pro Monthly</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span>Priority GPU AI Analysis Latency</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span>Early Access to Screener & Scanner Tools</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  <span>All Future AI Engine Upgrades Included</span>
                </li>
              </ul>
            </div>

            <Link 
              to="/onboarding" 
              className="w-full text-center py-4 rounded-xl font-extrabold text-sm bg-[#00d060] hover:bg-[#00f575] text-black transition-all duration-200 shadow-[0_0_25px_rgba(0,208,96,0.3)] hover:-translate-y-0.5"
            >
              Claim 60% Discount Now
            </Link>
          </div>

        </div>

        {/* Free Trial Banner */}
        <div className="mt-12 text-center text-xs sm:text-sm text-slate-400 bg-[#0c1017] border border-[#1b2332] rounded-2xl py-3 px-6 max-w-lg mx-auto flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-[#00d060]" />
          <span>New user? <strong className="text-white">Your first chart analysis is 100% free</strong> without entering a credit card.</span>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-4 sm:px-8 max-w-3xl mx-auto relative z-20 scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm">Everything you need to know about PatternFlow.</p>
        </div>

        <div className="space-y-1">
          <FAQItem 
            q="Does PatternFlow provide financial advice or trade calls?" 
            a="No. PatternFlow is purely an educational technical analysis tool. It visually identifies structural chart patterns, order blocks, and key levels. It never instructs you to buy or sell." 
          />
          <FAQItem 
            q="What charts and platforms are supported?" 
            a="You can upload screenshots from any platform: TradingView, Zerodha, Binance, MetaTrader, Robinhood, Upstox, or photo snapshots taken from your mobile phone." 
          />
          <FAQItem 
            q="How does it recognize Smart Money Concepts (SMC)?" 
            a="Our multimodal vision model breaks down candle geometry, identifying consecutive opposing candle impulses (Order Blocks), non-overlapping wick voids (Fair Value Gaps), and swing point displacements (Break of Structure)." 
          />
          <FAQItem 
            q="Can I test it before paying?" 
            a="Yes! Every new account gets 1 free full chart analysis instantly, with no payment information or credit card required." 
          />
          <FAQItem 
            q="Can I cancel my subscription anytime?" 
            a="Yes, you can cancel your subscription with a single click from the Billing page inside your dashboard at any time." 
          />
        </div>
      </section>

      {/* LIQUID MINIMALIST FOOTER */}
      <footer className="border-t border-[#151b26] py-14 px-4 sm:px-8 bg-[#040608] relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0e141f] border border-[#1e2736] flex items-center justify-center p-1">
              <img src="/logo.png" alt="PatternFlow" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-white text-base">Pattern<span className="text-[#00d060]">Flow</span></span>
            <span className="text-xs text-slate-500 ml-2">© {new Date().getFullYear()} PatternFlow.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#090d14] border border-[#18212e] px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d060]"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
