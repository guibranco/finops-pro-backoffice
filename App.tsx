
import React, { useState, useEffect } from 'react';
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
  Bell,
  Sun,
  Moon
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
    <div className={`min-h-screen flex overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${isDarkMode ? 'bg-black border-r border-gray-800' : 'bg-brand-purple'} text-white transition-all duration-300 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <span className={`text-2xl font-bold tracking-tight ${isDarkMode ? 'text-brand-lime' : 'text-brand-lime'}`}>FinOps Pro</span>
          ) : (
            <span className="text-xl font-bold text-brand-lime">FP</span>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-1 rounded transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-purple-700'}`}
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
                  ? `${isDarkMode ? 'bg-brand-lime text-black font-semibold' : 'bg-brand-lime text-brand-purple font-semibold shadow-lg'}` 
                  : `${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-purple-700/50 text-purple-100'}`
              }`}
            >
              <item.icon size={20} className={activeView === item.view ? (isDarkMode ? 'text-black' : 'text-brand-purple') : (isDarkMode ? 'text-gray-500' : 'text-purple-300')} />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-purple-800'}`}>
          <div className="flex items-center space-x-3 text-sm opacity-80">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-gray-800 text-brand-lime' : 'bg-brand-lime text-brand-purple'}`}>
              <User size={16} />
            </div>
            {isSidebarOpen && <span>Finance Admin</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b h-16 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-300`}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {navigation.find(n => n.view === activeView)?.name}
          </h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-brand-lime hover:bg-gray-800' : 'text-gray-500 hover:bg-gray-100'}`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className={`h-6 w-px ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} mx-2`}></div>
            <button className={`p-2 transition-colors relative ${isDarkMode ? 'text-gray-400 hover:text-brand-lime' : 'text-gray-500 hover:text-brand-purple'}`}>
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className={`h-6 w-px ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} mx-2`}></div>
            <div className="flex flex-col items-end">
              <span className={`text-sm font-medium leading-tight ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Sarah Jenkins</span>
              <span className={`text-xs italic ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Senior Financial Analyst</span>
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
