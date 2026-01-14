
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  RotateCcw, 
  ArrowLeftRight, 
  RefreshCw, 
  Search, 
  Send, 
  Menu, 
  X,
  User,
  Bell
} from 'lucide-react';
import { ViewType } from './types';
import Dashboard from './components/Dashboard';
import ManualRefundForm from './components/ManualRefundForm';
import ChargebackForm from './components/ChargebackForm';
import ResubmissionForm from './components/ResubmissionForm';
import StatusCheck from './components/StatusCheck';
import ShadowLedgerForm from './components/ShadowLedgerForm';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', view: ViewType.DASHBOARD, icon: LayoutDashboard },
    { name: 'Manual Refund', view: ViewType.MANUAL_REFUND, icon: RotateCcw },
    { name: 'Chargebacks', view: ViewType.CHARGEBACK, icon: ArrowLeftRight },
    { name: 'Resubmissions', view: ViewType.RESUBMISSION, icon: RefreshCw },
    { name: 'Status Check', view: ViewType.STATUS_CHECK, icon: Search },
    { name: 'Shadow Ledger', view: ViewType.SHADOW_LEDGER, icon: Send },
  ];

  const renderContent = () => {
    switch (activeView) {
      case ViewType.DASHBOARD: return <Dashboard setActiveView={setActiveView} />;
      case ViewType.MANUAL_REFUND: return <ManualRefundForm />;
      case ViewType.CHARGEBACK: return <ChargebackForm />;
      case ViewType.RESUBMISSION: return <ResubmissionForm />;
      case ViewType.STATUS_CHECK: return <StatusCheck />;
      case ViewType.SHADOW_LEDGER: return <ShadowLedgerForm />;
      default: return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-brand-purple text-white transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <span className="text-2xl font-bold tracking-tight text-brand-lime">FinOps Pro</span>
          ) : (
            <span className="text-xl font-bold text-brand-lime">FP</span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 hover:bg-purple-700 rounded transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveView(item.view)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                activeView === item.view 
                  ? 'bg-brand-lime text-brand-purple font-semibold shadow-lg' 
                  : 'hover:bg-purple-700/50 text-purple-100'
              }`}
            >
              <item.icon size={20} className={activeView === item.view ? 'text-brand-purple' : 'text-purple-300'} />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-purple-800">
          <div className="flex items-center space-x-3 text-sm opacity-80">
            <div className="w-8 h-8 rounded-full bg-brand-lime flex items-center justify-center text-brand-purple">
              <User size={16} />
            </div>
            {isSidebarOpen && <span>Finance Admin</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="text-xl font-semibold text-gray-800">
            {navigation.find(n => n.view === activeView)?.name}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-brand-purple transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900 leading-tight">Sarah Jenkins</span>
              <span className="text-xs text-gray-500 italic">Senior Financial Analyst</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
