import React, { useState } from 'react';
import { Search, BookOpen, MessageCircle, FileText, ChevronDown, Mail } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="max-w-5xl mx-auto pb-20">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-10 sm:p-16 mb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-[#111111]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 p-24 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">How can we help?</h1>
          <p className="text-purple-100 text-lg max-w-xl mx-auto">Get in touch with our support team or explore the FAQs below.</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BookOpen size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Getting Started</h3>
          <p className="text-sm text-[#888888]">Learn how to upload charts, read analysis, and use the dashboard.</p>
        </div>
        
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Billing & Accounts</h3>
          <p className="text-sm text-[#888888]">Manage your subscription, update payment methods, and invoices.</p>
        </div>

        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 hover:shadow-md transition-shadow cursor-pointer group">
          <div className="w-12 h-12 bg-[#00d060]/10 text-[#00d060] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <MessageCircle size={24} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Community & Feedback</h3>
          <p className="text-sm text-[#888888]">Join our Discord, request features, or report a bug.</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FAQItem 
            question="What types of charts can I upload?"
            answer="We currently support PNG, JPG, and WEBP image files up to 10MB. You can upload standard candlestick charts, line charts, or bar charts. The AI works best on clean charts without excessive overlapping indicators."
          />
          <FAQItem 
            question="Is my financial data secure?"
            answer="Yes. We do not store your uploaded charts on our servers after the analysis is complete unless you explicitly save them to your Favorites. We never share your trading data with third parties."
          />
          <FAQItem 
            question="How accurate is the AI Technical Analysis?"
            answer="The AI is highly trained on classical technical analysis patterns, support/resistance zones, and risk management principles. However, it is an assistant and should not be used as financial advice. Always do your own research before placing trades."
          />
          <FAQItem 
            question="Can I cancel my Pro subscription at any time?"
            answer="Absolutely. You can cancel your subscription from the Billing page at any time. You will retain access to Pro features until the end of your current billing cycle."
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-16 bg-[#0a0a0a] border border-[#222222] rounded-2xl p-6 text-center">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Financial Disclaimer</h4>
        <p className="text-xs text-[#888888] max-w-4xl mx-auto leading-relaxed">
          Chart Analyzer provides AI-generated, educational descriptions of chart patterns based on user-uploaded images. Nothing on this site constitutes financial, investment, trading, or legal advice. We are not a registered investment advisor, broker-dealer, or financial planner. All trading and investment decisions carry risk of loss, and you are solely responsible for any decisions you make. Consult a licensed financial professional before making investment decisions.
        </p>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden transition-all duration-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-[#111111] hover:bg-[#0a0a0a] transition-colors"
      >
        <span className="font-bold text-white">{question}</span>
        <ChevronDown size={20} className={`text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-50 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}
