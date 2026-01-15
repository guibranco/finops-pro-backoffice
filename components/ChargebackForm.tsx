
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ChargebackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    originalRef: '',
    amount: '',
    chargebackNumber: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
            originalRef: '',
            amount: '',
            chargebackNumber: '',
            date: new Date().toISOString().split('T')[0],
        });
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-brand-purple dark:text-brand-lime">Report Chargeback</h3>
        <p className="text-gray-500 dark:text-gray-400">Record a customer-initiated dispute from the issuing bank.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Original Transaction Reference</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
            value={formData.originalRef}
            onChange={(e) => setFormData({ ...formData, originalRef: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Amount ($)</label>
            <input
              required
              type="number"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Chargeback Number</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
              value={formData.chargebackNumber}
              onChange={(e) => setFormData({ ...formData, chargebackNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Dispute Date</label>
          <input
            required
            type="date"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all ${
            success 
              ? 'bg-green-500 text-white' 
              : 'bg-brand-purple dark:bg-brand-lime text-white dark:text-black hover:bg-purple-800 dark:hover:bg-brand-limeDark shadow-lg'
          } disabled:opacity-50`}
        >
          {isSubmitting ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : success ? (
            <>
              <CheckCircle2 size={20} />
              <span>Chargeback Logged!</span>
            </>
          ) : (
            <span>Submit Chargeback</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChargebackForm;
