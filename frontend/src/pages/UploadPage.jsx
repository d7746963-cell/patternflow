import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, X, MoreHorizontal, Sun, ChevronDown, Activity, Shield, Crosshair, Triangle, FileText, TrendingUp, TrendingDown, Minus, Sparkles, Camera, LineChart, ImagePlus } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';

const CustomSelect = ({ value, onChange, options, icon, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#111111] border ${isOpen ? 'border-[#00d060] ring-1 ring-[#00d060]' : 'border-[#222222]'} rounded-xl py-3 px-4 pl-10 text-white font-medium cursor-pointer shadow-sm flex items-center justify-between transition-all select-none`}
      >
        <span className="truncate">{selectedOption?.label}</span>
      </div>
      
      {/* Left Icon */}
      <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors`}>
        {icon}
      </div>
      
      {/* Right Chevron */}
      <div className={`absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none transition-transform ${isOpen ? 'rotate-180 text-[#00d060]' : ''}`}>
        <ChevronDown size={18} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#111111] border border-[#222222] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#333333 transparent' }}>
            {options.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange({ target: { value: opt.value } });
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer text-sm font-medium transition-colors ${
                  value === opt.value 
                    ? 'bg-[#00d060]/10 text-[#00d060] border-l-2 border-[#00d060]' 
                    : 'text-gray-300 hover:bg-[#222222] hover:text-white border-l-2 border-transparent'
                }`}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function UploadPage() {
  const { getToken } = useAuth();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [assetType, setAssetType] = useState('stock');
  const [timeframe, setTimeframe] = useState('daily');
  const [ticker, setTicker] = useState('');
  const [tradingStyle, setTradingStyle] = useState('swing');
  const [explanationLevel, setExplanationLevel] = useState('beginner');
  const [analysisLength, setAnalysisLength] = useState('detail');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkInput, setLinkInput] = useState('');
  const [isFetchingLink, setIsFetchingLink] = useState(false);
  const [isPro, setIsPro] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const checkPro = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/subscription/status`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setIsPro(data.isPro);
      } catch (err) {
        setIsPro(false);
      }
    };
    checkPro();
  }, [getToken]);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const navigate = useNavigate();

  const handleAnalyzeRef = useRef(null);

  // Global paste handler
  useEffect(() => {
    const handlePaste = (e) => {
      // Don't intercept if they are typing in an input field (like the TradingView link input)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const newFile = new File([blob], "pasted_chart.png", { type: blob.type });
            setFile(newFile);
            const newPreview = URL.createObjectURL(blob);
            setPreview(newPreview);
            if (handleAnalyzeRef.current) {
               handleAnalyzeRef.current(newFile, newPreview);
            }
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  // Handle fetching a TradingView link
  const handleTradingViewLink = async () => {
    if (!linkInput) return;
    setIsFetchingLink(true);
    
    try {
      // We proxy it through our backend to avoid CORS issues
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/fetch-image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: linkInput })
      });
      
      if (!res.ok) throw new Error('Failed to fetch image');
      
      const blob = await res.blob();
      const newFile = new File([blob], "tradingview_chart.png", { type: blob.type });
      setFile(newFile);
      setPreview(URL.createObjectURL(blob));
      setShowLinkModal(false);
      setLinkInput('');
      handleAnalyze(newFile);
    } catch (err) {
      alert("Could not load image from link. Make sure it is a direct image URL.");
      console.error(err);
    } finally {
      setIsFetchingLink(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selected = e.dataTransfer.files[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async (fileToAnalyze = file, previewUrl = preview) => {
    if (!fileToAnalyze) return;
    
    // Check Pro status
    if (isPro === false) {
      setShowUpgradeModal(true);
      return;
    }

    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append('image', fileToAnalyze);
    formData.append('asset_type', assetType);
    formData.append('timeframe', timeframe);
    formData.append('ticker', ticker);
    formData.append('trading_style', tradingStyle);
    formData.append('explanation_level', explanationLevel);
    formData.append('analysis_length', analysisLength);

    try {
      const token = await getToken();
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      const data = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error || 'The AI failed to analyze this chart properly. Please try again.');
      }
      
      navigate('/analysis', { state: { result: data, image: previewUrl, analysisLength: analysisLength } });
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  handleAnalyzeRef.current = handleAnalyze;

  return (
    <div className="w-full flex flex-col">
      
      {/* Full-screen Loading Overlay */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300">
           <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              {/* Fake stock chart animation */}
              <svg className="w-16 h-16 text-[#00d060] animate-pulse relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 17 9 11 13 15 21 7"></polyline>
                <polyline points="14 7 21 7 21 14"></polyline>
              </svg>
              {/* Spinning rings */}
              <svg className="absolute inset-0 w-full h-full text-[#00d060]/20 animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '2s' }}>
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="60 200" strokeLinecap="round" />
              </svg>
              <svg className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] text-[#00d060]/40 animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}>
                 <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="100 100" strokeLinecap="round" />
              </svg>
           </div>
           <h2 className="text-2xl font-bold text-white mb-3">Analyzing Chart...</h2>
           <p className="text-[#888888] text-sm">Our AI is breaking down the trends and key levels.</p>
        </div>
      )}
      
      {/* Top Header Row (Matches screenshot exactly) */}
      <div className="order-1 flex flex-col md:flex-row md:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-[32px] font-bold text-white tracking-tight mb-2 heading-font">
            <span className="text-[#00d060]">AI-Powered</span> Chart Analysis
          </h1>
          <p className="text-[#888888] font-medium">Upload a chart or paste a link and get instant AI-powered insights</p>
        </div>
        
      </div>

      {/* Action Buttons Row */}
      <div className={`order-3 lg:order-2 ${file ? 'hidden lg:flex' : 'flex'} flex-col sm:flex-row gap-4 mb-8`}>
        <button 
          onClick={() => cameraInputRef.current?.click()}
          className="flex-1 bg-[#00d060] hover:bg-[#00e56a] text-black p-4 rounded-xl shadow-[0_4px_20px_-4px_rgba(147,51,234,0.3)] transition-all flex items-center gap-4 border border-[#00d060]/50"
        >
          <div className="p-2 border border-white/20 rounded-lg">
             <ImagePlus size={24} />
          </div>
          <div className="text-left">
            <div className="font-bold">Upload from Gallery</div>
            <div className="text-xs text-[#00d060]/50">Select photo from device</div>
          </div>
        </button>
        
        {/* Hidden Camera Input */}
        <input 
          type="file" 
          ref={cameraInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        
        <button 
          onClick={() => setShowLinkModal(true)}
          className="flex-1 bg-[#111111] hover:bg-[#1a1a1a] text-white p-4 rounded-xl shadow-sm border border-[#222222] transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 flex items-center justify-center">
             <svg viewBox="0 0 28 21" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-white"><path d="M21 21v-7l7-7-7-7v7L14 14l7 7zM14 14v7l-7-7L0 7v7l7 7 7-7z"></path></svg>
          </div>
          <div className="text-left">
            <div className="font-bold">Paste TradingView Link</div>
            <div className="text-xs text-[#888888]">Get chart from TradingView</div>
          </div>
        </button>

        <div className="flex-1 relative">
          <button 
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className="w-full h-full bg-[#111111] hover:bg-[#1a1a1a] text-white p-4 rounded-xl shadow-sm border border-[#222222] transition-all flex items-center gap-4"
          >
            <div className="p-2 border border-[#222222] rounded-lg text-[#888888]">
               <MoreHorizontal size={24} />
            </div>
            <div className="text-left flex-1">
              <div className="font-bold">More Options</div>
              <div className="text-xs text-[#888888]">Paste link or take photo</div>
            </div>
            <ChevronDown size={20} className="text-[#888888]" />
          </button>
          
          {showMoreMenu && (
            <div className="absolute top-full left-0 mt-2 w-full bg-[#111111] rounded-xl shadow-lg border border-[#222222] py-2 z-10">
              <button 
                className="w-full text-left px-4 py-2 hover:bg-[#1a1a1a] text-sm font-medium text-gray-300"
                onClick={() => {
                  setShowMoreMenu(false);
                  fileInputRef.current?.click();
                }}
              >
                Upload from Device
              </button>
              <button 
                className="w-full text-left px-4 py-2 hover:bg-[#1a1a1a] text-sm font-medium text-gray-300"
                onClick={() => {
                  setShowMoreMenu(false);
                  alert("Press Ctrl+V or Cmd+V anywhere on this page to paste an image from your clipboard!");
                }}
              >
                Paste from Clipboard (Ctrl+V)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2-Column Grid for Upload and Settings */}
      <div className="order-2 lg:order-3 grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Left Column: Upload */}
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-white mb-6">1. Upload Chart Image</h2>
          
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[220px] sm:min-h-[280px] relative ${
              file ? 'border-[#00d060]/30 bg-[#00d060]/10/30' : 'border-[#00d060]/30 bg-[#00d060]/10/50 cursor-pointer hover:bg-[#00d060]/10'
            }`}
          >
            {!file ? (
              <>
                <div className="text-[#00d060] mb-4">
                  <Camera size={48} strokeWidth={1.5} />
                </div>
                <p className="text-lg font-bold text-white mb-2">Take a photo of your chart</p>
                <p className="text-[#00d060] font-medium mb-4">or click to browse files</p>
                <p className="text-xs text-[#888888] font-medium tracking-wide">Supports: PNG, JPG, WEBP (up to 10MB)</p>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                 <img src={preview} alt="Preview" className="max-h-48 object-contain rounded-lg mb-6 shadow-sm" />
                 
                 {/* File Preview Row matching screenshot */}
                 <div className="w-full bg-[#111111] border border-[#222222] rounded-lg p-3 flex items-center justify-between shadow-sm">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-[#222222] rounded flex items-center justify-center overflow-hidden">
                       <img src={preview} alt="thumb" className="w-full h-full object-cover opacity-80" />
                     </div>
                     <div className="text-left">
                       <div className="text-sm font-bold text-white truncate max-w-[150px]">{file.name}</div>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="text-xs font-semibold text-[#888888]">{(file.size / (1024*1024)).toFixed(1)} MB</span>
                     <button onClick={clearFile} className="text-[#888888] hover:text-gray-300 bg-[#1a1a1a] hover:bg-[#222222] p-1.5 rounded-md transition-colors">
                       <X size={16} />
                     </button>
                   </div>
                 </div>
              </div>
            )}
          </div>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" capture="environment" onChange={handleFileChange} />
        </div>

        {/* Right Column: Settings */}
        <div className={`bg-[#111111] border border-[#222222] rounded-2xl p-6 md:p-8 shadow-sm flex-col ${!file ? 'hidden lg:flex' : 'flex'}`}>
          <h2 className="text-lg font-bold text-white mb-6">2. Analysis Settings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-auto">
            {/* Asset Type */}
            <div>
              <label className="block text-xs font-bold text-[#888888] mb-2">Asset Type</label>
              <CustomSelect
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                options={[
                  { value: 'stock', label: 'Stock' },
                  { value: 'crypto', label: 'Crypto' },
                  { value: 'forex', label: 'Forex' }
                ]}
                icon={<Activity size={18} className="text-red-500" />}
              />
            </div>

            {/* Timeframe */}
            <div>
              <label className="block text-xs font-bold text-[#888888] mb-2">Timeframe</label>
              <CustomSelect
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                options={[
                  { value: '1min', label: '1 Minute (1m)' },
                  { value: '5min', label: '5 Minutes (5m)' },
                  { value: '15min', label: '15 Minutes (15m)' },
                  { value: 'hourly', label: '1 Hour (1H)' },
                  { value: '4hour', label: '4 Hours (4H)' },
                  { value: 'daily', label: 'Daily (1D)' },
                  { value: 'weekly', label: 'Weekly (1W)' },
                  { value: 'monthly', label: 'Monthly (1M)' },
                  { value: 'yearly', label: 'Yearly (1Y)' },
                  { value: 'all', label: 'All Time (All)' }
                ]}
                icon={<FileText size={18} className="text-[#00d060]" />}
              />
            </div>

            {/* Ticker */}
            <div>
              <label className="block text-xs font-bold text-[#888888] mb-2">Ticker (Optional)</label>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="e.g. TSLA"
                  value={ticker}
                  onChange={(e) => setTicker(e.target.value)}
                  className="w-full bg-[#111111] border border-[#222222] rounded-xl py-3 px-4 pl-10 text-white font-medium focus:outline-none focus:border-[#00d060] focus:ring-1 focus:ring-[#00d060] uppercase placeholder:normal-case shadow-sm"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 pointer-events-none">
                  <Shield size={18} />
                </div>
              </div>
            </div>

            {/* Trading Style */}
            <div>
              <label className="block text-xs font-bold text-[#888888] mb-2">Trading Style</label>
              <CustomSelect
                value={tradingStyle}
                onChange={(e) => setTradingStyle(e.target.value)}
                options={[
                  { value: 'day', label: 'Day Trader (Intraday)' },
                  { value: 'swing', label: 'Swing Trader (Days-Weeks)' },
                  { value: 'long_term', label: 'Long-term (Months-Years)' }
                ]}
                icon={<Crosshair size={18} className="text-emerald-600" />}
              />
            </div>

            {/* Explanation Level */}
            <div className="sm:col-span-2 lg:col-span-2">
              <label className="block text-xs font-bold text-[#888888] mb-2">Explanation Level</label>
              <CustomSelect
                value={explanationLevel}
                onChange={(e) => setExplanationLevel(e.target.value)}
                options={[
                  { value: 'beginner', label: 'Layman / Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'expert', label: 'Expert / Professional' }
                ]}
                icon={<Sparkles size={18} className="text-purple-500" />}
              />
            </div>
          
              {/* Analysis Length */}
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-bold text-[#888888] mb-2">Analysis Length</label>
                <CustomSelect
                  value={typeof analysisLength !== 'undefined' ? analysisLength : 'detail'}
                  onChange={(e) => setAnalysisLength(e.target.value)}
                  options={[
                    { value: 'detail', label: 'Detailed Analysis' },
                    { value: 'short', label: 'Short / Summary' }
                  ]}
                  icon={<svg className="text-[#00d060]" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>}
                />
              </div>
            </div>

            {/* Analyze Button */}
          <div className="mt-8">
            <button 
              onClick={() => handleAnalyze()}
              disabled={!file || isAnalyzing}
              className="w-full bg-[#00d060] hover:bg-[#00e56a] disabled:opacity-50 text-black font-bold py-4 rounded-full shadow-[0_0_20px_rgba(0,208,96,0.3)] transition-all flex items-center justify-center gap-2 mb-3"
            >
              {isAnalyzing ? (
                <><span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span> Processing...</>
              ) : (
                <><Sparkles size={20} /> Analyze Chart</>
              )}
            </button>
            <p className="text-center text-xs text-[#888888] font-medium">Our AI will analyze your chart and generate insights</p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={`order-4 grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10 ${!file ? 'hidden lg:grid' : 'grid'}`}>
        
        {/* Features Row */}
        <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 shadow-sm">
           <h3 className="font-bold text-white mb-6">What you'll get</h3>
           <div className="grid grid-cols-2 sm:flex sm:justify-between text-center gap-4 sm:gap-2">
             <div className="flex flex-col items-center flex-1">
               <div className="w-12 h-12 rounded-full bg-[#00d060]/10 flex items-center justify-center text-[#00d060] mb-3 border border-[#00d060]/20">
                 <TrendingUp size={22} />
               </div>
               <span className="text-[11px] font-bold text-white leading-tight mb-1">Trend Analysis</span>
               <span className="text-[10px] text-[#888888] leading-tight">Identify market<br/>direction</span>
             </div>
             
             <div className="flex flex-col items-center flex-1">
               <div className="w-12 h-12 rounded-full bg-[#00d060]/10 flex items-center justify-center text-[#00d060] mb-3 border border-[#00d060]/20">
                 <Shield size={22} />
               </div>
               <span className="text-[11px] font-bold text-white leading-tight mb-1">Support & Resistance</span>
               <span className="text-[10px] text-[#888888] leading-tight">Key levels &<br/>breakouts</span>
             </div>

             <div className="flex flex-col items-center flex-1">
               <div className="w-12 h-12 rounded-full bg-[#00d060]/10 flex items-center justify-center text-[#00d060] mb-3 border border-[#00d060]/20">
                 <Crosshair size={22} />
               </div>
               <span className="text-[11px] font-bold text-white leading-tight mb-1">Entry Zones</span>
               <span className="text-[10px] text-[#888888] leading-tight">High probability<br/>entry points</span>
             </div>

             <div className="flex flex-col items-center flex-1">
               <div className="w-12 h-12 rounded-full bg-[#00d060]/10 flex items-center justify-center text-[#00d060] mb-3 border border-[#00d060]/20">
                 <Triangle size={22} className="rotate-180" />
               </div>
               <span className="text-[11px] font-bold text-white leading-tight mb-1">Risk / Reward</span>
               <span className="text-[10px] text-[#888888] leading-tight">Optimal risk to<br/>reward ratio</span>
             </div>

             <div className="flex flex-col items-center flex-1">
               <div className="w-12 h-12 rounded-full bg-[#00d060]/10 flex items-center justify-center text-[#00d060] mb-3 border border-[#00d060]/20">
                 <FileText size={22} />
               </div>
               <span className="text-[11px] font-bold text-white leading-tight mb-1">AI Summary</span>
               <span className="text-[10px] text-[#888888] leading-tight">Clear summary &<br/>actionable insights</span>
             </div>
           </div>
        </div>


      </div>

      {/* Upgrade to Pro Modal */}
      {showUpgradeModal && createPortal(
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111111] border border-[#00d060]/30 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-[0_0_50px_rgba(0,208,96,0.15)] relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-[#888888] hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="w-12 h-12 bg-[#00d060]/10 rounded-full flex items-center justify-center mb-6">
               <Sparkles size={24} className="text-[#00d060]" />
            </div>
            
            <h2 className="text-2xl font-extrabold text-white mb-2">Upgrade to Pro</h2>
            <p className="text-[#888888] text-sm mb-6 leading-relaxed">
              You need a Pro subscription to generate AI chart analyses. Upgrade now to unlock advanced pattern recognition and unlimited insights.
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 bg-[#1a1a1a] border border-[#333333] text-gray-300 font-bold py-3 px-4 rounded-xl hover:bg-[#222222] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => navigate('/billing')}
                className="flex-1 bg-[#00d060] hover:bg-[#00e56a] text-black font-bold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(0,208,96,0.3)] transition-colors flex items-center justify-center gap-2"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Custom TradingView Link Modal */}
      {showLinkModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#111111] rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => { setShowLinkModal(false); setLinkInput(''); }}
              className="absolute top-4 right-4 text-[#888888] hover:text-gray-300 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-2 text-white">
              <div className="w-10 h-10 flex items-center justify-center bg-[#222222] rounded-lg">
                <svg viewBox="0 0 28 21" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-gray-900"><path d="M21 21v-7l7-7-7-7v7L14 14l7 7zM14 14v7l-7-7L0 7v7l7 7 7-7z"></path></svg>
              </div>
              <h2 className="text-xl font-bold">Paste Chart Link</h2>
            </div>
            
            <p className="text-sm text-[#888888] mb-6">Enter a direct image link from TradingView (e.g., https://s3.tradingview.com/...)</p>
            
            <input 
              type="url"
              placeholder="https://..."
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-[#222222] rounded-xl py-3 px-4 text-white font-medium focus:outline-none focus:border-[#00d060] focus:ring-1 focus:ring-[#00d060] mb-6"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleTradingViewLink()}
            />
            
            <div className="flex gap-3">
              <button 
                onClick={() => { setShowLinkModal(false); setLinkInput(''); }}
                className="flex-1 bg-[#111111] border border-[#222222] text-gray-300 font-bold py-3 px-4 rounded-xl hover:bg-[#1a1a1a] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleTradingViewLink}
                disabled={!linkInput || isFetchingLink}
                className="flex-1 bg-[#00d060] hover:bg-[#00e56a] disabled:opacity-50 text-black font-bold py-3 px-4 rounded-xl shadow-md shadow-[#00d060]/20 transition-colors flex items-center justify-center gap-2"
              >
                {isFetchingLink ? (
                  <><span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full"></span> Loading...</>
                ) : (
                  'Import Chart'
                )}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
