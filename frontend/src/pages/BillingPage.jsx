import React, { useState, useEffect } from 'react';
import { Check, Crown, Shield, Loader2, Sparkles, Zap, Users } from 'lucide-react';
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

  const handleSubscribe = async (planId) => {
    setLoadingPlan(planId);
    try {
      const token = await getToken();
      if (!token) {
        alert("Please sign in to subscribe.");
        setLoadingPlan(null);
        return;
      }

      const clientKey = import.meta.env.VITE_PAYMENT_CLIENT_KEY;

      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ planId, clientKey })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      console.error(err);
      alert(`Error contacting payment server: ${err.message}`);
    } finally {
      setLoadingPlan(null);
    }
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
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#00d060] opacity-[0.04] blur-[120px] rounded-full pointer-events-none"></div>
      
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
          <div className="text-center mb-16 mt-8 relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {getHeadline()}
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

          {/* Trust / Convincing text below pricing */}
          <div className="mt-16 text-center relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
            <div className="relative px-8 max-w-2xl mx-auto">
              <span className="absolute -top-6 left-0 text-7xl text-[#00d060]/15 font-serif leading-none select-none pointer-events-none">"</span>
              <p className="text-[#777777] text-lg leading-relaxed relative z-10">
                Stop leaving money on the table with missed patterns. Upgrade your toolkit today and trade with the absolute confidence of <span className="text-white font-bold">AI-driven precision</span>.
              </p>
              <span className="absolute -bottom-10 right-0 text-7xl text-[#00d060]/15 font-serif leading-none select-none pointer-events-none rotate-180">"</span>
            </div>
            
            <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-y-6 gap-x-2 sm:gap-10 text-[#a0a0a0] text-sm font-medium">
              <div className="flex items-center justify-center gap-2 group cursor-default">
                <div className="bg-[#00d060]/10 p-1.5 rounded-md group-hover:bg-[#00d060]/20 transition-colors">
                  <Shield size={18} className="text-[#00d060]" />
                </div>
                <span className="group-hover:text-white transition-colors">Bank-grade encryption</span>
              </div>
              
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#333333]"></div>
              
              <div className="flex items-center justify-center gap-2 group cursor-default">
                <div className="bg-[#00d060]/10 p-1.5 rounded-md group-hover:bg-[#00d060]/20 transition-colors">
                  <Zap size={18} className="text-[#00d060]" />
                </div>
                <span className="group-hover:text-white transition-colors">Instant account setup</span>
              </div>
              
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#333333]"></div>
              
              <div className="col-span-2 flex items-center justify-center gap-2 group cursor-default">
                <div className="bg-[#00d060]/10 p-1.5 rounded-md group-hover:bg-[#00d060]/20 transition-colors">
                  <Users size={18} className="text-[#00d060]" />
                </div>
                <span className="group-hover:text-white transition-colors">10,000+ active traders</span>
              </div>
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
