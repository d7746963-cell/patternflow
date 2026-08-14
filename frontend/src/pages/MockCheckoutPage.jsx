import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, Loader2 } from 'lucide-react';

export default function MockCheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plan = searchParams.get('plan') || 'monthly';
  const price = plan === 'yearly' ? '$144.00' : '$29.99';
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      // Redirect back to billing with success
      window.location.href = '/billing?success=true';
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] shadow-2xl">
        
        {/* Left Side: Order Summary */}
        <div className="bg-[#1e1e24] p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#222222] flex flex-col justify-between">
          <div>
            <button onClick={() => navigate('/billing')} className="text-[#888888] hover:text-white flex items-center gap-2 mb-8 transition-colors text-sm font-semibold">
              <ArrowLeft size={16} /> Back
            </button>
            <h2 className="text-2xl font-bold text-white mb-2">Subscribe to Pro</h2>
            <p className="text-[#888888] text-sm mb-8">SmartAnalyzer Pro {plan === 'yearly' ? 'Yearly' : 'Monthly'} Plan</p>
            
            <div className="flex items-center justify-between border-b border-[#3f3f46] pb-4 mb-4">
              <span className="text-gray-300 font-medium">Pro {plan === 'yearly' ? 'Yearly' : 'Monthly'}</span>
              <span className="text-white font-bold">{price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Total due today</span>
              <span className="text-2xl font-black text-white">{price}</span>
            </div>
          </div>
          
          <div className="mt-12 flex items-center gap-2 text-xs text-[#888888]">
            <Lock size={12} />
            <span>Powered by MockGateway</span>
          </div>
        </div>

        {/* Right Side: Payment Form */}
        <div className="p-8 md:p-12">
          <h3 className="text-xl font-bold text-white mb-6">Payment details</h3>
          
          <form onSubmit={handlePay} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Email address</label>
              <input type="email" required placeholder="you@example.com" className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d060] transition-colors" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Card information</label>
              <div className="relative">
                <input type="text" required placeholder="1234 5678 9101 1121" className="w-full bg-[#1a1a1a] border border-[#333333] rounded-t-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d060] transition-colors pl-10" />
                <CreditCard size={18} className="absolute left-3 top-3.5 text-gray-500" />
              </div>
              <div className="flex">
                <input type="text" required placeholder="MM / YY" className="w-1/2 bg-[#1a1a1a] border border-[#333333] border-t-0 rounded-bl-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d060] transition-colors" />
                <input type="text" required placeholder="CVC" className="w-1/2 bg-[#1a1a1a] border border-[#333333] border-t-0 border-l-0 rounded-br-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d060] transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-400 mb-2">Name on card</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-[#1a1a1a] border border-[#333333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00d060] transition-colors" />
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-[#00d060] hover:bg-[#00e56a] text-black font-bold py-3.5 px-4 rounded-lg shadow-lg shadow-[#00d060]/20 transition-all mt-6 flex justify-center items-center gap-2"
            >
              {isProcessing ? <Loader2 size={18} className="animate-spin" /> : `Pay ${price}`}
            </button>
            <p className="text-center text-xs text-gray-500 mt-4">
              This is a simulated payment gateway. No real charges will be made.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}
