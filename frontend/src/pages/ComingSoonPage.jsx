import React from 'react';

export default function ComingSoonPage({ title, description, Icon }) {
  return (
    <div className="max-w-5xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-gradient-to-br from-purple-50 to-indigo-50 text-[#00d060] rounded-[2rem] flex items-center justify-center mb-8 shadow-sm border border-[#00d060]/20/50">
        {Icon && <Icon size={48} strokeWidth={1.5} />}
      </div>
      <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">{title}</h1>
      <p className="text-lg text-[#888888] max-w-lg mb-8 leading-relaxed">
        {description}
      </p>
      <div className="bg-[#111111] border border-[#222222] rounded-xl px-6 py-4 shadow-sm inline-flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-[#00d060]/100 animate-pulse"></div>
        <span className="font-medium text-gray-300">Currently in active development</span>
      </div>
    </div>
  );
}
