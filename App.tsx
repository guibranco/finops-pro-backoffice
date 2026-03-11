
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

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const mockNotifications = [
    { id: 1, title: 'New Chargeback Request', message: 'A new chargeback request #CB-8921 has been submitted.', time: '2 mins ago', unread: true },
    { id: 2, title: 'Refund Processed', message: 'Manual refund for transaction #TX-4412 was successful.', time: '1 hour ago', unread: true },
    { id: 3, title: 'System Maintenance', message: 'Scheduled maintenance this Sunday at 02:00 AM UTC.', time: '5 hours ago', unread: false },
    { id: 4, title: 'Report Ready', message: 'Monthly financial summary for February is now available.', time: '1 day ago', unread: false },
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
    <div className="min-h-screen flex overflow-hidden transition-colors duration-300 bg-gray-50">
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
            className="p-1 rounded transition-colors hover:bg-purple-700"
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
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-brand-lime text-brand-purple">
              <User size={16} />
            </div>
            {isSidebarOpen && <span>Finance Admin</span>}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="bg-white border-gray-200 border-b h-16 flex items-center justify-between px-8 sticky top-0 z-40 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-gray-800">
            {navigation.find(n => n.view === activeView)?.name}
          </h2>
          <div className="flex items-center space-x-4 relative">
            <button 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className={`p-2 transition-colors relative rounded-full ${isNotificationsOpen ? 'bg-purple-50 text-brand-purple' : 'text-gray-500 hover:text-brand-purple hover:bg-gray-50'}`}
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsNotificationsOpen(false)}
                ></div>
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    <span className="text-xs font-medium text-brand-purple bg-purple-100 px-2 py-0.5 rounded-full">
                      {mockNotifications.filter(n => n.unread).length} New
                    </span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {mockNotifications.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer relative ${notification.unread ? 'bg-purple-50/30' : ''}`}
                      >
                        {notification.unread && (
                          <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-purple rounded-full"></div>
                        )}
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full p-3 text-sm font-medium text-brand-purple hover:bg-purple-50 transition-colors border-t border-gray-50">
                    View all notifications
                  </button>
                </div>
              </>
            )}

            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium leading-tight text-gray-900">Sarah Jenkins</span>
              <span className="text-xs italic text-gray-500">Senior Financial Analyst</span>
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
