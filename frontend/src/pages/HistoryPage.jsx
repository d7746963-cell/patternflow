import React from 'react';
import { Clock, Search, Filter } from 'lucide-react';

export default function HistoryPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 heading-font">Analysis History</h1>
          <p className="text-[#888888]">View and manage your past chart analyses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search ticker or asset..." 
              className="bg-[#111111] border border-[#222222] rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 w-full sm:w-64 transition-all shadow-sm"
            />
          </div>
          <button className="bg-[#111111] border border-[#222222] hover:bg-[#0a0a0a] p-2.5 rounded-lg text-gray-400 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-[#111111] rounded-xl border border-[#222222] p-12 flex flex-col items-center justify-center text-center shadow-sm">
        <div className="w-16 h-16 bg-[#0a0a0a] border border-[#222222] rounded-2xl flex items-center justify-center text-gray-400 mb-4 transform -rotate-12">
          <Clock size={32} />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">No history yet</h2>
        <p className="text-[#888888] max-w-sm mb-6">Your analyzed charts will appear here. You haven't processed any charts in this session yet.</p>
        <button className="bg-[#00d060]/10 text-[#00d060] font-medium px-6 py-2 rounded-lg border border-[#00d060]/30 hover:bg-[#00d060]/20 transition-colors">
          Analyze your first chart
        </button>
      </div>
    </div>
  );
}
