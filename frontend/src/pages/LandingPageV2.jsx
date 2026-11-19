import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, ArrowRight, ChevronDown, TrendingDown, TrendingUp, 
  Activity, BarChart2, Target, Zap, BookOpen, ChevronRight, Sparkles, 
  Send, AlertCircle, Info, Upload, ThumbsUp, ShieldCheck, 
  Layers, Lock, Cpu, Clock, Terminal, Check, ExternalLink, ArrowUpRight
} from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function LandingPageV2() {
  const [sampleView, setSampleView] = useState("technical");
  const [selectedAsset, setSelectedAsset] = useState("BTC/USD");
  const [marketFilter, setMarketFilter] = useState("all");

  const tickerRow1 = [
    { pair: "BTC/USD", name: "Bitcoin", price: "$94,280", change: "+4.12%", up: true, type: "crypto" },
    { pair: "NVDA", name: "Nvidia", price: "$146.50", change: "+3.85%", up: true, type: "equities" },
    { pair: "ETH/USD", name: "Ethereum", price: "$3,450", change: "+2.40%", up: true, type: "crypto" },
    { pair: "SPY", name: "S&P 500 ETF", price: "$594.20", change: "+0.75%", up: true, type: "indices" },
    { pair: "TSLA", name: "Tesla", price: "$342.10", change: "+5.18%", up: true, type: "equities" },
    { pair: "EUR/USD", name: "Euro / Dollar", price: "1.0845", change: "-0.18%", up: false, type: "forex" },
    { pair: "SOL/USD", name: "Solana", price: "$218.40", change: "+7.64%", up: true, type: "crypto" },
    { pair: "GOLD", name: "Gold Spot", price: "$2,684", change: "+0.45%", up: true, type: "commodities" }
  ];

  const tickerRow2 = [
    { pair: "AAPL", name: "Apple", price: "$228.40", change: "+1.20%", up: true, type: "equities" },
    { pair: "QQQ", name: "Nasdaq 100", price: "$506.80", change: "+0.92%", up: true, type: "indices" },
    { pair: "GBP/USD", name: "British Pound", price: "1.2940", change: "+0.32%", up: true, type: "forex" },
    { pair: "NIFTY", name: "Nifty 50", price: "$23,890", change: "+0.65%", up: true, type: "indices" },
    { pair: "MSFT", name: "Microsoft", price: "$428.10", change: "+1.84%", up: true, type: "equities" },
    { pair: "AVAX/USD", name: "Avalanche", price: "$38.50", change: "+8.20%", up: true, type: "crypto" },
    { pair: "OIL", name: "Crude Oil", price: "$72.40", change: "-1.10%", up: false, type: "commodities" },
    { pair: "AMZN", name: "Amazon", price: "$202.90", change: "+2.15%", up: true, type: "equities" }
  ];

  const marketCatalog = [
    {
      category: "Equities & Stocks",
      examples: "NVDA, TSLA, AAPL, MSFT, AMD, GOOGL",
      engine: "Volume Profile, Earnings Gap Fills, Multi-Timeframe Trend",
      status: "Supported (All Exchanges)"
    },
    {
      category: "Crypto & Perps",
      examples: "BTC/USD, ETH/USD, SOL, SUI, DOGE",
      engine: "Liquidity Sweeps, Fair Value Gaps, 24/7 SMC Order Blocks",
      status: "Supported (Spot & Futures)"
    },
    {
      category: "Global Indices",
      examples: "SPY, QQQ, NIFTY 50, BANKNIFTY, DAX",
      engine: "Session Open Liquidity, Key Daily Pivot Retests, ATR Bounds",
      status: "Supported (Cash & Futures)"
    },
    {
      category: "Commodities & Metals",
      examples: "Gold (XAU), Silver (XAG), Crude Oil (WTI)",
      engine: "Fibonacci Golden Pocket Reversals, Supply Demand Imbalances",
      status: "Supported (Comex & MCX)"
    },
    {
      category: "Forex & Currencies",
      examples: "EUR/USD, GBP/USD, USD/JPY, AUD/USD",
      engine: "London & NY Session Killzones, Institutional Liquidity Runs",
      status: "Supported (All Major Pairs)"
    }
  ];

  const filteredTicker = marketFilter === "all" 
    ? tickerRow1 
    : tickerRow1.filter(item => item.type === marketFilter);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#fafafa] font-sans selection:bg-[#00E396] selection:text-black overflow-x-hidden relative">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Liquid.trade navy tint style) */}
      <div className="w-full border-b border-[#262626] bg-[#050811] px-4 py-2 text-center text-xs text-[#a3a3a3] transition-colors hover:text-white relative z-50">
        <span>
          PatternFlow v2.0 Engine Live — Smart Money Concepts (SMC), Order Blocks & Multi-Timeframe Confluence.
        </span>
        <a href="#demo" className="ml-1.5 font-semibold text-white underline underline-offset-2 hover:text-[#00E396] inline-flex items-center gap-0.5">
          Explore the interactive demo <ArrowUpRight size={13} />
        </a>
      </div>

      {/* 2. STICKY GLASS HEADER (Liquid.trade 1440px sticky header) */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-[#141414] border border-[#2e2e2e] flex items-center justify-center p-1 group-hover:border-[#00E396]/50 transition-colors">
              <img src="/logo.png" alt="PatternFlow" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-base tracking-tight text-white">
              <span>PatternFlow</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-[#a3a3a3] border border-white/[0.08] font-medium ml-1">v2.0</span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden items-center gap-7 md:flex text-sm font-medium text-[#a3a3a3]">
            <a href="#demo" className="hover:text-white transition-colors">Demo</a>
            <a href="#features" className="hover:text-white transition-colors">SMC Engine</a>
            <a href="#markets" className="hover:text-white transition-colors">Asset Coverage</a>
            <a href="#comparison" className="hover:text-white transition-colors">Why PatternFlow</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link 
                to="/upload" 
                className="hidden text-sm font-medium text-[#fafafa] hover:text-white md:inline-block transition-colors"
              >
                Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <Link 
                to="/onboarding" 
                className="hidden text-sm font-medium text-[#a3a3a3] hover:text-white md:inline-block transition-colors"
              >
                Log in
              </Link>
            </SignedOut>

            <Link 
              to="/onboarding" 
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all hover:opacity-90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Liquid's Signature Dual-Tone Heading & Overlapping Terminal + Mobile Mockup) */}
      <section className="relative z-10 pt-16 pb-16 md:pt-24 md:pb-28 px-5 md:px-10 max-w-[1440px] mx-auto text-center flex flex-col items-center">
        
        {/* Shimmer Announcement Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-[#121212] px-4 py-1.5 text-xs text-[#a3a3a3] mb-8 hover:border-white/20 transition-all">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00E396] shadow-[0_0_8px_#00E396]"></span>
          <span className="text-[#fafafa] font-medium">Smart Money Concepts</span>
          <span className="text-white/40">·</span>
          <span>Order Blocks, BOS & FVGs Detected</span>
        </div>

        {/* Liquid-Style Dual-Tone Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-medium tracking-tight text-white leading-[1.06] mb-6 max-w-5xl">
          <span className="text-white">Decode any chart, </span>
          <span className="text-white/40">from anywhere.</span>
        </h1>

        {/* Sub-bar Metadata Dots */}
        <p className="text-[#a3a3a3] text-base md:text-xl font-normal max-w-2xl leading-relaxed mb-10">
          Upload any screenshot from TradingView, broker apps, or phone photos. 
          PatternFlow maps institutional liquidity, multi-timeframe confluence, and exact ATR invalidation stops.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <Link 
            to="/onboarding" 
            className="w-full sm:w-auto rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black transition-all hover:opacity-90 shadow-[0_4px_25px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Start Analyzing Free <ArrowRight size={16} className="stroke-[2.5]" />
          </Link>
          
          <a 
            href="#demo" 
            className="w-full sm:w-auto rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-3.5 text-base font-medium text-white hover:bg-white/[0.08] hover:border-white/25 transition-all flex items-center justify-center gap-2"
          >
            View Live Terminal Sample ↓
          </a>
        </div>

        {/* Bullet Trust Metadata */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#a3a3a3]">
          <div className="flex items-center gap-2">
            <Check size={15} className="text-[#00E396] stroke-[3]" />
            <span>1 Free Instant Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={15} className="text-[#00E396] stroke-[3]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={15} className="text-[#00E396] stroke-[3]" />
            <span>&lt; 3.0s Latency</span>
          </div>
        </div>

        {/* HERO VISUAL: Desktop Trading Terminal Flanked by Mobile Execution View */}
        <div className="mt-14 w-full max-w-[1240px] relative">
          
          {/* Main Desktop Chart Terminal Container */}
          <div className="rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0c0c0c] p-2.5 sm:p-5 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden text-left relative">
            
            {/* Terminal Top Window Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
                <span className="text-xs font-mono text-[#a3a3a3] ml-3 hidden sm:inline">patternflow-engine v2.0 // live_overlay</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E396]/10 text-[#00E396] text-[11px] font-mono font-semibold border border-[#00E396]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E396] animate-pulse"></span>
                  SMC & FVG ENGINE ACTIVE
                </span>
              </div>
            </div>

            {/* Terminal Body Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              {/* Left Chart Preview Area */}
              <div className="lg:col-span-8 rounded-xl border border-white/[0.08] bg-[#080808] p-3 overflow-hidden relative">
                <img 
                  src="/chart_demo.png" 
                  alt="PatternFlow Chart Analysis Terminal" 
                  className="w-full h-[260px] sm:h-[380px] object-cover rounded-lg opacity-90"
                />
                
                {/* Floating SMC Marker Overlay */}
                <div className="absolute top-6 left-6 rounded-xl border border-[#00E396]/30 bg-[#0a0a0a]/90 backdrop-blur-md px-3.5 py-2 shadow-lg">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#00E396]"></span>
                    <span className="text-xs font-mono font-bold text-white">Bullish Order Block ($92,400 - $92,850)</span>
                  </div>
                  <span className="text-[11px] text-[#a3a3a3]">Confluence Score: 94% · 3-Timeframe Consensus</span>
                </div>

                <div className="absolute bottom-6 right-6 rounded-xl border border-red-500/30 bg-[#0a0a0a]/90 backdrop-blur-md px-3.5 py-2 shadow-lg">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff4560]"></span>
                    <span className="text-xs font-mono font-bold text-white">2N ATR Invalidation: $91,400</span>
                  </div>
                  <span className="text-[11px] text-red-400">Strict Stop Boundary (1 : 3.1 R:R)</span>
                </div>
              </div>

              {/* Right Diagnostic Summary */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-4">
                  <span className="text-xs font-mono text-[#a3a3a3] uppercase tracking-wider block mb-1">Asset Diagnosis</span>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">BTC/USD (4H)</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#00E396]/15 text-[#00E396]">Bullish Breakout</span>
                  </div>
                  <p className="text-xs text-[#a3a3a3] mt-2 leading-relaxed">
                    Confirmed Break of Structure (BOS) above $93,500. Pullback testing unmitigated 4H demand zone.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-3">
                    <span className="text-[11px] text-[#a3a3a3] block mb-0.5">Target Extension</span>
                    <span className="text-sm font-mono font-bold text-[#00E396]">$98,400</span>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-3">
                    <span className="text-[11px] text-[#a3a3a3] block mb-0.5">Risk-to-Reward</span>
                    <span className="text-sm font-mono font-bold text-white">1 : 3.2 Asymmetric</span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#00E396]/20 bg-[#00E396]/[0.03] p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[#00E396]" />
                    <span className="text-xs font-medium text-white">Instant AI Verification</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#00E396]">Pass (3/3)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Floating Mobile Glass App View (Liquid Style Overlap) */}
          <div className="hidden md:block absolute -bottom-10 -right-6 w-72 rounded-2xl border border-white/[0.18] bg-[#0c0c0c]/90 backdrop-blur-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left z-30">
            <div className="flex items-center justify-between mb-3 border-b border-white/[0.08] pb-2">
              <span className="text-xs font-mono text-[#a3a3a3]">Instant Execution</span>
              <span className="text-[11px] font-bold text-[#00E396]">Active Setup</span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-bold text-white">Long BTC</span>
              <span className="text-sm font-mono font-bold text-[#00E396]">+$1,420.00</span>
            </div>
            <div className="w-full bg-[#1c1c1c] h-1.5 rounded-full overflow-hidden mb-3">
              <div className="bg-[#00E396] h-full w-[78%]"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#a3a3a3]">
              <span>Entry: $92,400</span>
              <span>Target: $98,400</span>
            </div>
          </div>

        </div>

      </section>

      {/* 4. LIQUID SIGNATURE FILTERABLE TICKER MARQUEE */}
      <section className="w-full border-y border-[#262626] bg-[#080808] py-5 overflow-hidden relative z-20">
        
        {/* Category Filter Chips */}
        <div className="max-w-[1440px] mx-auto px-5 mb-4 flex items-center justify-center gap-2">
          {[
            { id: "all", label: "All Markets" },
            { id: "crypto", label: "Crypto" },
            { id: "equities", label: "Equities" },
            { id: "indices", label: "Indices" },
            { id: "forex", label: "Forex" },
            { id: "commodities", label: "Commodities" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setMarketFilter(tab.id)}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                marketFilter === tab.id 
                  ? "bg-white text-black font-semibold shadow-sm" 
                  : "bg-white/[0.04] text-[#a3a3a3] hover:text-white border border-white/[0.08]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Row 1 Infinite Scrolling Ticker */}
        <div className="flex items-center gap-5 w-max animate-marquee pl-4 mb-3">
          {[...filteredTicker, ...filteredTicker, ...filteredTicker].map((item, idx) => (
            <div 
              key={`r1-${idx}`} 
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0d0d0d] px-4 py-2 hover:border-white/30 hover:bg-[#141414] transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white">
                {item.pair.charAt(0)}
              </div>
              <span className="text-sm font-semibold text-white">{item.pair}</span>
              <span className="text-xs text-[#a3a3a3]">{item.price}</span>
              <span className={`text-xs font-semibold ${item.up ? "text-[#00E396]" : "text-[#ff4560]"}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Row 2 Reverse Scrolling Ticker */}
        <div className="flex items-center gap-5 w-max animate-marquee-reverse pl-4">
          {[...tickerRow2, ...tickerRow2, ...tickerRow2].map((item, idx) => (
            <div 
              key={`r2-${idx}`} 
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#0d0d0d] px-4 py-2 hover:border-white/30 hover:bg-[#141414] transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-bold text-white">
                {item.pair.charAt(0)}
              </div>
              <span className="text-sm font-semibold text-white">{item.pair}</span>
              <span className="text-xs text-[#a3a3a3]">{item.price}</span>
              <span className={`text-xs font-semibold ${item.up ? "text-[#00E396]" : "text-[#ff4560]"}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LIQUID'S SIGNATURE 3 BENTO CARDS: "Trading, simplified" */}
      <section id="features" className="py-24 px-5 md:px-10 max-w-[1440px] mx-auto relative z-20">
        
        {/* Dual-Tone Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3] mb-3">Institutional Intelligence</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            <span className="text-white">Trading, </span>
            <span className="text-white/40">simplified.</span>
          </h2>
          <p className="text-base md:text-lg text-[#a3a3a3] leading-relaxed">
            Traditional retail indicators lag by 15 bars. Our engine eliminates noisy indicators and uncovers where institutional smart money truly accumulates.
          </p>
        </div>

        {/* The 3 Iconic Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: Go long. Go short. (Mathematical Sine Wave Visual) */}
          <div className="rounded-3xl border border-white/[0.1] bg-[#0c0c0c] p-7 md:p-8 flex flex-col justify-between hover:border-white/20 transition-all group">
            
            {/* Visual Canvas: Sine Wave */}
            <div className="w-full h-48 rounded-2xl bg-[#080808] border border-white/[0.06] p-4 relative overflow-hidden mb-8 flex flex-col justify-between">
              
              {/* Badges */}
              <div className="flex items-center justify-between text-xs font-medium relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E396]/15 text-[#00E396] border border-[#00E396]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E396]"></span> Long Breakout
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff4560]/15 text-[#ff4560] border border-[#ff4560]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4560]"></span> Short Pullback
                </span>
              </div>

              {/* Glowing SVG Sine Curve */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 400 160" className="w-full h-full opacity-90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="greenWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E396" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00E396" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="redWave" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#ff4560" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#ff4560" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Entry Line */}
                  <line x1="0" y1="80" x2="400" y2="80" stroke="#333333" strokeDasharray="4 4" strokeWidth="1" />

                  {/* Upper Long Crest Path */}
                  <path d="M 0 80 Q 100 0 200 80 L 200 80 L 0 80 Z" fill="url(#greenWave)" />
                  <path d="M 0 80 Q 100 0 200 80" stroke="#00E396" strokeWidth="2.5" fill="none" />

                  {/* Lower Short Trough Path */}
                  <path d="M 200 80 Q 300 160 400 80 L 400 80 L 200 80 Z" fill="url(#redWave)" />
                  <path d="M 200 80 Q 300 160 400 80" stroke="#ff4560" strokeWidth="2.5" fill="none" />
                </svg>
              </div>

              {/* Zero Line Marker Label */}
              <div className="relative z-10 text-center">
                <span className="text-[11px] font-mono text-[#a3a3a3] bg-[#0c0c0c] px-2 py-0.5 rounded border border-white/[0.08]">
                  Entry Price Axis
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">Go long. Go short.</h3>
              <p className="text-sm md:text-base text-[#a3a3a3] leading-relaxed">
                Think an asset will rally? Identify the unmitigated bullish Order Block. Expecting a breakdown? Map the Fair Value Gap. PatternFlow gives you both sides with strict invalidation bounds.
              </p>
            </div>

          </div>

          {/* CARD 2: Multi-Timeframe Confluence (Concentric Radar Rings) */}
          <div className="rounded-3xl border border-white/[0.1] bg-[#0c0c0c] p-7 md:p-8 flex flex-col justify-between hover:border-white/20 transition-all group">
            
            {/* Visual Canvas: Concentric Radar Rings */}
            <div className="w-full h-48 rounded-2xl bg-[#080808] border border-white/[0.06] p-4 relative overflow-hidden mb-8 flex items-center justify-center">
              
              {/* Outer Glow Halo */}
              <div className="absolute w-36 h-36 rounded-full bg-[#00d2b4]/10 blur-xl"></div>
              
              {/* Outer Ring */}
              <div className="w-40 h-40 rounded-full border border-[#00d2b4]/20 flex items-center justify-center relative">
                <span className="absolute -top-2.5 text-[9px] font-mono text-[#00d2b4] bg-[#080808] px-2 py-0.5 rounded border border-[#00d2b4]/30">
                  4H · Trend Alignment
                </span>
                
                {/* Mid Ring */}
                <div className="w-28 h-28 rounded-full border border-[#00d2b4]/40 flex items-center justify-center relative">
                  <span className="absolute -bottom-2 text-[9px] font-mono text-[#00d2b4] bg-[#080808] px-2 py-0.5 rounded border border-[#00d2b4]/30">
                    1H · Order Block
                  </span>

                  {/* Core Glowing Badge */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d2b4]/30 to-[#00E396]/20 border border-[#00d2b4] flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,210,180,0.4)]">
                    <span className="text-xs font-mono font-bold text-white">94%</span>
                    <span className="text-[8px] font-mono text-[#00d2b4]">SYNC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">Multi-timeframe confluence.</h3>
              <p className="text-sm md:text-base text-[#a3a3a3] leading-relaxed">
                Never trade an isolated 5-minute candle. Our engine analyzes higher-timeframe trend (EMA 20/50/200), RSI momentum divergence, and liquidity sweeps simultaneously before scoring a setup.
              </p>
            </div>

          </div>

          {/* CARD 3: Close anytime, with defined risk (Luminous PnL Badge) */}
          <div className="rounded-3xl border border-white/[0.1] bg-[#0c0c0c] p-7 md:p-8 flex flex-col justify-between hover:border-white/20 transition-all group">
            
            {/* Visual Canvas: Glowing Green Badge */}
            <div className="w-full h-48 rounded-2xl bg-[#080808] border border-white/[0.06] p-4 relative overflow-hidden mb-8 flex flex-col items-center justify-center">
              
              {/* Liquid's Signature Luminous Drop-Shadow Badge */}
              <div 
                className="rounded-full px-6 py-3 font-mono font-bold text-base md:text-lg mb-3 flex items-center gap-2 transform group-hover:scale-105 transition-transform"
                style={{
                  background: '#00E396',
                  color: '#05160E',
                  boxShadow: '0 0 35px rgba(0, 227, 150, 0.45)'
                }}
              >
                <span>+$1,284.50</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-[#05160E] font-sans font-extrabold">+3.4R</span>
              </div>

              <span className="text-xs text-[#a3a3a3] font-mono">
                2N ATR Invalidation Boundary
              </span>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-2">Zero guesswork risk bounds.</h3>
              <p className="text-sm md:text-base text-[#a3a3a3] leading-relaxed">
                Every trade thesis specifies an exact mathematical invalidation price using 2N Average True Range buffers. If price crosses the boundary, the thesis is void. No emotional holding, no hoping.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* 6. INTERACTIVE TERMINAL SHOWCASE (#demo) */}
      <section id="demo" className="py-24 px-5 md:px-10 max-w-[1440px] mx-auto relative z-20 scroll-mt-24">
        
        {/* Dual-Tone Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3] mb-3">Live Terminal Experience</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            <span className="text-white">See it. Size it. </span>
            <span className="text-white/40">Execute it.</span>
          </h2>
          <p className="text-base md:text-lg text-[#a3a3a3] leading-relaxed">
            Drop in any chart snapshot. PatternFlow renders institutional levels directly onto your canvas with comprehensive risk ratios.
          </p>
        </div>

        {/* High-Fidelity Terminal Container */}
        <div className="rounded-3xl border border-white/[0.1] bg-[#0c0c0c] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
          
          {/* Terminal Header */}
          <div className="border-b border-white/[0.08] bg-[#0e0e0e] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="text-xs font-mono text-[#a3a3a3] ml-2 hidden sm:inline">patternflow-engine://analysis/interactive</span>
            </div>

            {/* Asset Tabs */}
            <div className="flex items-center rounded-full bg-[#141414] border border-white/[0.08] p-1 text-xs">
              {["BTC/USD", "NVDA", "ETH/USD"].map((asset) => (
                <button
                  key={asset}
                  onClick={() => setSelectedAsset(asset)}
                  className={`rounded-full px-4 py-1.5 transition-all ${
                    selectedAsset === asset 
                      ? "bg-white text-black font-semibold" 
                      : "text-[#a3a3a3] hover:text-white"
                  }`}
                >
                  {asset}
                </button>
              ))}
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center rounded-full bg-[#141414] border border-white/[0.08] p-1 text-xs">
              <button 
                onClick={() => setSampleView("technical")}
                className={`rounded-full px-3.5 py-1.5 transition-all ${
                  sampleView === "technical" ? "bg-white/[0.1] text-white font-medium" : "text-[#a3a3a3] hover:text-white"
                }`}
              >
                Technical Setup
              </button>
              <button 
                onClick={() => setSampleView("news")}
                className={`rounded-full px-3.5 py-1.5 transition-all ${
                  sampleView === "news" ? "bg-white/[0.1] text-white font-medium" : "text-[#a3a3a3] hover:text-white"
                }`}
              >
                Macro Catalyst
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Chart Preview & Metric Gauges */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#070707] p-2 overflow-hidden relative">
                <img 
                  src="/chart_demo.png" 
                  alt="Chart Breakdown" 
                  className="w-full h-72 sm:h-84 object-cover rounded-xl opacity-95"
                />
                <div className="absolute top-4 left-4 rounded-full border border-[#00E396]/30 bg-[#0a0a0a]/90 backdrop-blur-md px-3 py-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E396] animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-white">4H Order Block Retest</span>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-3.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#a3a3a3] block mb-1">Market Regime</span>
                  <span className="text-sm font-bold text-[#00E396] flex items-center gap-1.5">
                    <TrendingUp size={15} /> Bullish Continuation
                  </span>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-3.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#a3a3a3] block mb-1">Volume Profile</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <BarChart2 size={15} className="text-[#00d2b4]" /> Expanding Buyers
                  </span>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-3.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#a3a3a3] block mb-1">RSI Confluence</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Activity size={15} className="text-yellow-400" /> Hidden Bull Div
                  </span>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-3.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#a3a3a3] block mb-1">Risk-to-Reward</span>
                  <span className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Target size={15} className="text-[#00E396]" /> 1 : 3.2 Ratio
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Structured Trade Plan */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {sampleView === "technical" ? (
                <>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-[#00E396] uppercase">Institutional Setup</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00E396]/15 text-[#00E396]">High Conviction</span>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">Order Block Retest with Break of Structure</h3>
                    <p className="text-sm text-[#a3a3a3] leading-relaxed mb-6">
                      Decisive 4H body close verified above previous swing high resistance ($93,500). Price is currently retracing into the unmitigated demand zone coinciding with the 0.618 Fibonacci level.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                      <div>
                        <span className="text-xs text-[#a3a3a3] block mb-1">Entry Zone:</span>
                        <span className="text-sm font-mono font-bold text-[#00E396]">$92,400 – $92,850</span>
                      </div>
                      <div>
                        <span className="text-xs text-[#a3a3a3] block mb-1">Target Extension:</span>
                        <span className="text-sm font-mono font-bold text-white">$98,400 (1.618 Fib)</span>
                      </div>
                    </div>
                  </div>

                  {/* Failure Point / Invalidation */}
                  <div className="rounded-2xl border border-red-500/25 bg-[#140b0d] p-5 flex items-start gap-3.5">
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-400 font-medium text-sm mb-1">Strict Mathematical Invalidation</h4>
                      <p className="text-xs sm:text-sm text-[#a3a3a3] leading-relaxed">
                        A 4H candle close below <span className="text-white font-mono font-bold">$91,400</span> invalidates the structure and breaks bullish character (ChoCH). Cut risk instantly if this boundary breaches.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-white/[0.08] bg-[#111111] p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00d2b4] uppercase">
                    <Sparkles size={14} /> Macro Flow Layer
                  </div>
                  <h3 className="text-xl font-medium text-white">Institutional ETF Inflows Accelerate</h3>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed">
                    Net institutional capital allocation recorded $840M in positive inflows over the last 48 hours. This macro tailwind corroborates the technical breakout above the 50-day moving average.
                  </p>
                  <div className="p-4 rounded-xl bg-[#090909] border border-white/[0.08] text-xs text-[#a3a3a3]">
                    <span className="text-[#00E396] font-semibold block mb-1">Catalyst Alignment:</span>
                    Macro momentum score 4.8/5 reduces the probability of a false breakdown at primary support.
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </section>

      {/* 7. FINANCIAL DATA TABLE: "What you can analyze on PatternFlow" */}
      <section id="markets" className="py-24 px-5 md:px-10 max-w-[1440px] mx-auto relative z-20">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3] mb-3">Asset Coverage</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            <span className="text-white">What you can analyze </span>
            <span className="text-white/40">on PatternFlow.</span>
          </h2>
          <p className="text-base md:text-lg text-[#a3a3a3] leading-relaxed">
            From blue-chip equities to decentralized crypto perps and FX pairs. Simply screenshot and upload.
          </p>
        </div>

        {/* Clean Financial Table (Liquid Style) */}
        <div className="w-full overflow-x-auto rounded-3xl border border-white/[0.1] bg-[#0c0c0c]">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-xs font-semibold uppercase tracking-wider text-[#a3a3a3]">
                <th className="py-5 px-6">Market Type</th>
                <th className="py-5 px-6">Example Markets</th>
                <th className="py-5 px-6">Engine Capabilities</th>
                <th className="py-5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-sm">
              {marketCatalog.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-medium text-white">{row.category}</td>
                  <td className="py-5 px-6 font-mono text-xs text-[#a3a3a3]">{row.examples}</td>
                  <td className="py-5 px-6 text-[#a3a3a3]">{row.engine}</td>
                  <td className="py-5 px-6 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E396]/10 text-[#00E396] text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E396]"></span>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {/* 8. BEFORE VS AFTER COMPARISON MATRIX */}
      <section id="comparison" className="py-24 px-5 md:px-10 max-w-[1440px] mx-auto relative z-20">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            <span className="text-white">Trade what you see. </span>
            <span className="text-white/40">Not what you hope.</span>
          </h2>
          <p className="text-base md:text-lg text-[#a3a3a3]">
            Stop losing capital to emotional bias, lagging indicators, and cluttered chart screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traditional Guesswork */}
          <div className="rounded-3xl border border-red-500/20 bg-[#120a0d] p-8 md:p-10">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm uppercase tracking-wider mb-6">
              <AlertCircle size={18} /> Traditional Guesswork
            </div>
            <ul className="space-y-4 text-sm text-[#a3a3a3]">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Staring at 15 overlapping indicators with analysis paralysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Buying breakouts at the top and getting swept by institutional traps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Wider stop-losses moved in emotional denial during drawdowns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">✕</span>
                <span>Blindly following signal groups with zero risk management framework</span>
              </li>
            </ul>
          </div>

          {/* With PatternFlow v2.0 */}
          <div className="rounded-3xl border border-[#00E396]/30 bg-[#0a120e] p-8 md:p-10 shadow-[0_0_40px_rgba(0,227,150,0.08)]">
            <div className="flex items-center gap-2 text-[#00E396] font-semibold text-sm uppercase tracking-wider mb-6">
              <CheckCircle2 size={18} /> With PatternFlow v2.0
            </div>
            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00E396] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Instant structural breakdown of Order Blocks and FVGs in 3s</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00E396] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Clear visual support/resistance zones drawn directly on your chart</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00E396] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Rigid mathematical invalidation price before you ever risk capital</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00E396] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>3-Timeframe confluence scoring to avoid false signals and noise</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 9. TRANSPARENT PRICING SECTION */}
      <section id="pricing" className="py-24 px-5 md:px-10 max-w-[1440px] mx-auto relative z-20 scroll-mt-24">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a3a3a3] mb-3">Transparent Plans</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4">
            <span className="text-white">Invest in </span>
            <span className="text-white/40">disciplined execution.</span>
          </h2>
          <p className="text-base md:text-lg text-[#a3a3a3]">
            One avoided emotional mistake pays for years of PatternFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Monthly */}
          <div className="rounded-3xl border border-white/[0.1] bg-[#0c0c0c] p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-medium text-white mb-2">Pro Monthly</h3>
              <p className="text-sm text-[#a3a3a3] mb-6">Flexible month-to-month access.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-medium text-white">$29.99</span>
                <span className="text-sm text-[#a3a3a3]">/ month</span>
              </div>

              <ul className="space-y-3.5 text-sm text-[#a3a3a3] mb-8">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span>Unlimited AI Chart Analyses</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span>All Timeframes (1m, 5m, 15m, 1H, 4H, Daily)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span>Smart Money Concepts (SMC & FVG)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span>Interactive AI Chart Chat</span>
                </li>
              </ul>
            </div>

            <Link 
              to="/onboarding" 
              className="w-full text-center py-3.5 rounded-full font-medium text-sm bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1] transition-all"
            >
              Start Monthly Plan
            </Link>
          </div>

          {/* Yearly (Highlighted with Liquid Neon Accent) */}
          <div className="rounded-3xl border-2 border-[#00E396] bg-[#0c0c0c] p-8 md:p-10 flex flex-col justify-between relative shadow-[0_0_50px_rgba(0,227,150,0.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00E396] text-[#05160E] font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              Save 60% • Most Popular
            </div>

            <div>
              <h3 className="text-2xl font-medium text-white mb-2">Pro Annual</h3>
              <p className="text-sm text-[#a3a3a3] mb-6">Best value for disciplined active traders.</p>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-medium text-white">$12.00</span>
                <span className="text-sm text-[#a3a3a3]">/ month</span>
              </div>
              <p className="text-xs text-[#00E396] font-medium mb-8">Billed $144 annually (Save $215/year)</p>

              <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span className="font-semibold text-white">Everything in Pro Monthly</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span>Priority GPU AI Analysis Latency</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span>Multi-Timeframe Confluence Scoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00E396] stroke-[3]" />
                  <span>All Future AI Engine Upgrades Included</span>
                </li>
              </ul>
            </div>

            <Link 
              to="/onboarding" 
              className="w-full text-center py-3.5 rounded-full font-semibold text-sm bg-white hover:opacity-90 text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Claim 60% Discount Now
            </Link>
          </div>

        </div>

        {/* Free Trial Banner */}
        <div className="mt-12 text-center text-xs sm:text-sm text-[#a3a3a3] rounded-full border border-white/[0.08] bg-[#0e0e0e] py-3 px-6 max-w-lg mx-auto flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-[#00E396]" />
          <span>New user? <strong className="text-white">Your first chart analysis is 100% free</strong> without entering a credit card.</span>
        </div>

      </section>

      {/* 10. LIQUID NATIVE HTML <details> ACCORDION FAQ */}
      <section id="faq" className="py-24 px-5 md:px-10 max-w-3xl mx-auto relative z-20 scroll-mt-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-2">
            <span className="text-white">Frequently Asked </span>
            <span className="text-white/40">Questions</span>
          </h2>
          <p className="text-sm text-[#a3a3a3]">Everything you need to know about PatternFlow.</p>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>Does PatternFlow provide financial advice or trade calls?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#a3a3a3] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#a3a3a3] md:text-base">
              No. PatternFlow is purely an educational technical analysis tool. It visually highlights chart structure, order blocks, and key invalidation bounds. It never instructs you to buy or sell.
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>What chart platforms and brokers are supported?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#a3a3a3] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#a3a3a3] md:text-base">
              You can upload screenshots from any platform: TradingView, Zerodha, Binance, MetaTrader, Robinhood, Upstox, or photo snapshots taken from your mobile device.
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>How does it detect Smart Money Concepts (SMC)?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#a3a3a3] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#a3a3a3] md:text-base">
              Our vision engine evaluates candlestick geometry, identifying consecutive opposing candle impulses (Order Blocks), non-overlapping wick voids (Fair Value Gaps), and swing displacement breaks (Break of Structure).
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>Can I test it before purchasing?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#a3a3a3] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#a3a3a3] md:text-base">
              Yes. Every new account receives 1 free full chart analysis immediately, without requiring credit card or payment information.
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>Can I cancel my subscription at any time?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#a3a3a3] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#a3a3a3] md:text-base">
              Yes, you can cancel your subscription with a single click from the Billing page inside your dashboard at any time.
            </div>
          </details>

        </div>
      </section>

      {/* 11. LIQUID DRAMATIC FINAL CTA */}
      <section className="py-24 px-5 md:px-10 max-w-[1440px] mx-auto text-center relative z-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">
            <span className="text-white">Start analyzing with </span>
            <span className="text-white/40">institutional precision.</span>
          </h2>
          <p className="text-base md:text-lg text-[#a3a3a3] mb-10">
            Join disciplined traders moving faster, avoiding liquidity traps, and staying in full control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/onboarding" 
              className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-black transition-all hover:opacity-90 shadow-lg hover:-translate-y-0.5"
            >
              Analyze Your First Chart Free ↗
            </Link>
            <a 
              href="#demo" 
              className="rounded-full border border-white/[0.12] bg-white/[0.03] px-7 py-3.5 text-base font-medium text-white hover:bg-white/[0.08] hover:border-white/20 transition-all"
            >
              Back to Terminal Sample ↑
            </a>
          </div>
        </div>
      </section>

      {/* 12. LIQUID MINIMALIST FOOTER */}
      <footer className="border-t border-[#262626] py-14 px-5 md:px-10 bg-[#080808] relative z-20">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#141414] border border-[#2e2e2e] flex items-center justify-center p-1">
              <img src="/logo.png" alt="PatternFlow" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-white text-base">PatternFlow</span>
            <span className="text-xs text-[#a3a3a3] ml-2">© {new Date().getFullYear()} PatternFlow.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#a3a3a3]">
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#a3a3a3] bg-[#111111] border border-white/[0.08] px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E396] shadow-[0_0_8px_#00E396]"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
