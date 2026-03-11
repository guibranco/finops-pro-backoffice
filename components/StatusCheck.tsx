
import React, { useState } from 'react';
import { Search, Info, Sparkles, ArrowRight, ShieldCheck, Clock, XCircle } from 'lucide-react';
import { getTransactionInsight } from '../services/geminiService';
import { TransactionStatus } from '../types';

const StatusCheck: React.FC = () => {
  const [ref, setRef] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TransactionStatus | null>(null);
  const [insight, setInsight] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ref) return;
    
    setLoading(true);
    setResult(null);
    setInsight(null);

    // Simulate database lookup
    setTimeout(async () => {
      const mockResult: TransactionStatus = {
        reference: ref,
        amount: Math.floor(Math.random() * 500) + 10,
        status: Math.random() > 0.3 ? 'COMPLETED' : (Math.random() > 0.5 ? 'FAILED' : 'PENDING'),
        date: new Date().toISOString().split('T')[0],
        type: 'Payment'
      };
      
      setResult(mockResult);
      setLoading(false);

      // Get AI Insight
      const aiInsight = await getTransactionInsight(mockResult);
      setInsight(aiInsight);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'COMPLETED': return <ShieldCheck className="text-green-500" />;
      case 'PENDING': return <Clock className="text-orange-500" />;
      case 'FAILED': return <XCircle className="text-red-500" />;
      default: return <Info className="text-gray-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-brand-purple p-8 rounded-2xl shadow-xl text-white relative overflow-hidden transition-colors border">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Transaction Status Lookup</h3>
          <p className="text-purple-100 mb-6 opacity-80">Trace and verify transaction lifecycle across all ledgers.</p>
          
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Enter Transaction Reference (e.g. OUT001234567-1-1-VEH-1)..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-6 py-4 pl-12 focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-4 focus:ring-brand-lime/30 transition-all text-white placeholder-purple-200"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200 group-focus-within:text-gray-400 transition-colors" size={20} />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-brand-lime text-brand-purple font-bold px-6 rounded-lg hover:scale-105 active:scale-95 transition-transform"
            >
              Search
            </button>
          </form>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-10">
            <Search size={120} />
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center p-12">
          <div className="w-12 h-12 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Querying ledger systems...</p>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                <h4 className="font-bold text-gray-800 text-lg uppercase tracking-wider">Details</h4>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-full transition-colors">
                  {getStatusIcon(result.status)}
                  <span className="font-bold text-xs">{result.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-8">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Reference</p>
                  <p className="font-mono text-gray-800">{result.reference}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Amount</p>
                  <p className="text-xl font-bold text-gray-800">${result.amount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Date</p>
                  <p className="text-gray-800">{result.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold mb-1">Category</p>
                  <p className="text-gray-800">{result.type}</p>
                </div>
              </div>
            </div>

            <div className="bg-brand-lime/10 border-l-4 border-brand-lime p-6 rounded-r-2xl flex items-start space-x-4 transition-colors">
               <div className="p-2 bg-brand-lime rounded-lg text-brand-purple shadow-sm">
                  <Sparkles size={20} />
               </div>
               <div>
                 <h5 className="font-bold text-brand-purple mb-1">AI Intelligence Insight</h5>
                 <p className="text-gray-700 text-sm leading-relaxed">
                   {insight || 'Analyzing transaction patterns...'}
                 </p>
               </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit transition-colors">
            <h4 className="font-bold text-gray-800 mb-6">Suggested Actions</h4>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-brand-purple hover:text-white rounded-xl transition-all group">
                <span className="text-sm font-semibold">Initiate Refund</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-brand-purple hover:text-white rounded-xl transition-all group">
                <span className="text-sm font-semibold">Flag for Review</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-brand-purple hover:text-white rounded-xl transition-all group">
                <span className="text-sm font-semibold">Download Receipt</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusCheck;
