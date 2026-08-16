import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignUp } from '@clerk/clerk-react';
import { ArrowRight, ArrowLeft, Activity, TrendingUp, TrendingDown, Target, Check, Sparkles, BookOpen, Clock, Crosshair, BarChart2, Coins, Globe, Users, Search, Smartphone, MoreHorizontal, Shield, UploadCloud, Sliders, Compass, Zap, Rocket, CheckCircle2, GraduationCap, BarChart3, Megaphone } from 'lucide-react';

function OnboardingContent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    experience: '',
    assets: [],
    goals: [],
    source: ''
  });
  const [step, setStep] = useState(1);

  React.useEffect(() => {
    if (localStorage.getItem('onboardingComplete') === 'true') {
      navigate('/upload', { replace: true });
    }
  }, [navigate]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field, value) => {
    setFormData(prev => {
      const array = prev[field];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Finished onboarding, save state and navigate
      localStorage.setItem('onboardingComplete', 'true');
      
      // Save preferences for AI context
      if (formData.experience) localStorage.setItem('experienceLevel', formData.experience);
      if (formData.assets.length > 0) localStorage.setItem('preferredAssets', JSON.stringify(formData.assets));
      if (formData.source) localStorage.setItem('acquisitionSource', formData.source);
      
      navigate('/upload');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-4">What's your experience level?</h2>
            <div className="grid grid-cols-1 gap-3 mb-4">
              {[
                { id: 'beginner', title: 'Beginner', desc: 'Just starting out' },
                { id: 'intermediate', title: 'Some experience', desc: 'Know the basics' },
                { id: 'advanced', title: 'Advanced', desc: 'Experienced trader' },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleChange('experience', type.id)}
                  className={`flex flex-col items-start p-4 border rounded-xl transition-all ${
                    formData.experience === type.id 
                      ? 'border-[#00d060] bg-[#00d060]/10 text-white' 
                      : 'border-[#222222] bg-[#111111] text-[#888888] hover:border-[#333333] hover:text-white'
                  }`}
                >
                  <span className="font-bold text-base mb-1">{type.title}</span>
                  <span className="text-xs opacity-80">{type.desc}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-bold text-white mb-2">What do you trade?</h3>
            <p className="text-[#888888] mb-8">Select all that apply.</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'stocks', title: 'Stocks', icon: TrendingUp },
                { id: 'crypto', title: 'Crypto', icon: Coins },
                { id: 'options', title: 'Options', icon: Activity },
                { id: 'forex', title: 'Forex', icon: Globe },
              ].map((type) => {
                const isSelected = formData.assets.includes(type.id);
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleArrayItem('assets', type.id)}
                    className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${
                      isSelected
                        ? 'border-[#00d060] bg-[#00d060]/10 text-white' 
                        : 'border-[#222222] bg-[#111111] text-[#888888] hover:border-[#333333] hover:text-white'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#00d060] text-black' : 'bg-[#222222] text-gray-400'}`}>
                      <type.icon size={16} />
                    </div>
                    <span className="font-bold">{type.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-8">Where did you hear about us?</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: 'twitter', title: 'Twitter / X', icon: Globe },
                { id: 'youtube', title: 'YouTube', icon: Activity },
                { id: 'tiktok', title: 'TikTok', icon: Smartphone },
                { id: 'search', title: 'Google Search', icon: Search },
                { id: 'friend', title: 'Friend / Colleague', icon: Users },
                { id: 'other', title: 'Other', icon: MoreHorizontal },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleChange('source', type.id)}
                  className={`flex items-center gap-3 p-4 border rounded-xl transition-all ${
                    formData.source === type.id
                      ? 'border-[#00d060] bg-[#00d060]/10 text-white' 
                      : 'border-[#222222] bg-[#111111] text-[#888888] hover:border-[#333333] hover:text-white'
                  }`}
                >
                  <span className="font-bold">{type.title}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center pt-4">
            <div className="inline-flex bg-[#00d060]/10 p-4 rounded-full mb-6 border border-[#00d060]/20 shadow-[0_0_30px_rgba(0,208,96,0.2)]">
              <Sparkles size={32} className="text-[#00d060]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Your experience is ready</h2>
            <p className="text-[#888888] mb-8 text-lg">Here's how to use PatternFlow:</p>
            
            <div className="space-y-3 text-left mb-8">
              <div className="bg-[#111111] border border-[#222222] p-4 rounded-2xl flex items-center gap-4 shadow-sm hover:border-[#333333] transition-colors">
                <div className="bg-[#00d060]/10 text-[#00d060] font-black w-10 h-10 rounded-full flex items-center justify-center shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">Upload a chart</h4>
                  <p className="text-[#888888] text-xs">Take a screenshot or paste a link from TradingView.</p>
                </div>
              </div>
              <div className="bg-[#111111] border border-[#222222] p-4 rounded-2xl flex items-center gap-4 shadow-sm hover:border-[#333333] transition-colors">
                <div className="bg-[#00d060]/10 text-[#00d060] font-black w-10 h-10 rounded-full flex items-center justify-center shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">Set your context</h4>
                  <p className="text-[#888888] text-xs">Tell us your trading style, asset type, and timeframe.</p>
                </div>
              </div>
              <div className="bg-[#111111] border border-[#222222] p-4 rounded-2xl flex items-center gap-4 shadow-sm hover:border-[#333333] transition-colors">
                <div className="bg-[#00d060]/10 text-[#00d060] font-black w-10 h-10 rounded-full flex items-center justify-center shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-white text-sm mb-0.5">Get instant analysis</h4>
                  <p className="text-[#888888] text-xs">Our AI breaks down trends, key levels, and patterns.</p>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-[#222222]/50 text-left">
              <p className="text-[#888888] text-xs font-bold uppercase tracking-wider mb-3">Customized for you</p>
              <div className="flex flex-wrap gap-2">
                {formData.experience === 'beginner' ? (
                  <span className="bg-[#1a1a1a] border border-[#333333] text-gray-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"><BookOpen size={12} className="text-[#00d060]"/> Jargon-Free Explanations</span>
                ) : (
                  <span className="bg-[#1a1a1a] border border-[#333333] text-gray-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"><BarChart2 size={12} className="text-[#00d060]"/> Advanced Analysis</span>
                )}
                {formData.assets.includes('crypto') && (
                  <span className="bg-[#1a1a1a] border border-[#333333] text-gray-300 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"><Coins size={12} className="text-[#00d060]"/> Crypto Defaults</span>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isStepValid = () => {
    if (step === 1) return formData.experience !== '';
    if (step === 2) return formData.assets.length > 0;
    if (step === 3) return formData.source !== '';
    if (step === 4) return true; // Payoff screen always valid
    return false;
  };

  return (
    <div className="min-h-[100dvh] bg-[#050505] flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d060] opacity-[0.04] blur-[150px] rounded-full pointer-events-none"></div>
      
      {step === 4 && (
        <div className="flex flex-col items-center justify-center mb-10 animate-in fade-in slide-in-from-top-4 duration-700 z-10">
           <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-8 flex items-center justify-center">
                <img src="/logo.png" alt="PatternFlow Logo" className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,208,96,0.4)]" />
             </div>
             <span className="font-extrabold text-2xl text-white tracking-tight">Pattern<span className="text-[#00d060]">Flow</span></span>
           </div>
           <div className="flex items-center gap-3 bg-[#111111]/80 backdrop-blur-md px-5 py-2 rounded-full border border-[#222222] shadow-lg">
             <div className="flex text-[#00d060] gap-0.5 text-sm">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
             </div>
             <div className="w-px h-3 bg-[#333333]"></div>
             <span className="text-[#a0a0a0] text-xs font-bold uppercase tracking-wider">Trusted by 10,000+</span>
           </div>
        </div>
      )}

      <div className={`w-full max-w-xl z-10 flex flex-col ${step === 4 ? 'bg-[#111111]/80 backdrop-blur-xl border border-[#222222] rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative' : ''}`}>
        
        {step === 4 && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00d060] to-[#00e56a] text-black text-[10px] font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(0,208,96,0.4)] whitespace-nowrap z-20">
            Setup Complete
          </div>
        )}

        {/* Navigation Top (Back + Progress) */}
        {step < 4 && (
          <div className="absolute top-14 left-6 right-6 sm:static sm:top-auto sm:left-auto sm:right-auto flex items-center justify-center sm:mb-6 sm:h-10 z-20">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="absolute left-0 text-[#888888] hover:text-white transition-colors flex items-center justify-center p-2 rounded-full hover:bg-[#222222]"
              >
                <ArrowLeft size={20} />
              </button>
            )}

            <div className="flex gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 w-6 sm:w-10 rounded-full transition-colors duration-500 ${i <= step ? 'bg-[#00d060] shadow-[0_0_10px_rgba(0,208,96,0.5)]' : 'bg-[#222222]'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Top Dynamic Icon (Steps 1-3) Restored for neon aesthetic */}
        {step < 4 && (
          <div className="w-full flex justify-center mb-10 mt-4 h-[120px]">
            <div className="relative flex items-center justify-center w-24 h-24 animate-in zoom-in duration-500">
              <div className="absolute inset-0 bg-[#00d060] opacity-20 blur-[40px] rounded-full animate-pulse pointer-events-none"></div>
              <div className="relative bg-[#111111] border border-[#222222] w-20 h-20 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(0,208,96,0.15)] overflow-hidden">
                <div className="absolute top-0 right-0 p-10 bg-[#00d060]/10 rounded-bl-full -z-10"></div>
                {step === 1 && <GraduationCap size={36} className="text-[#00d060]" />}
                {step === 2 && <BarChart3 size={36} className="text-[#00d060]" />}
                {step === 3 && <Megaphone size={36} className="text-[#00d060]" />}
              </div>
            </div>
          </div>
        )}

        <div className="w-full">
          {renderStep()}
        </div>

        {/* Bottom Navigation */}
        <div className={`flex items-center ${step === 4 ? 'justify-center mt-10' : 'justify-end mt-8 pt-6 border-t border-[#222222]/50'}`}>
          <button 
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`bg-[#00d060] text-black hover:bg-[#00e56a] disabled:opacity-50 disabled:cursor-not-allowed rounded-full font-bold transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,208,96,0.2)] hover:shadow-[0_0_30px_rgba(0,208,96,0.4)] ${step === 4 ? 'w-full py-4 text-lg' : 'px-6 sm:px-8 py-3 sm:py-3.5 text-base sm:text-lg'}`}
          >
            {step === 4 ? "Let's Go!" : 'Continue'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <>
      <SignedIn>
        <OnboardingContent />
      </SignedIn>
      <SignedOut>
        <RedirectToSignUp fallbackRedirectUrl="/onboarding" />
      </SignedOut>
    </>
  );
}
