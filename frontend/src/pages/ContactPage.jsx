import React from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#888888] hover:text-[#00d060] transition mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>Have questions, feedback, or need support? We're here to help.</p>
          
          <div className="bg-[#111111] border border-[#222222] p-6 rounded-xl mt-8">
            <h2 className="text-xl font-bold text-white mb-6">Get in touch</h2>
            <div className="space-y-4">
              <a href="mailto:firststep686@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-[#00d060] transition">
                <Mail size={20} /> firststep686@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
