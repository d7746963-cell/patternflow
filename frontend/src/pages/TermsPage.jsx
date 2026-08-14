import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#888888] hover:text-[#00d060] transition mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Educational Purpose Only</h2>
            <p>PatternFlow is an educational tool designed to help users understand technical analysis concepts. The insights and analysis provided by PatternFlow DO NOT constitute financial advice, investment advice, trading advice, or any other sort of advice.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. No Liability</h2>
            <p>You agree that PatternFlow and its creators are not liable for any financial losses or damages incurred as a result of using this service. Always do your own research or consult a professional financial advisor before making investment decisions.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Privacy and Data</h2>
            <p>We do not store the chart images you upload. They are processed securely for analysis and immediately discarded. Your email and account data are managed securely via our authentication provider.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Subscriptions</h2>
            <p>Pro subscriptions provide access to advanced features. Subscriptions auto-renew unless cancelled. You may cancel your subscription at any time through the billing dashboard.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
