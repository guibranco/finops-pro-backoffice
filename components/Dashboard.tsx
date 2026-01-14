
import React from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ViewType } from '../types';

interface DashboardProps {
  setActiveView: (view: ViewType) => void;
}

const data = [
  { name: 'Mon', refunds: 12, chargebacks: 4 },
  { name: 'Tue', refunds: 19, chargebacks: 2 },
  { name: 'Wed', refunds: 15, chargebacks: 7 },
  { name: 'Thu', refunds: 22, chargebacks: 3 },
  { name: 'Fri', refunds: 30, chargebacks: 5 },
  { name: 'Sat', refunds: 8, chargebacks: 1 },
  { name: 'Sun', refunds: 5, chargebacks: 0 },
];

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  const stats = [
    { label: 'Pending Refunds', value: '42', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-50', darkBg: 'dark:bg-orange-950/30' },
    { label: 'New Chargebacks', value: '08', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', darkBg: 'dark:bg-red-950/30' },
    { label: 'Completed Today', value: '156', icon: CheckCircle2, color: 'text-brand-lime', bg: 'bg-lime-50', darkBg: 'dark:bg-brand-lime/10' },
    { label: 'Total Volume', value: '$24.5k', icon: TrendingUp, color: 'text-brand-purple', bg: 'bg-purple-50', darkBg: 'dark:bg-purple-950/30' },
  ];

  const quickActions = [
    { name: 'New Manual Refund', view: ViewType.MANUAL_REFUND, desc: 'Process immediate refunds to IBAN' },
    { name: 'Upload Chargeback', view: ViewType.CHARGEBACK, desc: 'Record bank-disputed transactions' },
    { name: 'Check Status', view: ViewType.STATUS_CHECK, desc: 'Real-time transaction lookup' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center space-x-4 transition-colors">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.darkBg}`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Weekly Activity Overview</h3>
            <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400 uppercase">Last 7 Days</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(243, 244, 246, 0.1)' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.5)', 
                    backgroundColor: '#1F2937',
                    color: '#F3F4F6'
                  }}
                  itemStyle={{ color: '#F3F4F6' }}
                />
                <Bar dataKey="refunds" fill="#79378B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="chargebacks" fill="#93CD3F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-brand-purple dark:bg-black text-white p-6 rounded-xl shadow-lg relative overflow-hidden border dark:border-gray-700">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
              <p className="text-purple-100 dark:text-gray-400 text-sm mb-6 opacity-80">Access common finance tools instantly.</p>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <button
                    key={action.name}
                    onClick={() => setActiveView(action.view)}
                    className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 dark:bg-gray-800 dark:hover:bg-gray-700 p-4 rounded-lg transition-all group"
                  >
                    <div className="text-left">
                      <p className="font-semibold text-white">{action.name}</p>
                      <p className="text-xs text-purple-200 dark:text-gray-500">{action.desc}</p>
                    </div>
                    <ArrowRight size={18} className="text-brand-lime group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-brand-lime rounded-full opacity-10"></div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-colors">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Gateway Status</span>
                <span className="flex items-center text-xs font-bold text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  OPERATIONAL
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Shadow Ledger Sync</span>
                <span className="flex items-center text-xs font-bold text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  UP TO DATE
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Batch Processing</span>
                <span className="flex items-center text-xs font-bold text-orange-600">
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                  PROCESSING
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
