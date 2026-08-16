import React, { useState, useEffect } from 'react';
import { Check, Crown, Shield, Loader2, Sparkles, Zap, Users, Plus, Minus } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';

export default function BillingPage() {
  const { getToken } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [personalization, setPersonalization] = useState({ experience: '', assets: [] });

  // Check subscription status on mount
  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const token = await getToken();
        if (!token) {
          setCheckingStatus(false);
          return;
        }
        const res = await fetch('/api/subscription/status', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setIsPro(data.isPro);
      } catch (err) {
        console.error('Error checking subscription:', err);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkSubscription();
    
    // Load personalization from onboarding
    try {
      const exp = localStorage.getItem('experienceLevel') || '';
      const assets = JSON.parse(localStorage.getItem('preferredAssets') || '[]');
      setPersonalization({ experience: exp, assets });
    } catch (e) {}
  }, [getToken]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      setSuccessMessage(true);
      setIsPro(true); // Optimistically set Pro after successful payment
      window.history.replaceState(null, '', '/billing');
      setTimeout(() => setSuccessMessage(false), 5000);
    }
  }, [searchParams]);

  const handleSubscribe = (planId) => {
    setLoadingPlan(planId);
    
    // Redirect to Kelviq Checkout
    const baseUrl = "https://www.kelviq.com/buy/e8575c85-44ac-40f3-ad3c-650161c98b66/?enabled=plans&plan_identifier=plans";
    const chargePeriod = planId === 'yearly' ? 'YEARLY' : 'MONTHLY';
    
    window.location.href = `${baseUrl}&charge_period=${chargePeriod}`;
  };

  if (checkingStatus) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-[#00d060]" />
      </div>
    );
  }
  
  // Personalize Headline based on onboarding data
  const getHeadline = () => {
    if (personalization.assets.length > 0) {
      const asset = personalization.assets[0].charAt(0).toUpperCase() + personalization.assets[0].slice(1);
      if (personalization.experience === 'advanced') return `The ultimate edge for ${asset} traders`;
      if (personalization.experience === 'beginner') return `Accelerate your ${asset} journey`;
      return `Supercharge your ${asset} trading`;
    }
    return "Simple, transparent pricing";
  };
  
  const getSubhead = () => {
    if (personalization.experience === 'advanced') {
      return "Unlock pro-level AI pattern recognition and advanced market analysis.";
    } else if (personalization.experience === 'beginner') {
      return "Learn faster and trade smarter with jargon-free AI market insights.";
    }
    return "Unlock the full power of AI-driven chart analysis.";
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 relative px-4">
      {/* Removed background glow as requested */}
      
      {successMessage && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full bg-[#00d060] text-black font-bold px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 mb-8 animate-bounce z-50">
          <Check size={18} /> Payment Successful! Welcome to Pro.
        </div>
      )}

      {/* If user is already Pro, show active plan */}
      {isPro ? (
        <div className="text-center mt-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#00d060]/10 border border-[#00d060]/30 text-[#00d060] px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles size={16} /> Active Pro Subscriber
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">You're on the Pro Plan!</h1>
          <p className="text-xl text-[#888888] mb-12">You have full access to all premium features.</p>
          
          <div className="bg-[#111111]/80 backdrop-blur-xl border border-[#00d060]/30 rounded-3xl p-8 max-w-lg mx-auto shadow-[0_0_50px_rgba(0,208,96,0.1)]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#00d060]/20 p-2 rounded-xl">
                <Crown size={24} className="text-[#00d060]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-white">Pro Plan</h3>
                <p className="text-sm text-[#888888]">All features unlocked</p>
              </div>
            </div>
            <div className="space-y-4">
              <FeatureItem text="Unlimited AI chart analyses" />
              <FeatureItem text="All timeframes including 1m, 5m, 15m" />
              <FeatureItem text="Advanced pattern recognition" />
              <FeatureItem text="Access to all future SaaS updates" />
            </div>
            <p className="text-xs text-[#555555] mt-6 text-center mb-6">
              Manage your subscription in your <a href="https://app.yourdomain.com" target="_blank" rel="noopener noreferrer" className="text-[#00d060] underline">PatternFlow dashboard</a>
            </p>
            <a href="/upload" className="block w-full text-center bg-[#00d060] text-black font-bold py-3 rounded-xl hover:bg-[#00e56a] transition-all shadow-[0_0_20px_rgba(0,208,96,0.3)]">
              Go to Dashboard &rarr;
            </a>
          </div>
        </div>
      ) : (
        <>
          <style>{`
             @keyframes float-slow {
               0%, 100% { transform: translateY(0) rotate(var(--rot)); }
               50% { transform: translateY(-20px) rotate(calc(var(--rot) + 5deg)); }
             }
             .float-obj { animation: float-slow 6s ease-in-out infinite; }
             .float-obj-2 { animation: float-slow 8s ease-in-out infinite 2s; }
             .float-obj-3 { animation: float-slow 7s ease-in-out infinite 1s; }
             .float-obj-4 { animation: float-slow 9s ease-in-out infinite 3s; }
          `}</style>
          

          {/* Decorative Floating Objects for empty space */}
          <div className="absolute top-10 left-4 md:left-32 w-16 h-16 bg-[#0f0f0f] border border-[#222] rounded-2xl shadow-2xl flex items-center justify-center float-obj pointer-events-none z-0 hidden sm:flex" style={{'--rot': '-12deg'}}>
             <Sparkles className="text-[#00d060]" size={28} />
          </div>
          <div className="absolute top-40 right-4 md:right-32 w-16 h-16 bg-[#00d060]/5 border border-[#00d060]/20 rounded-full shadow-[0_0_30px_rgba(0,208,96,0.1)] flex items-center justify-center float-obj-2 pointer-events-none z-0" style={{'--rot': '0deg'}}>
             <span className="text-[#00d060] font-black text-2xl">$</span>
          </div>
          <div className="absolute top-80 left-2 md:left-24 w-12 h-12 bg-[#0f0f0f] border border-[#222] rounded-xl shadow-xl flex items-center justify-center opacity-60 float-obj-3 pointer-events-none z-0" style={{'--rot': '15deg'}}>
            <Zap className="text-yellow-500" size={24} />
          </div>
          <div className="absolute top-16 right-1/4 w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl shadow-xl flex items-center justify-center opacity-70 float-obj-4 pointer-events-none z-0 hidden md:flex" style={{'--rot': '25deg'}}>
            <Crown className="text-purple-400" size={18} />
          </div>

          <div className="text-center mb-16 mt-16 relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {getHeadline()}
              <img src="/blue-key.png" alt="Peace" className="inline-block w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_20px_rgba(0,100,255,0.4)] ml-3 align-middle -mt-2" />
            </h1>
            <p className="text-xl text-[#888888] max-w-2xl mx-auto">
              {getSubhead()}
            </p>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
            {/* Monthly Plan */}
            <div className="bg-[#111111]/80 backdrop-blur-md border border-[#222222] hover:border-[#333333] transition-colors rounded-3xl p-8 shadow-sm flex flex-col relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
              <div className="mb-6 relative">
                <h3 className="text-xl font-bold text-white mb-2">Pro Monthly</h3>
                <p className="text-[#888888] text-sm">Flexible, month-to-month access.</p>
              </div>
              <div className="mb-6 relative">
                <span className="text-5xl font-black text-white">$29.99</span>
                <span className="text-[#888888] font-medium">/ month</span>
                <p className="text-xs text-transparent mt-1 select-none">Spacer</p>
              </div>
              <button 
                onClick={() => handleSubscribe('monthly')}
                disabled={loadingPlan === 'monthly'}
                className="w-full bg-[#1a1a1a] hover:bg-[#252525] text-white font-bold py-3.5 px-4 rounded-xl border border-[#333] transition-all mb-8 flex justify-center items-center gap-2 relative z-10"
              >
                {loadingPlan === 'monthly' ? <Loader2 size={18} className="animate-spin" /> : 'Get Monthly'}
              </button>
              <div className="space-y-4 flex-1 relative">
                <FeatureItem text="Unlimited AI chart analyses" />
                <FeatureItem text="All timeframes including 1m, 5m, 15m" />
                <FeatureItem text="Advanced pattern recognition" />
                <FeatureItem text="Access to all future SaaS updates" />
              </div>
            </div>

            {/* Yearly Plan */}
            <div className="bg-[#050f08]/90 backdrop-blur-xl border border-[#00d060]/40 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,208,96,0.1)] flex flex-col relative transform md:-translate-y-4 group">
              {/* Premium Background Glow inside card */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d060] opacity-10 blur-[80px] rounded-full"></div>
              </div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00d060] text-black text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full flex items-center gap-1 shadow-[0_0_20px_rgba(0,208,96,0.4)] z-20">
                <Crown size={14} /> Save 60%
              </div>
              
              <div className="mb-6 relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-[#00d060] mb-2 flex items-center gap-2">
                    Pro Yearly <Zap size={18} className="text-[#00d060] fill-[#00d060]" />
                  </h3>
                </div>
                <p className="text-[#888888] text-sm">Best value for serious traders.</p>
              </div>
              
              <div className="mb-6 relative z-10">
                <span className="text-5xl font-black text-white">$12.00</span>
                <span className="text-[#888888] font-medium">/ month</span>
                <p className="text-xs text-[#00d060] font-bold mt-1">Billed $144 yearly</p>
              </div>
              
              <button 
                onClick={() => handleSubscribe('yearly')}
                disabled={loadingPlan === 'yearly'}
                className="w-full bg-[#00d060] hover:bg-[#00e56a] text-black font-bold py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(0,208,96,0.2)] hover:shadow-[0_0_30px_rgba(0,208,96,0.4)] transition-all mb-8 flex justify-center items-center gap-2 relative z-10"
              >
                {loadingPlan === 'yearly' ? <Loader2 size={18} className="animate-spin text-black" /> : 'Get Yearly'}
              </button>
              
              <div className="space-y-4 flex-1 relative z-10">
                <FeatureItem text="Unlimited AI chart analyses" />
                <FeatureItem text="All timeframes including 1m, 5m, 15m" />
                <FeatureItem text="Advanced pattern recognition" />
                <FeatureItem text="Priority support & insights" premium={true} />
              </div>
            </div>
          </div>

          {/* GLOBAL MARKETS SECTION */}
          <div className="mt-32 max-w-4xl mx-auto text-center relative z-10 w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">Global markets in your hand</h2>
            <p className="text-[#a1a1aa] text-base sm:text-lg md:text-[19px] leading-relaxed mb-10 max-w-2xl mx-auto font-medium px-4">
              We reliably scan charts across hundreds of global exchanges, giving you instant AI analysis on crypto, forex, stocks, and commodities from all over the world.
            </p>
            <button className="bg-transparent border border-[#333] hover:border-[#666] text-gray-200 rounded-full px-6 py-3 text-sm font-bold transition-colors">
              Explore available markets
            </button>

            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] mx-auto mt-20 flex items-center justify-center">
                {/* Outer large glows */}
                <div className="absolute top-[10%] right-[10%] w-[60%] h-[60%] bg-[#00A3FF] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-[10%] left-[10%] w-[60%] h-[60%] bg-[#B100FF] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>
                
                {/* The Planet Body */}
                <div 
                  className="absolute inset-0 rounded-full bg-[#050505] overflow-hidden"
                  style={{
                    boxShadow: "inset -20px -20px 60px rgba(0,0,0,0.9), inset 20px 20px 60px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.05)"
                  }}
                >
                   {/* Dotted texture */}
                   <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen"></div>
                   
                   {/* Earth Map Overlay */}
                   <style>{`
                     @keyframes rotateGlobe {
                       from { background-position: 0px center; }
                       to { background-position: 1000px center; }
                     }
                     .animate-globe {
                       animation: rotateGlobe 40s linear infinite;
                     }
                     @keyframes float-1 {
                       0%, 100% { transform: translateY(0); }
                       50% { transform: translateY(-15px); }
                     }
                     @keyframes float-2 {
                       0%, 100% { transform: translateY(0); }
                       50% { transform: translateY(-10px); }
                     }
                     @keyframes float-3 {
                       0%, 100% { transform: translateY(0); }
                       50% { transform: translateY(-20px); }
                     }
                     .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
                     .animate-float-2 { animation: float-2 5s ease-in-out infinite 1s; }
                     .animate-float-3 { animation: float-3 7s ease-in-out infinite 2s; }
                   `}</style>
                   <div 
                     className="absolute inset-0 opacity-30 mix-blend-screen animate-globe"
                     style={{ 
                       backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')", 
                       backgroundSize: "auto 100%", 
                       backgroundPosition: "0px center", 
                       backgroundRepeat: "repeat-x",
                       filter: "invert(1) brightness(1.5)"
                     }}
                   ></div>
                   
                   {/* Inner glow arcs mimicking the rim light */}
                   <div className="absolute top-[-5%] right-[-5%] w-[110%] h-[110%] rounded-full border-[2px] border-transparent" style={{ borderTopColor: 'rgba(0,163,255,0.8)', borderRightColor: 'rgba(0,163,255,0.8)', filter: 'blur(3px)' }}></div>
                   <div className="absolute bottom-[-5%] left-[-5%] w-[110%] h-[110%] rounded-full border-[2px] border-transparent" style={{ borderBottomColor: 'rgba(177,0,255,0.8)', borderLeftColor: 'rgba(177,0,255,0.8)', filter: 'blur(3px)' }}></div>
                   
                   {/* 3D Sphere Shadow Overlay (fixes flatness of the map) */}
                   <div className="absolute inset-0 rounded-full shadow-[inset_-40px_-20px_80px_rgba(0,0,0,0.95)] pointer-events-none"></div>
                </div>
                
                {/* Floating Stock Widgets */}
                <div className="absolute top-[15%] -left-[5%] sm:-left-[20%] bg-[#0f0f0f] border border-[#222] rounded-xl px-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-20 animate-float-1 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00d060]/10 flex items-center justify-center text-[#00d060] font-bold text-sm">NV</div>
                  <div className="text-left">
                    <div className="text-white text-xs font-bold">NVDA</div>
                    <div className="text-[#00d060] text-[10px] font-medium">+3.42%</div>
                  </div>
                </div>

                <div className="absolute bottom-[25%] -right-[5%] sm:-right-[15%] bg-[#0f0f0f] border border-[#222] rounded-xl px-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-20 animate-float-2 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold text-sm">₿</div>
                  <div className="text-left">
                    <div className="text-white text-xs font-bold">BTC/USD</div>
                    <div className="text-[#00d060] text-[10px] font-medium">+1.80%</div>
                  </div>
                </div>

                <div className="absolute -top-[5%] right-[10%] sm:right-[5%] bg-[#0f0f0f] border border-[#222] rounded-xl px-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-20 animate-float-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-sm">AP</div>
                  <div className="text-left">
                    <div className="text-white text-xs font-bold">AAPL</div>
                    <div className="text-red-500 text-[10px] font-medium">-0.45%</div>
                  </div>
                </div>

                {/* Fade out bottom of the sphere */}
                <div className="absolute -bottom-[20%] left-[-10%] w-[120%] h-[50%] bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-10 pointer-events-none"></div>
            </div>
          </div>

          {/* On every street section */}
          <div className="mt-40 mb-20 relative z-10 w-full">
            <div className="max-w-3xl mx-auto text-center mb-12 px-4">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">On every street</h2>
              <p className="text-[#a1a1aa] text-lg md:text-[21px] leading-relaxed font-medium">
                Whether you're trading from a bustling city desk or your living room, PatternFlow's AI is working tirelessly. We process thousands of charts globally so you never miss a breakout.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto w-full h-[300px] sm:h-[450px] md:h-[550px] relative rounded-[32px] overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Premium image with slow zoom effect on hover */}
              <img 
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000" 
                alt="Wall Street Skyscrapers" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"></div>
              
              {/* Fake Pause Button (like the video player in the screenshot) */}
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 cursor-pointer hover:bg-black/80 transition-colors">
                 <div className="flex gap-1.5">
                   <div className="w-1.5 h-4 bg-white rounded-full"></div>
                   <div className="w-1.5 h-4 bg-white rounded-full"></div>
                 </div>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto mt-12 px-4 md:px-8 text-left">
              <h3 className="text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
                Institutional-grade AI
                <img src="/blue-key.png" alt="Peace" className="inline-block w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_15px_rgba(0,100,255,0.4)]" />
              </h3>
              <p className="text-[#a1a1aa] text-lg leading-relaxed font-medium max-w-3xl">
                Having an edge makes a world of difference to a trader. That's why we trained our AI on millions of professional setups, bringing institutional-level pattern recognition straight to your fingertips.
              </p>
            </div>
          </div>

          {/* Precision at scale section */}
          <div className="mt-32 mb-20 relative z-10 w-full">
            <div className="max-w-3xl mx-auto text-center mb-12 px-4">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">Precision at scale</h2>
              <p className="text-[#a1a1aa] text-lg md:text-[21px] leading-relaxed font-medium">
                We don't just rely on basic indicators. Our system continuously processes vast amounts of historical and real-time market data to identify the exact moments when a setup turns from a possibility into a high-probability trade.
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto w-full h-[300px] sm:h-[450px] md:h-[550px] relative rounded-[32px] overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              {/* Premium image with slow zoom effect on hover */}
              <img 
                src="/wall-street.jpg" 
                alt="Wall Street Sign and Flags" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none"></div>
              
              {/* Fake Pause Button */}
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/10 cursor-pointer hover:bg-black/80 transition-colors">
                 <div className="flex gap-1.5">
                   <div className="w-1.5 h-4 bg-white rounded-full"></div>
                   <div className="w-1.5 h-4 bg-white rounded-full"></div>
                 </div>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto mt-12 px-4 md:px-8 text-left">
              <h3 className="text-3xl font-extrabold text-white mb-4 flex items-center gap-3">
                Constantly learning
              </h3>
              <p className="text-[#a1a1aa] text-lg leading-relaxed font-medium max-w-3xl">
                Markets evolve every single day. That's why PatternFlow's neural networks are designed to adapt to shifting volatilities, ensuring your edge remains razor-sharp no matter the conditions.
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-32 max-w-3xl mx-auto relative z-10 w-full px-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-12 text-center">Frequently asked questions</h2>
            <div className="flex flex-col border-t border-[#333]">
              <FaqItem question="Is it safe to buy subscriptions on PatternFlow?" answer="Absolutely. We use Stripe, a world-class payment processor, to handle all transactions securely. We never store your credit card information directly." />
              <FaqItem question="How can I pay for a PatternFlow subscription?" answer="We accept all major credit and debit cards including Visa, Mastercard, American Express, and Discover." />
              <FaqItem question="Can I pay with crypto?" answer="Currently, we do not accept cryptocurrency payments, but we are actively looking into adding support for it in the future." />
              <FaqItem question="Can I cancel anytime?" answer="Yes, you can cancel your subscription at any time from your account settings. You'll continue to have full access to Pro features until the end of your current billing cycle." />
              <FaqItem question="How does upgrading or downgrading work?" answer="When upgrading, you will be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle." />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FeatureItem({ text, premium }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-0.5 p-0.5 rounded-full ${premium ? 'bg-[#00d060] text-black' : 'bg-[#00d060]/20 text-[#00d060]'}`}>
        <Check size={14} strokeWidth={3} />
      </div>
      <span className={premium ? "text-white font-medium" : "text-gray-300"}>{text}</span>
    </div>
  );
}

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#333]">
      <button 
        className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[21px] font-bold text-white tracking-tight">{question}</span>
        {isOpen ? <Minus size={24} className="text-white flex-shrink-0 ml-4" /> : <Plus size={24} className="text-white flex-shrink-0 ml-4" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-[#a1a1aa] text-[17px] leading-relaxed font-medium">{answer}</p>
      </div>
    </div>
  );
}
