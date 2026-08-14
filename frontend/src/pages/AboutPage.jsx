import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#888888] hover:text-[#00d060] transition mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p>PatternFlow was built to bridge the gap between complex financial charts and everyday people. Technical analysis shouldn't be a black box reserved for Wall Street professionals. We aim to demystify price action, trends, and indicators using advanced AI to provide clear, jargon-free explanations.</p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How It Works</h2>
            <p>We leverage cutting-edge computer vision and large language models to "read" charts just like a human analyst would. The AI identifies support and resistance levels, trend direction, volume anomalies, and chart patterns, translating them into simple, actionable educational insights.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
