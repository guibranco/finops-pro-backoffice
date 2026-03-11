
import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, HelpCircle } from 'lucide-react';

const ResubmissionForm: React.FC = () => {
  const [failedRef, setFailedRef] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-colors">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-brand-purple">Manual Refund Resubmission</h3>
          <p className="text-gray-500">Retry a previously failed manual refund transaction.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-700">Failed Refund Transaction Reference</label>
              <button type="button" className="text-brand-purple hover:underline text-xs flex items-center">
                <HelpCircle size={14} className="mr-1" /> Find Reference
              </button>
            </div>
            <input
              required
              type="text"
              placeholder="e.g. OUT001234567-1-1-VEH-1"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
              value={failedRef}
              onChange={(e) => setFailedRef(e.target.value)}
            />
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-start space-x-3">
            <div className="p-1 mt-0.5 text-brand-purple">
              <RefreshCw size={16} />
            </div>
            <p className="text-sm text-brand-purple leading-relaxed">
              <strong>Note:</strong> Resubmitting will generate a new transaction attempt using the existing IBAN details. Ensure the reason for the original failure has been resolved before retrying.
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
                <span>Resubmission Queued!</span>
              </>
            ) : (
              <>
                <RefreshCw size={20} />
                <span>Request Resubmission</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 transition-colors">
        <h4 className="font-bold text-gray-800 mb-4">Recent Resubmissions</h4>
        <div className="space-y-3">
            {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">OUT001234567-1-1-VEH-{i}</p>
                        <p className="text-xs text-gray-500">Submitted 2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 bg-lime-100 text-brand-purple text-[10px] font-bold rounded uppercase transition-colors">Processing</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ResubmissionForm;
