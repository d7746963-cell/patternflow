import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle2, ArrowRight, ChevronDown, TrendingDown, TrendingUp, 
  Activity, BarChart2, Target, Zap, BookOpen, ChevronRight, Sparkles, 
  Send, AlertCircle, Info, Upload, ThumbsUp, ShieldCheck, 
  Layers, Lock, Cpu, Clock, Terminal, Check, ExternalLink, ArrowUpRight
} from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { FREE_BETA_MODE } from "../config/features";

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
      status: "Verified (All Global Exchanges)"
    },
    {
      category: "Crypto & Perps",
      examples: "BTC/USD, ETH/USD, SOL, SUI, DOGE",
      engine: "Liquidity Sweeps, Fair Value Gaps, 24/7 SMC Order Blocks",
      status: "Verified (Spot & Perpetual Futures)"
    },
    {
      category: "Global Indices",
      examples: "SPY, QQQ, NIFTY 50, BANKNIFTY, DAX",
      engine: "Session Open Liquidity, Key Daily Pivot Retests, ATR Bounds",
      status: "Verified (Cash & Index Futures)"
    },
    {
      category: "Commodities & Metals",
      examples: "Gold (XAU), Silver (XAG), Crude Oil (WTI)",
      engine: "Fibonacci Golden Pocket Reversals, Supply Demand Imbalances",
      status: "Verified (Comex & MCX)"
    },
    {
      category: "Forex & Currencies",
      examples: "EUR/USD, GBP/USD, USD/JPY, AUD/USD",
      engine: "London & NY Session Killzones, Institutional Liquidity Runs",
      status: "Verified (All Major & Cross Pairs)"
    }
  ];

  const filteredTicker = marketFilter === "all" 
    ? tickerRow1 
    : tickerRow1.filter(item => item.type === marketFilter);

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-[#2997ff] selection:text-white overflow-x-hidden relative">
      
      {/* 1. TOP ANNOUNCEMENT BAR (Apple-Style Subtle Ambient Glass) */}
      <aside aria-label="Announcement" className="w-full border-b border-white/[0.08] bg-[#0c0c0e]/90 backdrop-blur-xl px-4 py-2 text-center text-xs text-[#86868b] transition-colors relative z-50">
        <span className="font-normal">
          PatternFlow 2.0 Engine Live — Smart Money Concepts (SMC), Order Blocks & Multi-Timeframe Confluence.
        </span>
        <a 
          href="#demo" 
          className="ml-1.5 font-medium text-white hover:text-[#2997ff] underline underline-offset-4 decoration-white/20 hover:decoration-[#2997ff] transition-all inline-flex items-center gap-0.5"
        >
          Explore the interactive demo <ArrowUpRight size={13} />
        </a>
      </aside>

      {/* 2. APPLE FLOATING TRANSLUCENT NAVIGATION (macOS / iOS Dynamic Island Craft) */}
      <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#000000]/75 backdrop-blur-2xl backdrop-saturate-150 transition-all">
        <div className="mx-auto flex h-14 md:h-16 max-w-[1240px] items-center justify-between px-5 md:px-8">
          
          {/* Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-b from-[#242426] to-[#121214] border border-white/[0.12] flex items-center justify-center p-1 shadow-sm group-hover:border-[#00d060]/50 transition-colors">
              <img src="/logo.png" alt="PatternFlow" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-1.5 font-medium text-[15px] tracking-[-0.01em] text-[#f5f5f7]">
              <span>PatternFlow</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-white/[0.08] text-[#86868b] border border-white/[0.06] font-medium ml-1">2.0</span>
            </div>
          </Link>

          {/* Center Navigation Links (Apple Typography & Spacing) */}
          <nav className="hidden items-center gap-8 md:flex text-[13px] font-normal text-[#86868b] tracking-[-0.01em]">
            <a href="#demo" className="hover:text-white transition-colors duration-150">Overview</a>
            <a href="#features" className="hover:text-white transition-colors duration-150">SMC Engine</a>
            <a href="#markets" className="hover:text-white transition-colors duration-150">Markets</a>
            <a href="#comparison" className="hover:text-white transition-colors duration-150">Discipline</a>
            <a href="#pricing" className="hover:text-white transition-colors duration-150">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors duration-150">Support</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3.5">
            <SignedIn>
              <Link 
                to="/upload" 
                className="hidden text-[13px] font-medium text-[#86868b] hover:text-white md:inline-block transition-colors duration-150"
              >
                Dashboard
              </Link>
            </SignedIn>
            <SignedOut>
              <Link 
                to="/onboarding" 
                className="hidden text-[13px] font-medium text-[#86868b] hover:text-white md:inline-block transition-colors duration-150"
              >
                Sign in
              </Link>
            </SignedOut>

            <Link 
              to="/onboarding" 
              className="apple-btn rounded-full bg-white text-black text-[13px] font-semibold px-4 py-1.5 shadow-[0_2px_12px_rgba(255,255,255,0.15)] hover:bg-[#e8e8ed]"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Apple Studio Typography & Physical Depth) */}
      <section className="relative z-10 pt-16 pb-16 md:pt-28 md:pb-28 px-5 md:px-8 max-w-[1240px] mx-auto text-center flex flex-col items-center">
        
        {/* Apple Category Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-[#161618]/70 backdrop-blur-xl px-4 py-1 text-xs text-[#86868b] mb-8 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00d060] shadow-[0_0_8px_#00d060]"></span>
          <span className="text-[#f5f5f7] font-medium">Smart Money Concepts</span>
          <span className="text-white/20">/</span>
          <span>Order Blocks, BOS & Fair Value Gaps</span>
        </div>

        {/* Apple Display Headline (Negative Tracking, Tight Leading) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-semibold tracking-[-0.035em] text-white leading-[1.04] mb-6 max-w-5xl">
          <span>Decode any chart. </span>
          <br className="hidden sm:inline" />
          <span className="text-[#86868b]">With institutional clarity.</span>
        </h1>

        {/* Clean Secondary Lead */}
        <p className="text-[#86868b] text-base md:text-[21px] font-normal max-w-2xl leading-[1.4] tracking-[-0.015em] mb-10">
          Upload any screenshot from TradingView, your broker, or a phone snapshot. 
          PatternFlow maps structural order blocks, multi-timeframe consensus, and exact ATR invalidation stops.
        </p>

        {/* Tactile Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <Link 
            to="/onboarding" 
            className="apple-btn w-full sm:w-auto rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-[15px] font-semibold px-8 py-3.5 shadow-[0_4px_20px_rgba(0,113,227,0.35)] flex items-center justify-center gap-2"
          >
            Start Analyzing Free <ArrowRight size={16} className="stroke-[2.5]" />
          </Link>
          
          <a 
            href="#demo" 
            className="apple-btn w-full sm:w-auto rounded-full border border-white/[0.14] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 text-[#f5f5f7] text-[15px] font-medium px-7 py-3.5 backdrop-blur-xl flex items-center justify-center gap-2"
          >
            Explore Live Terminal ↓
          </a>
        </div>

        {/* Apple Triad Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-12 text-xs sm:text-[13px] text-[#86868b] tracking-[-0.01em]">
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#00d060] stroke-[3]" />
            <span>1 Full Analysis Free</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#00d060] stroke-[3]" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-[#00d060] stroke-[3]" />
            <span>&lt; 3.0s Latency</span>
          </div>
        </div>

        {/* HERO VISUAL: macOS Style Glass Workspace Terminal */}
        <div className="mt-14 w-full max-w-[1120px] relative">
          
          {/* Main Desktop Display Frame */}
          <div className="apple-card rounded-2xl md:rounded-3xl p-3 sm:p-5 shadow-[0_30px_90px_rgba(0,0,0,0.85)] text-left relative overflow-hidden">
            
            {/* macOS Window Titlebar */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3.5 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/20"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/20"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/20"></span>
                <span className="text-[12px] font-mono text-[#86868b] ml-3 hidden sm:inline">PatternFlow Engine — Live Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d060]/10 text-[#00d060] text-[11px] font-mono font-medium border border-[#00d060]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d060] animate-pulse"></span>
                  SMC & FVG ENGINE ACTIVE
                </span>
              </div>
            </div>

            {/* Terminal Body Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
              
              {/* Left Chart Preview Area */}
              <div className="lg:col-span-8 rounded-xl border border-white/[0.08] bg-[#000000] p-2 sm:p-3 overflow-hidden relative">
                <img 
                  src="/chart_demo.png" 
                  alt="PatternFlow Chart Analysis Terminal" 
                  className="w-full h-[260px] sm:h-[390px] object-cover rounded-lg opacity-90"
                />
                
                {/* Floating SMC Marker Overlay */}
                <div className="absolute top-6 left-6 rounded-2xl border border-[#00d060]/30 bg-[#161618]/90 backdrop-blur-2xl px-4 py-2.5 shadow-xl">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#00d060]"></span>
                    <span className="text-xs font-mono font-semibold text-white">Bullish Order Block ($92,400 - $92,850)</span>
                  </div>
                  <span className="text-[11px] text-[#86868b]">Confluence: 94% · 3-Timeframe Consensus</span>
                </div>

                <div className="absolute bottom-6 right-6 rounded-2xl border border-red-500/30 bg-[#161618]/90 backdrop-blur-2xl px-4 py-2.5 shadow-xl">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff453a]"></span>
                    <span className="text-xs font-mono font-semibold text-white">2N ATR Invalidation: $91,400</span>
                  </div>
                  <span className="text-[11px] text-red-400">Strict Stop Boundary (1 : 3.1 R:R)</span>
                </div>
              </div>

              {/* Right Diagnostic Summary */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 backdrop-blur-xl p-4">
                  <span className="text-[11px] font-mono text-[#86868b] uppercase tracking-wider block mb-1">Asset Diagnosis</span>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-white">BTC/USD (4H)</span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#00d060]/15 text-[#00d060]">Bullish Breakout</span>
                  </div>
                  <p className="text-xs text-[#86868b] mt-2 leading-relaxed">
                    Confirmed Break of Structure (BOS) above $93,500. Retrace testing unmitigated 4H demand zone.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 backdrop-blur-xl p-3">
                    <span className="text-[11px] text-[#86868b] block mb-0.5">Target Extension</span>
                    <span className="text-sm font-mono font-semibold text-[#00d060]">$98,400</span>
                  </div>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 backdrop-blur-xl p-3">
                    <span className="text-[11px] text-[#86868b] block mb-0.5">Risk-to-Reward</span>
                    <span className="text-sm font-mono font-semibold text-white">1 : 3.2 Asymmetric</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#00d060]/20 bg-[#00d060]/[0.03] p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={15} className="text-[#00d060]" />
                    <span className="text-xs font-medium text-white">Instant Model Verification</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#00d060]">Pass (3/3)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Overlapping Floating iOS Card (Apple Physicality) */}
          <div className="hidden md:block absolute -bottom-8 -right-4 w-72 rounded-3xl border border-white/[0.16] bg-[#161618]/90 backdrop-blur-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-left z-30">
            <div className="flex items-center justify-between mb-3 border-b border-white/[0.08] pb-2">
              <span className="text-xs font-mono text-[#86868b]">Execution Thesis</span>
              <span className="text-[11px] font-semibold text-[#00d060]">Active Setup</span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-semibold text-white">Long BTC</span>
              <span className="text-sm font-mono font-semibold text-[#00d060]">+$1,420.00</span>
            </div>
            <div className="w-full bg-white/[0.08] h-1.5 rounded-full overflow-hidden mb-3">
              <div className="bg-[#00d060] h-full w-[78%]"></div>
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#86868b]">
              <span>Entry: $92,400</span>
              <span>Target: $98,400</span>
            </div>
          </div>

        </div>

      </section>

      {/* 4. APPLE FILTERABLE TICKER RIBBON */}
      <section className="w-full border-y border-white/[0.08] bg-[#0c0c0e]/60 backdrop-blur-xl py-5 overflow-hidden relative z-20">
        
        {/* Category Filter Pills (Apple Segmented Control) */}
        <div className="max-w-[1240px] mx-auto px-5 mb-4 flex items-center justify-center gap-1.5">
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
              className={`apple-btn rounded-full px-3.5 py-1 text-xs transition-all ${
                marketFilter === tab.id 
                  ? "bg-white text-black font-semibold shadow-sm" 
                  : "bg-white/[0.04] text-[#86868b] hover:text-white border border-white/[0.06]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Marquee Row 1 */}
        <div className="flex items-center gap-4 w-max animate-marquee pl-4 mb-3">
          {[...filteredTicker, ...filteredTicker, ...filteredTicker].map((item, idx) => (
            <div 
              key={`r1-${idx}`} 
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#161618]/60 backdrop-blur-md px-4 py-1.5 hover:border-white/25 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-semibold text-white">
                {item.pair.charAt(0)}
              </div>
              <span className="text-xs font-medium text-white">{item.pair}</span>
              <span className="text-xs text-[#86868b]">{item.price}</span>
              <span className={`text-xs font-semibold ${item.up ? "text-[#00d060]" : "text-[#ff453a]"}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Marquee Row 2 (Reverse) */}
        <div className="flex items-center gap-4 w-max animate-marquee-reverse pl-4">
          {[...tickerRow2, ...tickerRow2, ...tickerRow2].map((item, idx) => (
            <div 
              key={`r2-${idx}`} 
              className="inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-[#161618]/60 backdrop-blur-md px-4 py-1.5 hover:border-white/25 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-semibold text-white">
                {item.pair.charAt(0)}
              </div>
              <span className="text-xs font-medium text-white">{item.pair}</span>
              <span className="text-xs text-[#86868b]">{item.price}</span>
              <span className={`text-xs font-semibold ${item.up ? "text-[#00d060]" : "text-[#ff453a]"}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. APPLE BENTO SHOWCASE ("Designed for clarity. Engineered for speed.") */}
      <section id="features" className="py-28 px-5 md:px-8 max-w-[1240px] mx-auto relative z-20">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] mb-2">Institutional Intelligence</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-4">
            <span className="text-white">Designed for clarity. </span>
            <span className="text-[#86868b]">Engineered for discipline.</span>
          </h2>
          <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
            Eliminate 20 lagging indicators. PatternFlow analyzes raw candlestick physics, institutional liquidity sweeps, and fair value voids.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Fluid Signal Geometry */}
          <div className="apple-card rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all group">
            <div className="w-full h-44 rounded-2xl bg-[#000000] border border-white/[0.06] p-4 relative overflow-hidden mb-8 flex flex-col justify-between">
              
              <div className="flex items-center justify-between text-xs font-medium relative z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00d060]/15 text-[#00d060] border border-[#00d060]/30 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d060]"></span> Long Breakout
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ff453a]/15 text-[#ff453a] border border-[#ff453a]/30 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff453a]"></span> Short Pullback
                </span>
              </div>

              {/* Glowing SVG Wave */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg viewBox="0 0 400 160" className="w-full h-full opacity-90" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="appleGreenWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00d060" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00d060" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="appleRedWave" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#ff453a" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#ff453a" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <line x1="0" y1="80" x2="400" y2="80" stroke="#2c2c2e" strokeDasharray="4 4" strokeWidth="1" />
                  <path d="M 0 80 Q 100 0 200 80 L 200 80 L 0 80 Z" fill="url(#appleGreenWave)" />
                  <path d="M 0 80 Q 100 0 200 80" stroke="#00d060" strokeWidth="2.5" fill="none" />
                  <path d="M 200 80 Q 300 160 400 80 L 400 80 L 200 80 Z" fill="url(#appleRedWave)" />
                  <path d="M 200 80 Q 300 160 400 80" stroke="#ff453a" strokeWidth="2.5" fill="none" />
                </svg>
              </div>

              <div className="relative z-10 text-center">
                <span className="text-[10px] font-mono text-[#86868b] bg-[#161618] px-2 py-0.5 rounded border border-white/[0.08]">
                  Equilibrium Zero Axis
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2 tracking-[-0.015em]">Go long. Go short.</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                Think an asset will rally? Identify the unmitigated bullish Order Block. Expecting a breakdown? Map the Fair Value Gap. PatternFlow gives you both sides with strict invalidation bounds.
              </p>
            </div>
          </div>

          {/* Card 2: Concentric Radar Rings */}
          <div className="apple-card rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all group">
            <div className="w-full h-44 rounded-2xl bg-[#000000] border border-white/[0.06] p-4 relative overflow-hidden mb-8 flex items-center justify-center">
              
              <div className="absolute w-32 h-32 rounded-full bg-[#0071e3]/10 blur-xl"></div>
              
              <div className="w-36 h-36 rounded-full border border-[#0071e3]/20 flex items-center justify-center relative">
                <span className="absolute -top-2.5 text-[9px] font-mono text-[#2997ff] bg-[#000000] px-2 py-0.5 rounded border border-[#0071e3]/30">
                  4H · Trend Alignment
                </span>
                
                <div className="w-24 h-24 rounded-full border border-[#0071e3]/40 flex items-center justify-center relative">
                  <span className="absolute -bottom-2 text-[9px] font-mono text-[#2997ff] bg-[#000000] px-2 py-0.5 rounded border border-[#0071e3]/30">
                    1H · Demand Zone
                  </span>

                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0071e3]/30 to-[#00d060]/20 border border-[#2997ff] flex flex-col items-center justify-center shadow-[0_0_25px_rgba(41,151,255,0.4)]">
                    <span className="text-xs font-mono font-bold text-white">94%</span>
                    <span className="text-[8px] font-mono text-[#2997ff]">SYNC</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2 tracking-[-0.015em]">Multi-timeframe confluence.</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                Never trade an isolated 5-minute candle. Our engine evaluates higher-timeframe trend, RSI momentum divergence, and liquidity sweeps simultaneously before scoring a setup.
              </p>
            </div>
          </div>

          {/* Card 3: 2N ATR Invalidation Bounds */}
          <div className="apple-card rounded-3xl p-8 flex flex-col justify-between hover:border-white/20 transition-all group">
            <div className="w-full h-44 rounded-2xl bg-[#000000] border border-white/[0.06] p-4 relative overflow-hidden mb-8 flex flex-col items-center justify-center">
              
              <div 
                className="rounded-full px-6 py-2.5 font-mono font-bold text-base mb-3 flex items-center gap-2 transform group-hover:scale-105 transition-transform duration-200"
                style={{
                  background: '#00d060',
                  color: '#000000',
                  boxShadow: '0 0 35px rgba(0, 208, 96, 0.45)'
                }}
              >
                <span>+$1,284.50</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/20 text-black font-sans font-bold">+3.4R</span>
              </div>

              <span className="text-xs text-[#86868b] font-mono">
                2N ATR Invalidation Boundary
              </span>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-2 tracking-[-0.015em]">Zero guesswork risk bounds.</h3>
              <p className="text-sm text-[#86868b] leading-relaxed">
                Every trade thesis specifies an exact mathematical invalidation price using 2N Average True Range buffers. If price crosses the boundary, the thesis is void. No emotional holding.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* 6. INTERACTIVE TERMINAL SHOWCASE (#demo) */}
      <section id="demo" className="py-24 px-5 md:px-8 max-w-[1240px] mx-auto relative z-20 scroll-mt-24">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] mb-2">Live Terminal Experience</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-4">
            <span className="text-white">See it. Size it. </span>
            <span className="text-[#86868b]">Execute it.</span>
          </h2>
          <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
            Drop in any chart snapshot. PatternFlow renders institutional levels directly onto your canvas with comprehensive risk ratios.
          </p>
        </div>

        {/* Terminal Container */}
        <div className="apple-card rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)]">
          
          {/* Header Controls */}
          <div className="border-b border-white/[0.08] bg-[#161618]/80 backdrop-blur-xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span className="text-xs font-mono text-[#86868b] ml-2 hidden sm:inline">patternflow-engine://analysis/interactive</span>
            </div>

            {/* Asset Tabs */}
            <div className="flex items-center rounded-full bg-[#000000]/60 border border-white/[0.08] p-1 text-xs">
              {["BTC/USD", "NVDA", "ETH/USD"].map((asset) => (
                <button
                  key={asset}
                  onClick={() => setSelectedAsset(asset)}
                  className={`apple-btn rounded-full px-4 py-1.5 transition-all ${
                    selectedAsset === asset 
                      ? "bg-white text-black font-semibold shadow-sm" 
                      : "text-[#86868b] hover:text-white"
                  }`}
                >
                  {asset}
                </button>
              ))}
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center rounded-full bg-[#000000]/60 border border-white/[0.08] p-1 text-xs">
              <button 
                onClick={() => setSampleView("technical")}
                className={`apple-btn rounded-full px-3.5 py-1.5 transition-all ${
                  sampleView === "technical" ? "bg-white/[0.12] text-white font-medium" : "text-[#86868b] hover:text-white"
                }`}
              >
                Technical Setup
              </button>
              <button 
                onClick={() => setSampleView("news")}
                className={`apple-btn rounded-full px-3.5 py-1.5 transition-all ${
                  sampleView === "news" ? "bg-white/[0.12] text-white font-medium" : "text-[#86868b] hover:text-white"
                }`}
              >
                Macro Catalyst
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Preview */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#000000] p-2 overflow-hidden relative">
                <img 
                  src="/chart_demo.png" 
                  alt="Chart Breakdown" 
                  className="w-full h-72 sm:h-84 object-cover rounded-xl opacity-95"
                />
                <div className="absolute top-4 left-4 rounded-full border border-[#00d060]/30 bg-[#161618]/90 backdrop-blur-xl px-3 py-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00d060] animate-pulse"></span>
                  <span className="text-xs font-mono font-semibold text-white">4H Order Block Retest</span>
                </div>
              </div>

              {/* 4 Diagnostic Gauges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#86868b] block mb-1">Market Regime</span>
                  <span className="text-sm font-semibold text-[#00d060] flex items-center gap-1.5">
                    <TrendingUp size={15} /> Bullish Continuation
                  </span>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#86868b] block mb-1">Volume Profile</span>
                  <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <BarChart2 size={15} className="text-[#2997ff]" /> Expanding Buyers
                  </span>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#86868b] block mb-1">RSI Confluence</span>
                  <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Activity size={15} className="text-[#ffd60a]" /> Hidden Bull Div
                  </span>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 p-3.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#86868b] block mb-1">Risk-to-Reward</span>
                  <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                    <Target size={15} className="text-[#00d060]" /> 1 : 3.2 Ratio
                  </span>
                </div>
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {sampleView === "technical" ? (
                <>
                  <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-semibold text-[#00d060] uppercase">Institutional Setup</span>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#00d060]/15 text-[#00d060]">High Conviction</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-[-0.015em]">Order Block Retest with Break of Structure</h3>
                    <p className="text-sm text-[#86868b] leading-relaxed mb-6">
                      Decisive 4H body close verified above previous swing high resistance ($93,500). Price is currently retracing into the unmitigated demand zone coinciding with the 0.618 Fibonacci level.
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
                      <div>
                        <span className="text-xs text-[#86868b] block mb-1">Entry Zone:</span>
                        <span className="text-sm font-mono font-semibold text-[#00d060]">$92,400 – $92,850</span>
                      </div>
                      <div>
                        <span className="text-xs text-[#86868b] block mb-1">Target Extension:</span>
                        <span className="text-sm font-mono font-semibold text-white">$98,400 (1.618 Fib)</span>
                      </div>
                    </div>
                  </div>

                  {/* Failure Boundary */}
                  <div className="rounded-2xl border border-red-500/25 bg-[#1c0f12]/60 p-5 flex items-start gap-3.5">
                    <AlertCircle size={20} className="text-[#ff453a] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-[#ff453a] font-semibold text-sm mb-1">Strict Mathematical Invalidation</h4>
                      <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                        A 4H candle close below <span className="text-white font-mono font-bold">$91,400</span> invalidates the structure and breaks bullish character (ChoCH). Cut risk instantly if this boundary breaches.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-white/[0.08] bg-[#161618]/60 p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#2997ff] uppercase">
                    <Sparkles size={14} /> Macro Flow Layer
                  </div>
                  <h3 className="text-xl font-semibold text-white tracking-[-0.015em]">Institutional ETF Inflows Accelerate</h3>
                  <p className="text-sm text-[#86868b] leading-relaxed">
                    Net institutional capital allocation recorded $840M in positive inflows over the last 48 hours. This macro tailwind corroborates the technical breakout above the 50-day moving average.
                  </p>
                  <div className="p-4 rounded-xl bg-[#000000] border border-white/[0.08] text-xs text-[#86868b]">
                    <span className="text-[#00d060] font-semibold block mb-1">Catalyst Alignment:</span>
                    Macro momentum score 4.8/5 reduces the probability of a false breakdown at primary support.
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </section>

      {/* 7. FINANCIAL DATA TABLE: "What you can analyze on PatternFlow" */}
      <section id="markets" className="py-24 px-5 md:px-8 max-w-[1240px] mx-auto relative z-20">
        
        <div className="max-w-3xl mb-14 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] mb-2">Asset Coverage</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-4">
            <span className="text-white">What you can analyze </span>
            <span className="text-[#86868b]">on PatternFlow.</span>
          </h2>
          <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
            From blue-chip equities to decentralized crypto perps and FX pairs. Simply screenshot and upload.
          </p>
        </div>

        <div className="w-full overflow-x-auto apple-card rounded-3xl">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                <th className="py-5 px-6">Market Type</th>
                <th className="py-5 px-6">Example Markets</th>
                <th className="py-5 px-6">Engine Capabilities</th>
                <th className="py-5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-sm">
              {marketCatalog.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 font-semibold text-white">{row.category}</td>
                  <td className="py-5 px-6 font-mono text-xs text-[#86868b]">{row.examples}</td>
                  <td className="py-5 px-6 text-[#86868b]">{row.engine}</td>
                  <td className="py-5 px-6 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00d060]/10 text-[#00d060] text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00d060]"></span>
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
      <section id="comparison" className="py-24 px-5 md:px-8 max-w-[1240px] mx-auto relative z-20">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-4">
            <span className="text-white">Trade what you see. </span>
            <span className="text-[#86868b]">Not what you hope.</span>
          </h2>
          <p className="text-base md:text-lg text-[#86868b]">
            Stop losing capital to emotional bias, lagging indicators, and cluttered chart screens.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Traditional Guesswork */}
          <div className="rounded-3xl border border-red-500/20 bg-[#160b0e]/70 backdrop-blur-xl p-8 md:p-10">
            <div className="flex items-center gap-2 text-[#ff453a] font-semibold text-sm uppercase tracking-wider mb-6">
              <AlertCircle size={18} /> Traditional Guesswork
            </div>
            <ul className="space-y-4 text-sm text-[#86868b]">
              <li className="flex items-start gap-3">
                <span className="text-[#ff453a] font-bold">✕</span>
                <span>Staring at 15 overlapping indicators with analysis paralysis</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff453a] font-bold">✕</span>
                <span>Buying breakouts at the top and getting swept by institutional traps</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff453a] font-bold">✕</span>
                <span>Wider stop-losses moved in emotional denial during drawdowns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#ff453a] font-bold">✕</span>
                <span>Blindly following signal groups with zero risk management framework</span>
              </li>
            </ul>
          </div>

          {/* With PatternFlow 2.0 */}
          <div className="rounded-3xl border border-[#00d060]/30 bg-[#0a140f]/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_40px_rgba(0,208,96,0.08)]">
            <div className="flex items-center gap-2 text-[#00d060] font-semibold text-sm uppercase tracking-wider mb-6">
              <CheckCircle2 size={18} /> With PatternFlow 2.0
            </div>
            <ul className="space-y-4 text-sm text-[#f5f5f7]">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Instant structural breakdown of Order Blocks and FVGs in 3s</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Clear visual support/resistance zones drawn directly on your chart</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>Rigid mathematical invalidation price before you ever risk capital</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-[#00d060] flex-shrink-0 stroke-[3] mt-0.5" />
                <span>3-Timeframe confluence scoring to avoid false signals and noise</span>
              </li>
            </ul>
          </div>

        </div>

      </section>

      {/* 9. TRANSPARENT PRICING SECTION */}
      <section id="pricing" className="py-24 px-5 md:px-8 max-w-[1240px] mx-auto relative z-20 scroll-mt-24">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          {FREE_BETA_MODE ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d060]/15 border border-[#00d060]/30 text-[#00d060] text-xs font-mono font-bold uppercase tracking-wider mb-4 animate-pulse">
              <Sparkles size={14} /> Public Beta — 100% Free Access
            </div>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0071e3] mb-2">Transparent Plans</p>
          )}
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] mb-4">
            <span className="text-white">Invest in </span>
            <span className="text-[#86868b]">disciplined execution.</span>
          </h2>
          <p className="text-base md:text-lg text-[#86868b]">
            {FREE_BETA_MODE ? 'All institutional features are 100% free during early access beta.' : 'One avoided emotional mistake pays for years of PatternFlow.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Monthly */}
          <div className="apple-card rounded-3xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2 tracking-[-0.015em]">Pro Monthly</h3>
              <p className="text-sm text-[#86868b] mb-6">Flexible month-to-month access.</p>
              
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-semibold text-white tracking-[-0.03em]">$29.99</span>
                <span className="text-sm text-[#86868b]">/ month</span>
              </div>

              <ul className="space-y-3.5 text-sm text-[#86868b] mb-8">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span>Unlimited AI Chart Analyses</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span>All Timeframes (1m, 5m, 15m, 1H, 4H, Daily)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span>Smart Money Concepts (SMC & FVG)</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span>Interactive AI Chart Chat</span>
                </li>
              </ul>
            </div>

            <Link 
              to="/onboarding" 
              className="apple-btn w-full text-center py-3.5 rounded-full font-semibold text-sm bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1]"
            >
              {FREE_BETA_MODE ? 'Start Free in Beta' : 'Start Monthly Plan'}
            </Link>
          </div>

          {/* Yearly (Apple Primary Highlight) */}
          <div className="apple-card rounded-3xl p-8 md:p-10 flex flex-col justify-between relative border-[#00d060]/80 shadow-[0_0_50px_rgba(0,208,96,0.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00d060] text-black font-bold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
              Save 60% • Most Popular
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-2 tracking-[-0.015em]">Pro Annual</h3>
              <p className="text-sm text-[#86868b] mb-6">Best value for disciplined active traders.</p>
              
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-semibold text-white tracking-[-0.03em]">$12.00</span>
                <span className="text-sm text-[#86868b]">/ month</span>
              </div>
              <p className="text-xs text-[#00d060] font-medium mb-8">Billed $144 annually (Save $215/year)</p>

              <ul className="space-y-3.5 text-sm text-[#f5f5f7] mb-8">
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span className="font-semibold text-white">Everything in Pro Monthly</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span>Priority GPU AI Analysis Latency</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span>Multi-Timeframe Confluence Scoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check size={16} className="text-[#00d060] stroke-[3]" />
                  <span>All Future AI Engine Upgrades Included</span>
                </li>
              </ul>
            </div>

            <Link 
              to="/onboarding" 
              className="apple-btn w-full text-center py-3.5 rounded-full font-semibold text-sm bg-white hover:bg-[#e8e8ed] text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {FREE_BETA_MODE ? 'Start Free in Beta' : 'Claim 60% Discount Now'}
            </Link>
          </div>

        </div>

        {/* Free Trial / Public Beta Banner */}
        <div className="mt-12 text-center text-xs sm:text-sm text-[#86868b] rounded-full border border-white/[0.08] bg-[#161618]/60 backdrop-blur-xl py-3 px-6 max-w-lg mx-auto flex items-center justify-center gap-2">
          <Sparkles size={16} className="text-[#00d060]" />
          <span>
            {FREE_BETA_MODE ? (
              <>
                <strong className="text-white">Public Beta: Unlimited analyses are 100% free</strong> with no card required.
              </>
            ) : (
              <>
                New user? <strong className="text-white">Your first chart analysis is 100% free</strong> without entering a credit card.
              </>
            )}
          </span>
        </div>

      </section>

      {/* 10. APPLE NATIVE HTML <details> ACCORDION FAQ */}
      <section id="faq" className="py-24 px-5 md:px-8 max-w-3xl mx-auto relative z-20 scroll-mt-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.03em] mb-2">
            <span className="text-white">Frequently Asked </span>
            <span className="text-[#86868b]">Questions</span>
          </h2>
          <p className="text-sm text-[#86868b]">Everything you need to know about PatternFlow.</p>
        </div>

        <div className="space-y-0 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>Does PatternFlow provide financial advice or trade calls?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#86868b] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#86868b] md:text-base">
              No. PatternFlow is purely an educational technical analysis tool. It visually highlights chart structure, order blocks, and key invalidation bounds. It never instructs you to buy or sell.
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>What chart platforms and brokers are supported?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#86868b] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#86868b] md:text-base">
              You can upload screenshots from any platform: TradingView, Zerodha, Binance, MetaTrader, Robinhood, Upstox, or photo snapshots taken from your mobile device.
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>How does it detect Smart Money Concepts (SMC)?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#86868b] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#86868b] md:text-base">
              Our vision engine evaluates candlestick geometry, identifying consecutive opposing candle impulses (Order Blocks), non-overlapping wick voids (Fair Value Gaps), and swing displacement breaks (Break of Structure).
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>Can I test it before purchasing?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#86868b] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#86868b] md:text-base">
              Yes. Every new account receives 1 free full chart analysis immediately, without requiring credit card or payment information.
            </div>
          </details>

          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium text-white transition-colors hover:text-white/80 md:text-lg">
              <span>Can I cancel my subscription at any time?</span>
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/[0.12] text-base text-[#86868b] transition-transform duration-200 group-open:rotate-45">+</span>
            </summary>
            <div className="pb-6 text-sm leading-relaxed text-[#86868b] md:text-base">
              Yes, you can cancel your subscription with a single click from the Billing page inside your dashboard at any time.
            </div>
          </details>

        </div>
      </section>

      {/* 11. APPLE CLOSING CALL TO ACTION */}
      <section className="py-28 px-5 md:px-8 max-w-[1240px] mx-auto text-center relative z-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-[-0.03em] mb-4">
            <span className="text-white">Start analyzing with </span>
            <span className="text-[#86868b]">institutional precision.</span>
          </h2>
          <p className="text-base md:text-lg text-[#86868b] mb-10">
            Join disciplined traders moving faster, avoiding liquidity traps, and staying in full control.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/onboarding" 
              className="apple-btn rounded-full bg-[#0071e3] hover:bg-[#0077ed] px-8 py-3.5 text-[15px] font-semibold text-white shadow-[0_4px_20px_rgba(0,113,227,0.35)]"
            >
              Analyze Your First Chart Free ↗
            </Link>
            <a 
              href="#demo" 
              className="apple-btn rounded-full border border-white/[0.14] bg-white/[0.04] hover:bg-white/[0.08] px-7 py-3.5 text-[15px] font-medium text-white"
            >
              Back to Overview ↑
            </a>
          </div>
        </div>
      </section>

      {/* 12. APPLE MINIMALIST FOOTER */}
      <footer className="border-t border-white/[0.08] py-14 px-5 md:px-8 bg-[#000000] relative z-20">
        <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-[#161618] border border-white/[0.12] flex items-center justify-center p-0.5">
              <img src="/logo.png" alt="PatternFlow" className="w-full h-full object-contain" />
            </div>
            <span className="font-semibold text-white text-[13px] tracking-[-0.01em]">PatternFlow</span>
            <span className="text-xs text-[#86868b] ml-2">© {new Date().getFullYear()} PatternFlow.</span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#86868b]">
            <Link to="/terms" className="hover:text-white transition-colors duration-150">Terms of Service</Link>
            <Link to="/about" className="hover:text-white transition-colors duration-150">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors duration-150">Contact Support</Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#86868b] bg-[#161618] border border-white/[0.08] px-3.5 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d060] shadow-[0_0_8px_#00d060]"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
