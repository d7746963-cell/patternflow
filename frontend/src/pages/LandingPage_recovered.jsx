import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ChevronDown, LineChart, TrendingDown, TrendingUp, Activity, BarChart2, Target, Zap, BookOpen, Shield, ChevronRight } from 'lucide-react';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-6 cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="flex justify-between items-center gap-4">
        <h3 className="text-base font-semibold text-gray-900">{q}</h3>
        <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </div>
      {open && <p className="mt-4 text-gray-500 text-sm leading-relaxed">{a}</p>}
    </div>
  );
};

export default function LandingPage() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-[#00d060] selection:text-black">

      {/* ── NAVBAR ────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-gray-900">
            <div className="text-[#00d060]"><LineChart size={22} strokeWidth={2.5} /></div>
            PatternFlow
          </Link>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#how-it-works" className="hover:text-gray-900 transition">How it works</a>
            <a href="#features" className="hover:text-gray-900 transition">Features</a>
            <a href="#pricing" className="hover:text-gray-900 transition">Pricing</a>
            <a href="#faq" className="hover:text-gray-900 transition">FAQ</a>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <SignedIn>
              <Link to="/upload" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition hidden sm:block">Dashboard</Link>
            </SignedIn>
            <SignedOut>
              <Link to="/onboarding" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition hidden sm:block">Log in</Link>
            </SignedOut>
            <Link to="/onboarding" className="bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 text-sm rounded-lg font-semibold transition">
              Try for free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#f0fdf4] border border-[#bbf7d0] text-[#16a34a] text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
            <Zap size={12} />
            AI-Powered Chart Analysis
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.05] mb-6">
            Understand your<br />
            charts — <span className="text-[#00d060]">not just</span><br />
            stare at them.
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-10 leading-relaxed">
            Upload any chart and get a plain-English breakdown of trends, patterns, support and resistance — in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link to="/onboarding" className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-3.5 text-base rounded-xl font-semibold transition">
              Get started free <ArrowRight size={18} />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm font-medium transition">
              See how it works <ChevronRight size={16} />
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-4 mt-10">
            <div className="flex -space-x-2.5">
              {['men/32','women/44','men/68','women/63'].map((p, i) => (
                <img key={i} src={`https://randomuser.me/api/portraits/${p}.jpg`} alt="User" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-amber-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
                <span className="text-xs font-bold text-gray-900 ml-1">4.9/5</span>
              </div>
              <p className="text-xs text-gray-500">Trusted by <span className="font-semibold text-gray-800">10,000+</span> traders</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SCREENSHOT ───────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-200 py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            {/* Fake browser chrome */}
            <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="flex-1 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-400 ml-4 max-w-xs">patternflow.app/analysis</div>
            </div>

            {/* Mock analysis UI */}
            <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Chart placeholder */}
              <div className="lg:col-span-3 bg-gray-900 rounded-xl overflow-hidden min-h-[240px] flex items-center justify-center relative">
                <img src="/chart_demo.png" alt="Sample chart" className="w-full h-full object-cover opacity-90" />
              </div>

              {/* Insights panel */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Trend</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-black text-gray-900">Downtrend</p>
                    <TrendingDown size={28} className="text-red-500" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Volatility', value: 'High', color: 'text-orange-500', icon: <Activity size={14}/> },
                    { label: 'Volume', value: 'Medium', color: 'text-blue-500', icon: <BarChart2 size={14}/> },
                    { label: 'Sentiment', value: 'Bearish', color: 'text-red-500', icon: <TrendingDown size={14}/> },
                    { label: 'Strength', value: 'Strong', color: 'text-[#00d060]', icon: <Zap size={14}/> },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">{item.icon}<span className="text-xs font-semibold">{item.label}</span></div>
                      <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#16a34a] mb-2">AI Summary</p>
                  <p className="text-sm text-gray-700 leading-relaxed">Chart shows a clear downtrend with strong bearish momentum. Key support at <strong>$185</strong>. Watch for a reversal signal near resistance at <strong>$195</strong>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00d060] mb-3">How it works</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Get answers in 3 steps</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { num: '01', title: 'Upload your chart', desc: 'Take a photo or upload a screenshot of any chart from any platform — TradingView, your broker app, anywhere.', icon: <Target size={24} /> },
            { num: '02', title: 'AI reads it instantly', desc: 'Our AI identifies trends, patterns, support/resistance zones, volume, momentum, and more — all automatically.', icon: <Zap size={24} /> },
            { num: '03', title: 'Read plain-English insights', desc: 'No jargon. No black-box scores. Just a clear, structured breakdown you can actually understand and act on.', icon: <BookOpen size={24} /> },
          ].map((step, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-8 hover:border-[#00d060] hover:shadow-md transition-all duration-200 group">
              <div className="w-10 h-10 bg-gray-900 group-hover:bg-[#00d060] text-white group-hover:text-black rounded-xl flex items-center justify-center mb-6 transition-colors duration-200">
                {step.icon}
              </div>
              <p className="text-xs font-bold text-gray-400 mb-2">{step.num}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES DARK SECTION ────────────────────────── */}
      <section id="features" className="bg-gray-900 text-white py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#00d060] mb-3">Features</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-2xl">Everything you need to read any chart</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Trend Detection', desc: 'Identifies uptrends, downtrends, and sideways markets with confidence scoring.', icon: <TrendingUp size={20}/>, color: 'text-[#00d060]' },
              { title: 'Support & Resistance', desc: 'Pinpoints key price zones where the market is likely to react.', icon: <Target size={20}/>, color: 'text-blue-400' },
              { title: 'Pattern Recognition', desc: 'Detects head & shoulders, triangles, flags, and 20+ other chart patterns.', icon: <Activity size={20}/>, color: 'text-purple-400' },
              { title: 'Volume Analysis', desc: 'Reads buying and selling pressure from volume data visible in your chart.', icon: <BarChart2 size={20}/>, color: 'text-orange-400' },
              { title: 'AI Chat Q&A', desc: 'Ask any question about your chart in plain English and get an instant answer.', icon: <Zap size={20}/>, color: 'text-yellow-400' },
              { title: 'Beginner-Friendly Mode', desc: 'Every term is explained the first time it appears. No prior knowledge needed.', icon: <BookOpen size={20}/>, color: 'text-pink-400' },
            ].map((f, i) => (
              <div key={i} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-gray-500 transition-colors duration-200">
                <div className={`${f.color} mb-4`}>{f.icon}</div>
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT CHARTS SECTION ──────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#00d060] mb-3">Universal</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Works with any chart, from any platform</h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">Whether it's a screenshot from your broker app, a TradingView chart, or a photo you took with your phone — just upload it.</p>
            <ul className="space-y-3">
              {['Stocks & ETFs', 'Crypto (BTC, ETH, altcoins)', 'Forex pairs', 'Indices (S&P 500, NASDAQ)', 'Commodities (Gold, Oil)'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <CheckCircle2 size={16} className="text-[#00d060] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'TradingView', bg: 'bg-blue-50', text: 'text-blue-600' },
              { name: 'Zerodha', bg: 'bg-orange-50', text: 'text-orange-600' },
              { name: 'Binance', bg: 'bg-yellow-50', text: 'text-yellow-700' },
              { name: 'Robinhood', bg: 'bg-green-50', text: 'text-green-600' },
              { name: 'Upstox', bg: 'bg-purple-50', text: 'text-purple-600' },
              { name: 'Any App', bg: 'bg-gray-100', text: 'text-gray-600' },
              { name: 'Coinbase', bg: 'bg-blue-50', text: 'text-blue-700' },
              { name: 'Angel One', bg: 'bg-red-50', text: 'text-red-600' },
              { name: 'Screenshot', bg: 'bg-gray-100', text: 'text-gray-600' },
            ].map((p, i) => (
              <div key={i} className={`${p.bg} rounded-xl p-4 flex items-center justify-center text-center`}>
                <span className={`text-xs font-bold ${p.text}`}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ──────────────────────────────────────── */}
      <section id="pricing" className="bg-gray-50 border-y border-gray-200 py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#00d060] mb-3">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">Simple, honest pricing</h2>

            {/* Toggle */}
            <div className="inline-flex items-center bg-white border border-gray-200 rounded-xl p-1 gap-1">
              <button onClick={() => setBilling('monthly')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${billing === 'monthly' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>Monthly</button>
              <button onClick={() => setBilling('yearly')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${billing === 'yearly' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                Yearly
                <span className="bg-[#00d060] text-black text-xs font-bold px-1.5 py-0.5 rounded-md">-60%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Free</h3>
              <p className="text-gray-400 text-sm mb-6">Get started, no credit card required.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold text-gray-900">$0</span>
                <span className="text-gray-400 text-sm">/ month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {['3 chart analyses / day', 'Basic trend detection', 'Support & resistance zones', 'Mobile camera upload'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 size={15} className="text-[#00d060] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/onboarding" className="block text-center border border-gray-300 hover:border-gray-900 text-gray-900 font-semibold py-3 rounded-xl text-sm transition">
                Get started free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-gray-900 border border-gray-900 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#00d060] text-black text-xs font-bold px-2.5 py-1 rounded-full">Most popular</div>
              <h3 className="text-lg font-bold text-white mb-1">Pro</h3>
              <p className="text-gray-400 text-sm mb-6">For serious traders who want more.</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-extrabold text-white">{billing === 'monthly' ? '$29' : '$12'}</span>
                <span className="text-gray-400 text-sm">/ month</span>
              </div>
              {billing === 'yearly' && <p className="text-[#00d060] text-xs font-bold -mt-6 mb-6">Billed $144/year</p>}
              <ul className="space-y-3 mb-8">
                {['Unlimited chart analyses', 'All timeframes (1m to 1Y)', 'Advanced pattern recognition', 'AI chat Q&A', 'Priority support', 'All future updates'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 size={15} className="text-[#00d060] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/onboarding" className="block text-center bg-[#00d060] hover:bg-[#00e56a] text-black font-bold py-3 rounded-xl text-sm transition">
                {billing === 'monthly' ? 'Get Monthly' : 'Get Yearly — Best value'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section id="faq" className="max-w-3xl mx-auto px-5 sm:px-8 py-24">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#00d060] mb-3">FAQ</p>
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Common questions</h2>
        </div>
        <div>
          <FAQItem q="Is this financial advice?" a="No. Everything is educational analysis of what's visible in your chart — never a recommendation to buy, sell, or hold anything." />
          <FAQItem q="How accurate is it?" a="It depends on the chart. That's why we label every read as Clear, Likely, or Uncertain instead of pretending everything is certain. Even professional traders read charts differently." />
          <FAQItem q="What charts can I upload?" a="Any stock, crypto, or forex chart image — from your broker app, TradingView, a screenshot, or even a photo of a screen." />
          <FAQItem q="Do I need to know technical analysis already?" a="No — that's the point. Every term is explained when it comes up, and you can set your experience level to get more or less detail." />
          <FAQItem q="Can I use it on my phone?" a="Yes. The app is fully mobile-optimized and you can even take a photo of a chart on another screen directly from within the app." />
        </div>
      </section>

      {/* ── DARK CTA ─────────────────────────────────────── */}
      <section className="bg-gray-900 py-24 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ready to get started?
            <span className="text-gray-500"> Analyze your first chart free.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl">No credit card. No jargon. Just clear, instant chart analysis.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            {[
              { title: 'Upload a chart', sub: 'From any platform', icon: '📊', link: '/onboarding' },
              { title: 'Try for free', sub: 'No credit card needed', icon: '🚀', link: '/onboarding' },
              { title: 'View pricing', sub: 'Plans from $12/mo', icon: '💰', link: '#pricing' },
            ].map((card, i) => (
              <Link key={i} to={card.link} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-6 flex flex-col gap-3 group transition-colors duration-200">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{card.title}</p>
                  <p className="text-gray-400 text-xs">{card.sub}</p>
                </div>
                <ArrowRight size={16} className="text-gray-500 group-hover:text-white transition-colors mt-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-200 py-16 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 font-bold text-lg text-gray-900 mb-4">
                <LineChart size={20} className="text-[#00d060]" />
                PatternFlow
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">AI-powered chart analysis for traders of all levels.</p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Product</p>
              <ul className="space-y-2.5">
                {[['How it works', '#how-it-works'], ['Features', '#features'], ['Pricing', '#pricing'], ['FAQ', '#faq']].map(([label, href]) => (
                  <li key={label}><a href={href} className="text-sm text-gray-600 hover:text-gray-900 transition">{label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Company</p>
              <ul className="space-y-2.5">
                {[['About', '/about'], ['Contact', '/contact'], ['Terms', '/terms']].map(([label, href]) => (
                  <li key={label}><Link to={href} className="text-sm text-gray-600 hover:text-gray-900 transition">{label}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Get started</p>
              <ul className="space-y-2.5">
                <li><Link to="/onboarding" className="text-sm text-gray-600 hover:text-gray-900 transition">Sign up free</Link></li>
                <li><Link to="/billing" className="text-sm text-gray-600 hover:text-gray-900 transition">View plans</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} PatternFlow. All rights reserved.</p>
            <p className="text-xs text-gray-400">Educational tool only — not financial advice.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
