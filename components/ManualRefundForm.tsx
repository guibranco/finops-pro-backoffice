
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const ManualRefundForm: React.FC = () => {
  const [formData, setFormData] = useState({
    originalRef: '',
    transactionRef: '',
    amount: '',
    iban: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-brand-purple dark:text-brand-lime">Manual Refund Processing</h3>
        <p className="text-gray-500 dark:text-gray-400">Initiate a direct refund back to the customer's bank account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Original Transaction Reference</label>
            <input
              required
              type="text"
              placeholder="e.g. TX-12345"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              value={formData.originalRef}
              onChange={(e) => setFormData({ ...formData, originalRef: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">New Refund Reference</label>
            <input
              required
              type="text"
              placeholder="e.g. RF-98765"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              value={formData.transactionRef}
              onChange={(e) => setFormData({ ...formData, transactionRef: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Amount ($)</label>
            <input
              required
              type="number"
              step="0.01"
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Refund Date</label>
            <input
              required
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">IBAN / Account Number</label>
          <input
            required
            type="text"
            placeholder="GB 00 XXXX 0000 0000 0000"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all font-mono placeholder:text-gray-400 dark:placeholder:text-gray-600"
            value={formData.iban}
            onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
          />
        </div>

        <div className="pt-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
              success 
                ? 'bg-green-500 text-white' 
                : 'bg-brand-purple dark:bg-brand-lime text-white dark:text-black hover:bg-purple-800 dark:hover:bg-brand-limeDark shadow-lg shadow-purple-200 dark:shadow-none'
            } disabled:opacity-50`}
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : success ? (
              <>
                <CheckCircle2 size={20} />
                <span>Refund Processed!</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Process Refund</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManualRefundForm;
