import React from 'react';
import { useLocation, Link, Navigate, useParams, useOutletContext } from 'react-router-dom';
import { ArrowLeft, Share, BookmarkPlus, Activity, TrendingUp, TrendingDown, Crosshair, BarChart3, Eye, Info, Building2, AlertTriangle, AlertCircle, FileText, CheckCircle2, ThumbsUp, ThumbsDown, Target, Clock, ShieldAlert, Plus, Mic, Send, Zap, X, Sparkles, Triangle , Maximize, Minimize } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function AnalysisPage() {
  const { id } = useParams();
  const { getToken } = useAuth();
  const location = useLocation();
  
  // Try to load from state first, then fallback to session storage
  const rawResult = location.state?.result || JSON.parse(sessionStorage.getItem('lastAnalysisResult') || 'null');
  const image = location.state?.image || sessionStorage.getItem('lastAnalysisImage');
  const initialAnalysisLength = location.state?.analysisLength || sessionStorage.getItem('lastAnalysisLength') || 'detail';

  // Save to session storage whenever we receive new state from navigation
  React.useEffect(() => {
    if (location.state?.result) {
      sessionStorage.setItem('lastAnalysisResult', JSON.stringify(location.state.result));
    }
    if (location.state?.image) {
      sessionStorage.setItem('lastAnalysisImage', location.state.image);
    }
    if (location.state?.analysisLength) {
      sessionStorage.setItem('lastAnalysisLength', location.state.analysisLength);
    }
  }, [location.state]);

  const context = useOutletContext();
  const [localIsFullSize, setLocalIsFullSize] = React.useState(false);
  
  // Use context if available (when rendered within DashboardLayout), else fallback to local state
  const isFullSize = context?.isFullSize ?? localIsFullSize;
  const setIsFullSize = context?.setIsFullSize ?? setLocalIsFullSize;

  const aiData = rawResult?.aiAnalysis || rawResult || {};
  const companyInfo = rawResult?.companyInfo || null;

  // Chat State
  const [chatInput, setChatInput] = React.useState('');
  const [chatHistory, setChatHistory] = React.useState([]);
  const [isTyping, setIsTyping] = React.useState(false);
  const [explanationLevel, setExplanationLevel] = React.useState('Layman');
  const [news, setNews] = React.useState(null);
  const [isLoadingNews, setIsLoadingNews] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('technical');

  React.useEffect(() => {
    const fetchNews = async () => {
      let ticker = companyInfo?.symbol || null;
      if (!ticker && aiData?.labeled_header_data?.ticker && aiData.labeled_header_data.ticker !== 'null') {
        ticker = aiData.labeled_header_data.ticker;
      }
      const assetType = rawResult?.assetType || 'stock';
      
      setIsLoadingNews(true);
      try {
        const token = await getToken();
        const res = await fetch('/api/news', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ ticker: ticker, asset_type: assetType })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.news) {
            setNews(data.news);
          }
        }
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setIsLoadingNews(false);
      }
    };
    fetchNews();
  }, [companyInfo, aiData, getToken]);

  if (!rawResult || !image) {
    return <Navigate to="/upload" replace />;
  }

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const newHistory = [...chatHistory, { role: 'user', content: chatInput }];
    setChatHistory(newHistory);
    setChatInput('');
    setIsTyping(true);

    try {
      // Convert blob URL to base64 for the backend
      let base64Image = null;
      if (image && image.startsWith('blob:')) {
        try {
          const response = await fetch(image);
          const blob = await response.blob();
          
          // Compress the image before sending to make chat instant
          base64Image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800;
              const MAX_HEIGHT = 800;
              let width = img.width;
              let height = img.height;
              
              if (width > height) {
                if (width > MAX_WIDTH) {
                  height *= MAX_WIDTH / width;
                  width = MAX_WIDTH;
                }
              } else {
                if (height > MAX_HEIGHT) {
                  width *= MAX_HEIGHT / height;
                  height = MAX_HEIGHT;
                }
              }
              
              canvas.width = width;
              canvas.height = height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);
              // Use JPEG with 0.5 quality for massive size reduction
              resolve(canvas.toDataURL('image/jpeg', 0.5));
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(blob);
          });
        } catch (imgError) {
          console.warn('Image blob expired or failed to load. Proceeding without image context.', imgError);
        }
      }

      const token = await getToken();

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: chatInput,
          history: chatHistory,
          explanationLevel: explanationLevel,
          image: base64Image ? { data: base64Image } : null
        })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error: ${res.status} ${res.statusText} - ${errorText}`);
      }
      const data = await res.json();

      setChatHistory([
        ...newHistory, 
        { role: 'ai', content: data.reply }
      ]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setChatHistory([
        ...newHistory, 
        { role: 'ai', content: `Error: ${error.message}` }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'PatternFlow Insights',
      text: `Just analyzed ${companyInfo ? companyInfo.symbol : 'a chart'} using PatternFlow AI! \n\nTrend: ${aiData.trend?.direction || aiData.trend_analysis?.direction || 'Neutral'}\n\nCheck it out at:`,
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        alert('Analysis summary copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const renderSection = (title, icon, content) => (
    <section className="bg-[#111111] border border-[#222222] rounded-xl p-4 sm:p-8 shadow-sm hover:shadow-md transition-shadow h-fit break-inside-avoid mb-6 sm:mb-8 w-full inline-block">
      <div className="flex items-center gap-3 mb-4 sm:mb-6 border-b border-[#222222] pb-3 sm:pb-4">
        <div className="text-[#00d060]">{icon}</div>
        <h2 className="text-xl font-bold text-white heading-font">{title}</h2>
      </div>
      {content}
    </section>
  );

  const formatLargeNumber = (num) => {
    if (!num) return '-';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + ' T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + ' B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + ' M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + ' K';
    return num.toString();
  };

  const formatPercent = (num) => {
    if (!num) return '-';
    return (num * 100).toFixed(2) + '%';
  };

  const getConfidenceBadge = (confidence) => {
    const conf = confidence?.toLowerCase() || '';
    
    const dots = (level) => {
      return (
        <div className="flex gap-0.5 ml-1.5 opacity-80">
          <div className={`w-1.5 h-1.5 rounded-full ${level >= 1 ? 'bg-current' : 'border border-current opacity-40'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full ${level >= 2 ? 'bg-current' : 'border border-current opacity-40'}`}></div>
          <div className={`w-1.5 h-1.5 rounded-full ${level >= 3 ? 'bg-current' : 'border border-current opacity-40'}`}></div>
        </div>
      );
    };

    if (conf.includes('clear') || conf.includes('🟢')) return <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded border border-green-200 flex items-center gap-1"><CheckCircle2 size={12}/> Clear {dots(3)}</span>;
    if (conf.includes('likely') || conf.includes('🟡')) return <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded border border-yellow-200 flex items-center gap-1"><AlertCircle size={12}/> Likely {dots(2)}</span>;
    if (conf.includes('uncertain') || conf.includes('🟠')) return <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded border border-orange-200 flex items-center gap-1"><AlertTriangle size={12}/> Uncertain {dots(1)}</span>;
    return <span className="bg-[#1a1a1a] text-gray-300 text-xs font-bold px-2 py-1 rounded border border-[#222222]">{confidence}</span>;
  };

  const getPricePercentage = (targetPrice) => {
    if (!targetPrice) return null;
    let max = null;
    let min = null;
    const headerHigh = parseFloat(aiData?.labeled_header_data?.high?.replace(/[^0-9.-]+/g,""));
    const headerLow = parseFloat(aiData?.labeled_header_data?.low?.replace(/[^0-9.-]+/g,""));
    
    const allPrices = [];
    if (!isNaN(headerHigh)) allPrices.push(headerHigh);
    if (!isNaN(headerLow)) allPrices.push(headerLow);
    
    const extractPrices = (zones) => {
      zones?.forEach(z => {
        const h = parseFloat(z.price_high?.replace(/[^0-9.-]+/g,""));
        const l = parseFloat(z.price_low?.replace(/[^0-9.-]+/g,""));
        if (!isNaN(h)) allPrices.push(h);
        if (!isNaN(l)) allPrices.push(l);
      });
    };
    
    extractPrices(aiData?.chart_annotations?.support_zones);
    extractPrices(aiData?.chart_annotations?.resistance_zones);

    if (allPrices.length === 0) return null;
    
    max = Math.max(...allPrices);
    min = Math.min(...allPrices);
    
    const range = max - min;
    max = max + (range * 0.05);
    min = min - (range * 0.05);
    const newRange = max - min;
    
    if (newRange === 0) return 50;
    
    const parsedTarget = parseFloat(targetPrice.toString().replace(/[^0-9.-]+/g,""));
    if (isNaN(parsedTarget)) return null;
    
    const percentage = 100 - (((parsedTarget - min) / newRange) * 100);
    return Math.max(0, Math.min(100, percentage));
  };


  
  const renderChart = () => (
    <>
      {/* Chart Image & Overlay */}
        <div className={`bg-[#111111] border border-[#222222] rounded-xl ${isFullSize ? 'p-0 overflow-hidden w-full' : 'p-2 sm:p-4'} shadow-sm flex flex-col justify-center relative animate-fadeSlideIn`} style={{ animationDelay: '0.1s' }}>
           <div className="relative flex justify-center items-center w-full">
             <img src={image} alt="Uploaded chart" className={`w-full object-contain ${isFullSize ? 'rounded-xl h-auto' : 'max-h-[500px] rounded-lg'} relative z-10`} />
             
             {/* Annotations Overlay SVG */}
             {(aiData?.chart_annotations?.support_zones?.length > 0 || aiData?.chart_annotations?.resistance_zones?.length > 0) && (
               <svg className="absolute inset-0 w-full h-full z-20 pointer-events-none" style={{ preserveAspectRatio: 'none' }}>
                  
                  {/* Support Zones */}
                  {aiData.chart_annotations.support_zones?.map((zone, i) => {
                    const topY = getPricePercentage(zone.price_high);
                    const bottomY = getPricePercentage(zone.price_low);
                    if (topY === null || bottomY === null) return null;
                    return (
                      <g key={`supp-${i}`}>
                        <rect x="0" y={`${topY}%`} width="100%" height={`${Math.max(1, bottomY - topY)}%`} fill="rgba(0,208,96,0.15)" />
                        <line x1="0" y1={`${topY}%`} x2="100%" y2={`${topY}%`} stroke="#00d060" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                        <text x="98%" y={`calc(${topY}% - 6px)`} fill="#00d060" fontSize="10" fontWeight="bold" textAnchor="end" className="drop-shadow-md">Support</text>
                      </g>
                    );
                  })}

                  {/* Resistance Zones */}
                  {aiData.chart_annotations.resistance_zones?.map((zone, i) => {
                    const topY = getPricePercentage(zone.price_high);
                    const bottomY = getPricePercentage(zone.price_low);
                    if (topY === null || bottomY === null) return null;
                    return (
                      <g key={`res-${i}`}>
                        <rect x="0" y={`${topY}%`} width="100%" height={`${Math.max(1, bottomY - topY)}%`} fill="rgba(239,68,68,0.15)" />
                        <line x1="0" y1={`${bottomY}%`} x2="100%" y2={`${bottomY}%`} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                        <text x="98%" y={`calc(${bottomY}% + 12px)`} fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="end" className="drop-shadow-md">Resistance</text>
                      </g>
                    );
                  })}
                  
                  {/* Current Price Dot */}
                  {getPricePercentage(companyInfo?.price || aiData?.labeled_header_data?.close) !== null && (
                    <g>
                      <circle cx="98%" cy={`${getPricePercentage(companyInfo?.price || aiData?.labeled_header_data?.close)}%`} r="4" fill="#00d060" className="animate-pulse" />
                      <circle cx="98%" cy={`${getPricePercentage(companyInfo?.price || aiData?.labeled_header_data?.close)}%`} r="4" fill="transparent" stroke="#00d060" strokeWidth="2" className="animate-ping opacity-50" />
                    </g>
                  )}
               </svg>
             )}
           </div>
        </div>

    </>
  );

  const renderInsights = () => (
    <>
      {/* Insights Section */}
          <div className={`flex flex-col gap-4 animate-fadeSlideIn w-full ${isFullSize ? 'max-w-2xl mx-auto mt-2' : ''}`} style={{ animationDelay: '0.15s' }}>
            {!isFullSize && (
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={18} className="text-blue-400" />
                <h2 className="text-lg font-bold text-white heading-font">Insights</h2>
              </div>
            )}

            {/* Big Trend Card */}
            {aiData?.trend?.direction && (
              <div className="bg-[#242938] border border-[#2d3446] rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                <span className="text-gray-300 text-sm font-medium block mb-2">Trend</span>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-white text-3xl font-black capitalize tracking-tight truncate">{aiData.trend.direction}</span>
                  <div className="flex-shrink-0">
                    {aiData.trend.direction.toLowerCase() === 'downtrend' || aiData.trend.direction.toLowerCase() === 'down' ? (
                      <TrendingDown size={42} strokeWidth={2.5} className="text-[#ef4444] opacity-90" />
                    ) : (
                      <TrendingUp size={42} strokeWidth={2.5} className="text-[#00d060] opacity-90" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Smaller Cards Grid */}
            <div className="grid grid-cols-2 gap-3">
              {aiData?.insights?.volatility && (
                <div className="bg-[#242938] border border-[#2d3446] rounded-xl p-3.5 shadow-sm flex flex-col justify-between min-h-[96px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Activity size={14} className="text-blue-400" />
                    <span className="text-gray-300 text-xs font-medium truncate">Volatility</span>
                  </div>
                  <span className={`font-bold text-base capitalize ${aiData.insights.volatility.toLowerCase() === 'high' ? 'text-red-500' : aiData.insights.volatility.toLowerCase() === 'low' ? 'text-[#00d060]' : 'text-orange-400'}`}>{aiData.insights.volatility}</span>
                </div>
              )}
              
              {aiData?.insights?.volume && (
                <div className="bg-[#242938] border border-[#2d3446] rounded-xl p-3.5 shadow-sm flex flex-col justify-between min-h-[96px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BarChart3 size={14} className="text-orange-400" />
                    <span className="text-gray-300 text-xs font-medium truncate">Volume</span>
                  </div>
                  <span className={`font-bold text-base capitalize ${aiData.insights.volume.toLowerCase() === 'high' ? 'text-white' : 'text-orange-400'}`}>{aiData.insights.volume}</span>
                </div>
              )}

              {aiData?.insights?.sentiment && (
                <div className="bg-[#242938] border border-[#2d3446] rounded-xl p-3.5 shadow-sm flex flex-col justify-between min-h-[96px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    {aiData.insights.sentiment.toLowerCase() === 'bullish' || aiData.insights.sentiment.toLowerCase() === 'greed' ? <ThumbsUp size={14} className="text-[#00d060]" /> : <ThumbsDown size={14} className="text-red-500" />}
                    <span className="text-gray-300 text-xs font-medium truncate">Sentiment</span>
                  </div>
                  <span className={`font-bold text-base capitalize ${aiData.insights.sentiment.toLowerCase() === 'bullish' || aiData.insights.sentiment.toLowerCase() === 'greed' ? 'text-[#00d060]' : 'text-red-500'}`}>{aiData.insights.sentiment}</span>
                </div>
              )}

              {aiData?.trend?.strength && (
                <div className="bg-[#242938] border border-[#2d3446] rounded-xl p-3.5 shadow-sm flex flex-col justify-between min-h-[96px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Activity size={14} className="text-[#00d060]" />
                    <span className="text-gray-300 text-xs font-medium">Strength</span>
                  </div>
                  <span className="text-white font-bold text-base capitalize">{aiData.trend.strength}</span>
                </div>
              )}

              {aiData?.net_price_change?.percent_change !== undefined && (
                <div className="bg-[#242938] border border-[#2d3446] rounded-xl p-3.5 shadow-sm flex flex-col justify-between min-h-[96px]">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Triangle size={14} className={aiData.net_price_change.percent_change >= 0 ? "text-[#00d060]" : "text-red-500 rotate-180"} />
                    <span className="text-gray-300 text-xs font-medium">Net Change</span>
                  </div>
                  <span className={`font-bold text-base ${aiData.net_price_change.percent_change >= 0 ? 'text-[#00d060]' : 'text-red-500'}`}>{aiData.net_price_change.percent_change > 0 ? '+' : ''}{aiData.net_price_change.percent_change}%</span>
                </div>
              )}
            </div>
          </div>
    </>
  );

  const renderKeyStats = () => (
    <>
      {/* Key Stats Sidebar */}
          {companyInfo && (
          <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 shadow-sm flex flex-col flex-1 animate-fadeSlideIn" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-lg font-bold text-white mb-4 heading-font border-b border-[#222222] pb-2">Key Stats</h2>
            <div className="space-y-4 flex-1">
              <div className={`flex ${isFullSize ? 'flex-col items-start border-r border-[#222222] pr-4' : 'justify-between items-center border-b border-[#222222] pb-3'}`}>
                <span className={`text-[#888888] font-medium ${isFullSize ? 'text-xs uppercase tracking-wider mb-1' : 'text-sm'}`}>Market Cap</span>
                <span className={`font-bold text-white ${isFullSize ? 'text-lg' : 'text-base'}`}>{formatLargeNumber(companyInfo.marketCap)} <span className="text-xs text-[#888888] font-normal">{companyInfo.currency}</span></span>
              </div>
              <div className={`flex ${isFullSize ? 'flex-col items-start border-r border-[#222222] pr-4' : 'justify-between items-center border-b border-[#222222] pb-3'}`}>
                <span className={`text-[#888888] font-medium ${isFullSize ? 'text-xs uppercase tracking-wider mb-1' : 'text-sm'}`}>Revenue (TTM)</span>
                <span className={`font-bold text-white ${isFullSize ? 'text-lg' : 'text-base'}`}>{formatLargeNumber(companyInfo.revenue)} <span className="text-xs text-[#888888] font-normal">{companyInfo.currency}</span></span>
              </div>
              <div className={`flex ${isFullSize ? 'flex-col items-start border-r border-[#222222] pr-4' : 'justify-between items-center border-b border-[#222222] pb-3'}`}>
                <span className={`text-[#888888] font-medium ${isFullSize ? 'text-xs uppercase tracking-wider mb-1' : 'text-sm'}`}>Net Income</span>
                <span className={`font-bold text-white ${isFullSize ? 'text-lg' : 'text-base'}`}>{formatLargeNumber(companyInfo.netIncome)} <span className="text-xs text-[#888888] font-normal">{companyInfo.currency}</span></span>
              </div>
              <div className={`flex ${isFullSize ? 'flex-col items-start border-r border-[#222222] pr-4' : 'justify-between items-center border-b border-[#222222] pb-3'}`}>
                <span className={`text-[#888888] font-medium ${isFullSize ? 'text-xs uppercase tracking-wider mb-1' : 'text-sm'}`}>P/E Ratio (TTM)</span>
                <span className={`font-bold text-white ${isFullSize ? 'text-lg' : 'text-base'}`}>{companyInfo.peRatio?.toFixed(2) || '-'}</span>
              </div>
              <div className={`flex ${isFullSize ? 'flex-col items-start border-r border-[#222222] pr-4' : 'justify-between items-center border-b border-[#222222] pb-3'}`}>
                <span className={`text-[#888888] font-medium ${isFullSize ? 'text-xs uppercase tracking-wider mb-1' : 'text-sm'}`}>Basic EPS (TTM)</span>
                <span className={`font-bold text-white ${isFullSize ? 'text-lg' : 'text-base'}`}>{companyInfo.eps?.toFixed(2) || '-'} <span className="text-xs text-[#888888] font-normal">{companyInfo.currency}</span></span>
              </div>
              <div className={`flex ${isFullSize ? 'flex-col items-start' : 'justify-between items-center pb-1'}`}>
                <span className={`text-[#888888] font-medium ${isFullSize ? 'text-xs uppercase tracking-wider mb-1' : 'text-sm'}`}>Op. Margin</span>
                <span className={`font-bold text-white ${isFullSize ? 'text-lg' : 'text-base'}`}>{formatPercent(companyInfo.operatingMargins)}</span>
              </div>
            </div>
          </div>
          )}
    </>
  );

  const renderTabs = () => (
    <>
      {/* Tabs */}
      <div className="flex bg-[#111111] border border-[#222222] rounded-xl p-1.5 w-[240px] shadow-sm">
        <button 
          onClick={() => setActiveTab('technical')}
          className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'technical' ? 'bg-[#00d060] text-black shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a]'}`}
        >
          Technical
        </button>
        <button 
          onClick={() => setActiveTab('news')}
          className={`flex-1 py-3 px-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'news' ? 'bg-[#00d060] text-black shadow-md' : 'text-gray-400 hover:text-gray-200 hover:bg-[#1a1a1a]'}`}
        >
          News
        </button>
      </div>
    </>
  );

  const renderContent = () => (
    <>
      {activeTab === 'technical' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* About Company */}
      {companyInfo && companyInfo.about && (
        <section className="bg-[#111111] border border-[#222222] rounded-xl p-6 sm:p-8 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-white mb-4 heading-font flex items-center gap-2"><Building2 className="text-[#00d060]" size={20}/> About {companyInfo.name}</h2>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-4">{companyInfo.about}</p>
          <div className="flex gap-6 mt-4 pt-4 border-t border-[#222222]">
            <div>
              <span className="text-xs text-[#888888] uppercase tracking-wider font-bold block mb-1">Sector</span>
              <span className="text-sm font-semibold text-gray-200">{companyInfo.sector || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-[#888888] uppercase tracking-wider font-bold block mb-1">Industry</span>
              <span className="text-sm font-semibold text-gray-200">{companyInfo.industry || '-'}</span>
            </div>
            <div>
              <span className="text-xs text-[#888888] uppercase tracking-wider font-bold block mb-1">Employees</span>
              <span className="text-sm font-semibold text-gray-200">{companyInfo.employees?.toLocaleString() || '-'}</span>
            </div>
          </div>
        </section>
      )}



      {/* AI TECHNICAL ANALYSIS SECTION */}
      <div className={`mb-6 ${isFullSize ? 'mt-0' : 'mt-12'}`}>
         <h2 className="text-2xl font-black text-white heading-font tracking-tight mb-2 border-l-4 border-[#00d060] pl-4">Educational AI Analysis</h2>
         <p className="text-[#888888] ml-5 text-sm">Automated breakdown of visible chart structure.</p>
      </div>

      {/* 1. Labeled Header Data */}
      {aiData.labeled_header_data && aiData.labeled_header_data.source === 'labeled' && (
        <div className="bg-[#111111] border border-[#00d060]/30 rounded-xl p-6 sm:p-8 shadow-sm mb-8 animate-fadeSlideIn" style={{ animationDelay: '0.25s' }}>
          <div className="flex items-center gap-2 mb-4">
            <Target size={20} className="text-[#00d060]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Labeled Chart Data</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {aiData.labeled_header_data.ticker && aiData.labeled_header_data.ticker !== 'null' && (
              <div><span className="block text-xs font-bold text-[#00d060] uppercase">Ticker</span><span className="text-white font-semibold">{aiData.labeled_header_data.ticker}</span></div>
            )}
            {aiData.labeled_header_data.timeframe && aiData.labeled_header_data.timeframe !== 'null' && (
              <div><span className="block text-xs font-bold text-[#00d060] uppercase">Timeframe</span><span className="text-white font-semibold">{aiData.labeled_header_data.timeframe}</span></div>
            )}
            {aiData.labeled_header_data.open && aiData.labeled_header_data.open !== 'null' && (
              <div><span className="block text-xs font-bold text-[#00d060] uppercase">Open</span><span className="text-white font-semibold">{aiData.labeled_header_data.open}</span></div>
            )}
            {aiData.labeled_header_data.high && aiData.labeled_header_data.high !== 'null' && (
              <div><span className="block text-xs font-bold text-[#00d060] uppercase">High</span><span className="text-white font-semibold">{aiData.labeled_header_data.high}</span></div>
            )}
            {aiData.labeled_header_data.low && aiData.labeled_header_data.low !== 'null' && (
              <div><span className="block text-xs font-bold text-[#00d060] uppercase">Low</span><span className="text-white font-semibold">{aiData.labeled_header_data.low}</span></div>
            )}
            {aiData.labeled_header_data.close && aiData.labeled_header_data.close !== 'null' && (
              <div><span className="block text-xs font-bold text-[#00d060] uppercase">Close</span><span className="text-white font-semibold">{aiData.labeled_header_data.close}</span></div>
            )}
            {aiData.labeled_header_data.change_percent && aiData.labeled_header_data.change_percent !== 'null' && (
              <div><span className="block text-xs font-bold text-[#00d060] uppercase">% Change</span><span className={`font-semibold ${aiData.labeled_header_data.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>{aiData.labeled_header_data.change_percent > 0 ? '+' : ''}{aiData.labeled_header_data.change_percent}%</span></div>
            )}
          </div>
        </div>
      )}

      {/* TOP-DOWN STRUCTURAL REASONING */}
      <div className={`columns-1 ${isFullSize ? '' : 'lg:columns-2'} gap-8 mb-8 stagger-children`}>
        
        {/* 2. Net Price Change */}
        {aiData.net_price_change && renderSection("Net Price Change", <BarChart3 size={24} />, 
          <div className="space-y-4">
            <div className="flex justify-between items-start mb-2">
               <div className="flex gap-3">
                 <span className={`text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider border ${aiData.net_price_change.percent_change >= 0 ? 'bg-[#00d060]/10 text-[#00d060] border-[#00d060]/20' : 'bg-red-100 text-red-700 border-red-200'}`}>
                   {aiData.net_price_change.percent_change > 0 ? '+' : ''}{aiData.net_price_change.percent_change}% NET
                 </span>
                 {aiData.net_price_change.tier === 2 && getConfidenceBadge(aiData.net_price_change.confidence)}
               </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-[#0a0a0a] p-3 rounded-lg border border-[#222222]">
               <span className="font-semibold">Range:</span>
               <span>{aiData.net_price_change.first_visible_close_estimate}</span>
               <ArrowLeft size={14} className="rotate-180 text-gray-400" />
               <span>{aiData.net_price_change.last_visible_close}</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{aiData.net_price_change.interpretation}</p>
          </div>
        )}

        {/* 3. Trend & Structure */}
        {aiData.trend && renderSection("Trend & Structure", <TrendingUp size={24} />, 
          <div className="space-y-3">
            <div className="flex flex-wrap gap-3 mb-2">
              <span className="bg-[#00d060]/20 text-[#00d060] text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider border border-[#00d060]/30">
                {aiData.trend.direction}
              </span>
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider border border-blue-200">
                {aiData.trend.strength}
              </span>
              {aiData.trend.scope && (
                <span className="bg-[#1a1a1a] text-gray-300 text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider border border-[#222222]">
                  {aiData.trend.scope}
                </span>
              )}
            </div>
            {aiData.trend.explanation && (
              <p className="text-gray-300 text-sm leading-relaxed">{aiData.trend.explanation}</p>
            )}
          </div>
        )}

        {/* Phase Breakdown */}
        {aiData.phase_breakdown && aiData.phase_breakdown.length > 0 && renderSection("Phase Breakdown", <Activity size={24} />, 
          <div className="space-y-4">
            {aiData.phase_breakdown.map((phase, i) => (
              <div key={i} className="bg-[#0a0a0a] rounded-xl p-4 border border-[#222222]">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white text-sm">{phase.phase_number}. {phase.label}</h4>
                  <div className="flex gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${phase.direction === 'up' ? 'bg-green-100 text-green-700' : phase.direction === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-300'}`}>
                      {phase.direction}
                    </span>
                    {phase.tier === 2 && getConfidenceBadge(phase.confidence)}
                  </div>
                </div>
                <div className="text-xs text-[#888888] mb-2">{phase.approx_position}</div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                   <span className="font-semibold">{phase.start_price_estimate}</span>
                   <ArrowLeft size={14} className="rotate-180 text-gray-400" />
                   <span className="font-semibold">{phase.end_price_estimate}</span>
                   <span className={`ml-2 font-bold ${phase.percent_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                     {phase.percent_change > 0 ? '+' : ''}{phase.percent_change}%
                   </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Swing Points */}
        {aiData.swing_points && aiData.swing_points.length > 0 && renderSection("Swing Points", <Target size={24} />, 
          <div className="space-y-4">
            {aiData.swing_points.map((point, i) => (
              <div key={i} className="bg-[#111111] rounded-xl p-4 border border-[#222222] shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-2 items-center">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${point.type === 'high' ? 'bg-[#00d060]/20 text-[#00d060]' : 'bg-blue-500/10 text-blue-400'}`}>
                      Swing {point.type}
                    </span>
                    <span className="font-bold text-white">{point.price_estimate}</span>
                  </div>
                  {point.tier === 2 && getConfidenceBadge(point.confidence)}
                </div>
                <div className="text-xs text-[#888888] mb-3">{point.location_description}</div>
                
                {point.comparison_to_prior_same_type_point && point.comparison_to_prior_same_type_point !== 'null' && (
                  <div className="bg-[#0a0a0a] p-3 rounded text-sm text-gray-300 border border-[#222222]">
                    <span className="font-bold text-gray-200 block mb-1">Comparison:</span>
                    {point.comparison_to_prior_same_type_point}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Key Price Levels */}
        {aiData.key_levels && aiData.key_levels.length > 0 && renderSection("Key Price Levels", <Crosshair size={24} />, 
          <div className="space-y-6">
            {aiData.key_levels.map((level, idx) => (
              <div key={idx} className="bg-[#0a0a0a] rounded-xl p-5 border border-[#222222]">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase border ${level.type?.toLowerCase() === 'support' ? 'bg-[#00d060]/10 text-[#00d060] border-[#00d060]/20' : level.type?.toLowerCase() === 'resistance' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-[#1a1a1a] text-gray-400 border-[#222222]'}`}>
                      {level.type}
                    </span>
                    <div className="flex gap-1 opacity-80 mt-0.5" title={`Tier ${level.tier || 1} Strength`}>
                      <div className={`w-1.5 h-3 rounded-sm ${level.tier >= 1 ? (level.type?.toLowerCase() === 'support' ? 'bg-[#00d060]' : 'bg-red-500') : 'bg-gray-800'}`}></div>
                      <div className={`w-1.5 h-3 rounded-sm ${level.tier >= 2 ? (level.type?.toLowerCase() === 'support' ? 'bg-[#00d060]' : 'bg-red-500') : 'bg-gray-800'}`}></div>
                      <div className={`w-1.5 h-3 rounded-sm ${level.tier >= 3 ? (level.type?.toLowerCase() === 'support' ? 'bg-[#00d060]' : 'bg-red-500') : 'bg-gray-800'}`}></div>
                    </div>
                  </div>
                  {level.tier === 2 && getConfidenceBadge(level.confidence)}
                </div>
                
                <h4 className="text-white font-bold text-sm mb-2 leading-relaxed">
                  Zone: {level.price_low} - {level.price_high}
                </h4>
                <p className="text-gray-300 text-sm mb-2 font-medium">{level.description}</p>
                <p className="text-gray-400 text-sm mb-4">{level.significance}</p>
                
                {level.tier === 2 && level.confidence_reason && level.confidence_reason !== 'null' && (
                  <div className="space-y-2 pt-4 border-t border-[#222222]">
                    <div className="flex gap-2 text-xs">
                      <span className="font-bold text-gray-300 w-24 flex-shrink-0">Why this rating:</span>
                      <span className="text-gray-400">{level.confidence_reason}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Detected Patterns */}
        {aiData.patterns_detected && aiData.patterns_detected.length > 0 && renderSection("Detected Patterns", <Eye size={24} />, 
          <div className="space-y-6">
            {aiData.patterns_detected.map((p, i) => (
              <div key={i} className="bg-[#0a0a0a] rounded-xl p-5 border border-[#222222]">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-white text-lg">{p.name}</h4>
                    <span className="text-xs text-[#888888] block mt-1">Location: {p.location}</span>
                  </div>
                  {getConfidenceBadge(p.confidence)}
                </div>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{p.explanation}</p>
                
                <div className="space-y-2 pt-4 border-t border-[#222222]">
                  {p.confidence_reason && p.confidence_reason !== 'null' && (
                    <div className="flex gap-2 text-xs">
                      <span className="font-bold text-gray-300 w-24 flex-shrink-0">Why this rating:</span>
                      <span className="text-gray-400">{p.confidence_reason}</span>
                    </div>
                  )}
                  {p.reliability_note && p.reliability_note !== 'null' && (
                    <div className="flex gap-2 text-xs">
                      <span className="font-bold text-gray-300 w-24 flex-shrink-0">Keep in mind:</span>
                      <span className="text-gray-400 italic">{p.reliability_note}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Historical Context */}
        {aiData.historical_context && aiData.historical_context !== 'null' && typeof aiData.historical_context === 'string' && renderSection("Historical Context", <FileText size={24} />, 
          <div className="bg-[#0a0a0a] rounded-xl p-5 border border-[#222222]">
             <p className="text-gray-300 text-sm leading-relaxed mb-3">{aiData.historical_context}</p>
          </div>
        )}

        {/* Volume Note */}
        {aiData.volume_note && aiData.volume_note !== 'null' && typeof aiData.volume_note === 'string' && renderSection("Volume Observations", <BarChart3 size={24} />, 
          <div className="bg-[#0a0a0a] rounded-xl p-5 border border-[#222222]">
             {aiData.insights?.volume && (
               <div className="mb-4">
                 <div className="flex items-center justify-between text-xs mb-1">
                   <span className="font-bold text-gray-400 uppercase tracking-wider">Volume Level</span>
                   <span className="font-bold text-white capitalize">{aiData.insights.volume}</span>
                 </div>
                 <div className="w-full bg-[#222222] h-1.5 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-[#00d060] rounded-full" 
                     style={{ width: aiData.insights.volume.toLowerCase() === 'high' ? '100%' : aiData.insights.volume.toLowerCase() === 'medium' ? '66%' : '33%' }}
                   ></div>
                 </div>
               </div>
             )}
             <p className="text-gray-300 text-sm leading-relaxed mb-3">{aiData.volume_note}</p>
          </div>
        )}
        
        {/* Chart Annotations Data */}
        {aiData.chart_annotations && renderSection("Chart Annotations Data", <Target size={24} />, 
           <div className="space-y-4">
              <p className="text-xs text-[#888888] mb-2">Raw coordinates generated by AI for charting overlays.</p>
              
              {aiData.chart_annotations.support_zones && aiData.chart_annotations.support_zones.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-300 uppercase mb-2">Support Zones</h4>
                  <div className="space-y-2">
                    {aiData.chart_annotations.support_zones.map((z, i) => (
                      <div key={i} className="bg-[#00d060]/10 border border-[#00d060]/20 p-2 rounded text-xs text-[#00d060] flex justify-between">
                         <span>{z.label}</span>
                         <span className="font-mono">{z.price_low} - {z.price_high}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aiData.chart_annotations.resistance_zones && aiData.chart_annotations.resistance_zones.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-gray-300 uppercase mb-2">Resistance Zones</h4>
                  <div className="space-y-2">
                    {aiData.chart_annotations.resistance_zones.map((z, i) => (
                      <div key={i} className="bg-[#111111] border border-[#222222] p-2 rounded text-xs text-red-400 flex justify-between">
                         <span>{z.label}</span>
                         <span className="font-mono">{z.price_low} - {z.price_high}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aiData.chart_annotations.trendlines && aiData.chart_annotations.trendlines.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-xs font-bold text-gray-300 uppercase mb-2">Trendlines</h4>
                  <div className="space-y-2">
                    {aiData.chart_annotations.trendlines.map((t, i) => (
                      <div key={i} className="bg-[#0a0a0a] border border-[#222222] p-2 rounded text-xs text-gray-300">
                         <div className="flex justify-between mb-1">
                           <span className="font-bold">{t.label} ({t.type})</span>
                           {t.tier === 2 && getConfidenceBadge(t.confidence)}
                         </div>
                         {t.points.map((pt, j) => (
                           <div key={j} className="flex justify-between pl-2 border-l border-[#333333] mt-1">
                             <span>{pt.approx_position}</span>
                             <span className="font-mono">{pt.price}</span>
                           </div>
                         ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
           </div>
        )}

        
        {/* Next Steps */}
        {aiData.next_steps_to_consider && aiData.next_steps_to_consider.length > 0 && (
          <section className="bg-[#00d060]/10 border border-[#00d060]/20 rounded-xl p-6 sm:p-8 shadow-sm break-inside-avoid mb-8 w-full inline-block">
             <div className="flex items-center gap-3 text-[#00d060] mb-6 border-b border-[#00d060]/30 pb-4">
               <Info size={24} />
               <h2 className="text-xl font-bold heading-font">What to Watch Next</h2>
             </div>
             <ul className="space-y-4">
               {aiData.next_steps_to_consider.map((step, idx) => (
                 <li key={idx} className="flex items-start gap-4 bg-[#111111] p-4 rounded-lg border border-[#00d060]/20 shadow-sm">
                   <span className="text-[#00d060] font-bold mt-0.5 text-lg">›</span>
                   <span className="text-gray-300 leading-relaxed text-sm">{typeof step === 'string' ? step : JSON.stringify(step)}</span>
                 </li>
               ))}
             </ul>
          </section>
        )}

        {/* Risk Note */}
        {(aiData.risk_note || aiData.risk_invalidation_points) && (
          <section className="bg-[#111111] border border-[#222222] rounded-xl p-6 sm:p-8 shadow-sm break-inside-avoid mb-8 w-full inline-block">
            <div className="flex items-center gap-3 text-red-600 mb-4 border-b border-red-500/20 pb-4">
              <AlertTriangle size={24} />
              <h2 className="text-xl font-bold heading-font">Risk Invalidation Points</h2>
            </div>
            {Array.isArray(aiData.risk_invalidation_points) ? (
              <ul className="space-y-4">
                {aiData.risk_invalidation_points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4 bg-red-950/20 p-4 rounded-lg border border-red-500/20 shadow-sm">
                    <span className="text-red-500 font-bold mt-0.5 text-lg">•</span>
                    <span className="text-red-400 leading-relaxed text-sm">{typeof point === 'string' ? point : JSON.stringify(point)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-400 text-sm leading-relaxed mb-3">{aiData.risk_note}</p>
            )}
          </section>
        )}

      </div>

      {/* TL;DR Box Moved to Bottom */}
      <div className="bg-[#111111] border border-[#222222] rounded-xl p-6 shadow-sm flex flex-col justify-center items-center text-center py-10 mt-8 mb-8">
        <h3 className="text-[#888888] font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
           <Zap size={16} className="text-[#00d060]" /> In Very Short
        </h3>
        <div className="w-full text-left max-w-4xl mx-auto">
          {typeof aiData.tldr === 'string' ? (
             <span className="text-3xl font-black text-white uppercase tracking-tight leading-tight block text-center">
                {aiData.tldr || (aiData.trend_analysis?.direction || "Analyzed")}
             </span>
          ) : aiData.tldr ? (
             <div className="space-y-4">
                <p className="text-gray-200 font-medium text-base leading-relaxed text-center">
                   {aiData.tldr.brief}
                </p>
                <ul className="space-y-2 max-w-2xl mx-auto">
                   {aiData.tldr.points?.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                         <span className="text-[#00d060] mt-0.5">•</span>
                         <span className="leading-snug">{pt}</span>
                      </li>
                   ))}
                </ul>
             </div>
          ) : (
             <span className="text-3xl font-black text-white uppercase tracking-tight leading-tight block text-center">Analyzed</span>
          )}
        </div>
      </div>

        </div>
      )}
      {activeTab === 'news' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         {/* Latest News Full Box */}
         <div className="bg-[#111111] border border-[#222222] rounded-xl px-3 py-4 sm:p-8 shadow-sm flex flex-col mb-8 min-h-[400px]">
           <h2 className="text-xl font-bold text-white mb-4 sm:mb-6 heading-font border-b border-[#222222] pb-3 sm:pb-4 flex items-center gap-2 px-2 sm:px-0">
             <Sparkles size={22} className="text-[#00d060]" /> Latest News & Market Impact
           </h2>
           {isLoadingNews ? (
             <div className="flex justify-center items-center py-12 flex-1">
               <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00d060]"></div>
             </div>
           ) : news && news.length > 0 ? (
             <div className={`grid grid-cols-1 ${isFullSize ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 sm:gap-6`}>
               {news.map((item, idx) => (
                 <div key={idx} className="bg-[#0a0a0a] border border-[#222222] rounded-xl p-4 sm:p-5 flex flex-col hover:border-[#00d060]/30 transition-colors">
                   <h4 className="text-base font-bold text-white leading-snug mb-2 sm:mb-3">{item.headline}</h4>
                   <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mb-3 sm:mb-4 flex-1">{item.summary}</p>
                   
                   {item.impact && (
                     <div className="bg-[#00d060]/5 border border-[#00d060]/20 rounded-lg p-3 sm:p-4 mb-2 sm:mb-4 flex gap-2 items-start mt-auto">
                        <Activity size={16} className="text-[#00d060] mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-200 leading-relaxed font-medium">
                          <span className="text-[#00d060] font-bold block mb-0.5 sm:mb-1">Impact Analysis</span>
                          {item.impact}
                        </p>
                     </div>
                   )}
                   
                   <div className="flex justify-between items-center pt-3 border-t border-[#222222] mt-auto gap-2">
                     <span className="text-xs text-[#00d060] font-bold bg-[#00d060]/10 px-2 py-1 rounded uppercase tracking-wider truncate max-w-[70%]" title={item.source}>{item.source}</span>
                     <span className="text-xs text-[#888888] font-medium flex-shrink-0">{item.time}</span>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="flex flex-col items-center justify-center py-12 text-center flex-1">
                <Sparkles size={40} className="text-gray-700 mb-4" />
                <h3 className="text-lg font-bold text-gray-300">No news found</h3>
                <p className="text-sm text-gray-500 mt-2">We couldn't find any recent impactful news for this asset.</p>
             </div>
           )}
         </div>
        </div>
      )}

      {/* Mobile Actions (Bottom) */}
      <div className="flex sm:hidden gap-3 mt-8 mb-6">

        <button onClick={handleShare} className="flex-1 flex justify-center items-center gap-2 text-black transition bg-[#00d060] hover:bg-[#00e56a] border border-[#00d060]/50 shadow-[0_0_15px_rgba(0,208,96,0.2)] px-4 py-3 rounded-xl font-bold">
            <Share size={20} /> Share
        </button>
      </div>

      {/* Floating Chat History Overlay */}
      {chatHistory.length > 0 && (
        <div className={`fixed bottom-[100px] -translate-x-1/2 w-full max-w-3xl px-4 z-40 ${isFullSize ? 'left-1/2' : 'left-1/2 lg:left-[calc(50%+130px)]'}`}>
          <div className="bg-[#1e1e24]/95 backdrop-blur-xl border border-[#3f3f46] rounded-2xl p-5 max-h-[50dvh] sm:max-h-[400px] overflow-y-auto shadow-2xl flex flex-col gap-5 relative">
            <button 
              onClick={() => setChatHistory([])}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors bg-[#2a2b32] p-1.5 rounded-full"
            >
              <X size={16} />
            </button>
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-[#00d060] text-black font-semibold rounded-tr-sm' 
                    : 'bg-[#2a2b32] text-gray-200 border border-[#3f3f46] rounded-tl-sm'
                }`}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <ErrorBoundary>
                      <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-[#1a1b1e] prose-pre:border prose-pre:border-[#2a2b32] prose-ul:list-disc prose-ol:list-decimal prose-li:my-1 prose-strong:text-[#00d060]">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                        >
                          {msg.content || ''}
                        </ReactMarkdown>
                      </div>
                    </ErrorBoundary>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#2a2b32] text-gray-400 border border-[#3f3f46] rounded-2xl rounded-tl-sm px-4 py-3 text-sm flex gap-1.5 items-center">
                   <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                   <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                   <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Question Bar */}
      <div className={`fixed bottom-4 sm:bottom-6 pb-safe -translate-x-1/2 w-full max-w-3xl px-4 z-50 flex flex-col items-center ${isFullSize ? 'left-1/2' : 'left-1/2 lg:left-[calc(50%+130px)]'}`}>
        

        <div className="bg-[#2a2b32] border border-[#3f3f46] rounded-2xl flex items-center p-2 shadow-[0_0_15px_rgba(0,208,96,0.15)] focus-within:shadow-[0_0_25px_rgba(0,208,96,0.3)] transition-shadow mb-2 w-full">
          <input 
            type="text" 
            placeholder="Ask anything"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-transparent border-none text-[16px] text-white px-4 py-2 focus:outline-none placeholder:text-gray-400 caret-[#00d060]"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!chatInput.trim()}
            className="w-10 h-10 rounded-xl bg-[#00d060] hover:bg-[#00e56a] disabled:opacity-50 disabled:bg-[#40414f] disabled:text-gray-500 flex items-center justify-center text-black transition-colors flex-shrink-0 mr-1 shadow-md shadow-[#00d060]/20"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </div>
        <div className="text-center mt-1">
           <span className="text-[10px] text-[#888888] font-medium tracking-wide">For educational purposes only. Not financial advice.</span>
        </div>
      </div>

    </>
  );

  return (
    <div className={`mx-auto transition-all duration-500 ${isFullSize ? 'max-w-[1800px] w-full px-2 sm:px-6 pb-20' : 'max-w-6xl px-2 sm:px-4 md:px-0 pb-40'}`}>
      {/* Header Actions */}
      <div className={`flex items-center justify-between gap-2 w-full px-4 sm:px-0 ${isFullSize ? 'mb-4 pt-2' : 'mb-8 pt-4'}`}>
        {/* Left side */}
        <div className="flex-1 flex justify-start">
          <Link to="/upload" className="flex items-center gap-2 text-[#888888] hover:text-[#00d060] transition font-medium">
            <ArrowLeft size={28} /> <span className="hidden sm:inline">Back to Upload</span>
          </Link>
        </div>
        
        {/* Center */}
        <div className="flex-none flex justify-center scale-[0.85] sm:scale-100 origin-center -mx-4 sm:mx-0">
           {renderTabs()}
        </div>

        {/* Right side */}
        <div className="flex-1 flex justify-end gap-2 sm:gap-3">
          <button onClick={handleShare} className="flex justify-center items-center gap-2 text-white transition bg-[#00d060] hover:bg-[#00e56a] border border-[#00d060]/50 shadow-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium h-[40px] sm:h-[44px]">
            <Share size={18} /> <span className="hidden sm:inline">Share</span>
          </button>
          <button onClick={() => setIsFullSize(!isFullSize)} className="hidden sm:flex justify-center items-center gap-2 text-gray-400 transition hover:bg-[#1a1a1a] border border-[#222222] px-3 py-2 rounded-lg font-medium h-[44px]">
            {isFullSize ? <Minimize size={18} /> : <Maximize size={18} />}
            <span>{isFullSize ? 'Standard View' : 'Full Size'}</span>
          </button>
        </div>
      </div>

      {/* Image Quality Warning Banner */}
      {aiData.image_quality_note && aiData.image_quality_note !== 'null' && (
        <div className="mb-6 mx-4 sm:mx-0 bg-orange-900/20 border border-orange-500/30 rounded-xl p-4 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-orange-800 font-bold text-sm">Image Quality Warning</h4>
            <p className="text-orange-700 text-sm mt-1">{aiData.image_quality_note}</p>
          </div>
        </div>
      )}

      {/* Company Header */}
      {companyInfo && (
        <div className="mb-6 flex flex-col items-start">
          <h1 className="text-2xl sm:text-4xl font-black break-words text-white mb-2 heading-font tracking-tight">{companyInfo.name}</h1>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-gray-300 bg-[#1a1a1a] px-2 py-1 rounded border border-[#222222]">{companyInfo.symbol}</span>
            {companyInfo.price && (
              <>
                <span className="text-xl sm:text-3xl font-bold text-white ml-2">{companyInfo.price.toFixed(2)}</span>
                <span className="text-sm font-semibold text-[#888888] uppercase">{companyInfo.currency}</span>
                <span className={`text-lg font-bold ml-1 ${companyInfo.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {companyInfo.change >= 0 ? '+' : ''}{companyInfo.change?.toFixed(2)} ({formatPercent(companyInfo.changePercent)})
                </span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Analysis Layout */}
      {isFullSize ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:gap-8 items-start">
          {/* Left Column */}
          <div className="xl:col-span-6 flex flex-col gap-5 sticky top-6">
            {renderChart()}
            {renderInsights()}
            {renderKeyStats()}
          </div>
  
          {/* Right Column */}
          <div className="xl:col-span-6 flex flex-col gap-5">
            <div className="w-full max-w-[800px]">
              {renderContent()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8 items-start">
            {/* Left Column: Chart */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {renderChart()}
            </div>
            
            {/* Right Column: Insights & Stats */}
            <div className="lg:col-span-1 flex flex-col gap-4">
              {renderInsights()}
              {renderKeyStats()}
            </div>
          </div>
          
          {/* Other content in down (Educational AI Analysis) */}
          {renderContent()}
        </div>
      )}
    </div>
  );
}
