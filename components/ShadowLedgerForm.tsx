
import React, { useState } from 'react';
import { Send, CheckCircle2, History, Database } from 'lucide-react';

const ShadowLedgerForm: React.FC = () => {
  const [ref, setRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-colors">
        <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-brand-purple/10 rounded-xl text-brand-purple transition-colors">
                <Database size={24} />
            </div>
            <div>
                <h3 className="text-2xl font-bold text-brand-purple">Shadow Ledger Re-sync</h3>
                <p className="text-gray-500">Force-sync collection items to the internal shadow ledger.</p>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Transaction Reference</label>
            <input
              required
              type="text"
              placeholder="e.g. OUT001234567-1-1-VEH-1"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all placeholder:text-gray-400"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
            />
          </div>

          <div className="bg-brand-lime/10 p-4 rounded-xl border border-brand-lime/20 transition-colors">
            <p className="text-xs text-brand-purple/80 font-medium leading-relaxed">
              Pushing a transaction to the shadow ledger will verify the item against current batch records and create an entry if missing. This is usually required for reconciliation discrepancies.
            </p>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
              success 
                ? 'bg-green-500 text-white' 
                : 'bg-brand-purple text-white hover:bg-purple-800 shadow-lg'
            } disabled:opacity-50`}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : success ? (
              <>
                <CheckCircle2 size={20} />
                <span>Successfully Synced!</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Resend to Shadow Ledger</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="mt-8 bg-white rounded-2xl border border-gray-100 overflow-hidden transition-colors">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between transition-colors">
            <div className="flex items-center space-x-2 text-gray-700">
                <History size={16} />
                <span className="text-sm font-bold uppercase tracking-wider">Recent Syncs</span>
            </div>
            <span className="text-[10px] font-bold text-gray-400">Live Feed</span>
        </div>
        <div className="divide-y divide-gray-50">
            {[1, 2, 3].map(i => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center space-x-3 text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-brand-lime"></div>
                        <span className="text-sm font-mono">OUT001234567-1-1-VEH-{i}</span>
                    </div>
                    <span className="text-xs text-gray-400">Just now</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShadowLedgerForm;
