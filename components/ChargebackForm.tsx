
import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle2, X } from 'lucide-react';

const ChargebackForm: React.FC = () => {
  const [formData, setFormData] = useState({
    originalRef: '',
    amount: '',
    chargebackNumber: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFile(null);
        setFormData({
            originalRef: '',
            amount: '',
            chargebackNumber: '',
            date: new Date().toISOString().split('T')[0],
        });
      }, 3000);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-brand-purple">Report Chargeback</h3>
        <p className="text-gray-500">Record a customer-initiated dispute from the issuing bank.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Original Transaction Reference</label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
            value={formData.originalRef}
            onChange={(e) => setFormData({ ...formData, originalRef: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Amount ($)</label>
            <input
              required
              type="number"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Chargeback Number</label>
            <input
              required
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
              value={formData.chargebackNumber}
              onChange={(e) => setFormData({ ...formData, chargebackNumber: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Dispute Date</label>
          <input
            required
            type="date"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple outline-none transition-all"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Supporting Document (PDF/Image)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              file ? 'border-brand-lime bg-lime-50/30' : 'border-gray-200 hover:border-brand-purple bg-gray-50'
            }`}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept=".pdf,.png,.jpg,.jpeg"
            />
            {file ? (
              <div className="flex items-center space-x-3 text-brand-purple">
                <FileText size={32} />
                <div className="text-left">
                  <p className="font-semibold text-sm truncate max-w-[200px]">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="p-1 hover:bg-red-100 rounded-full text-red-500"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <Upload size={32} className="text-gray-400 mb-2" />
                <p className="text-sm font-medium text-gray-600">Click to upload file or drag & drop</p>
                <p className="text-xs text-gray-400 mt-1">Official bank chargeback notification required</p>
              </>
            )}
          </div>
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
