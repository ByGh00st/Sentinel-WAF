import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Rules from './views/Rules';
import IPControl from './views/IPControl';
import LiveLogs from './views/LiveLogs';
import Readme from './views/Readme';
import { ViewState, LogEntry, Rule, IPConfig } from './types';
import { generateMockLogs, INITIAL_RULES, INITIAL_IPS } from './services/mockData';
import { Bell, User, Search } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('DASHBOARD');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [rules, setRules] = useState<Rule[]>(INITIAL_RULES);
  const [ips, setIps] = useState<IPConfig[]>(INITIAL_IPS);
  const [isPaused, setIsPaused] = useState(false);

  // Simulate incoming traffic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        const newLogs = generateMockLogs(1); // 1 new log per interval
        setLogs(prev => {
          const updated = [...prev, ...newLogs];
          return updated.slice(-100); // Keep last 100 logs
        });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Initial data load
  useEffect(() => {
    setLogs(generateMockLogs(15));
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'DASHBOARD':
        return <Dashboard logs={logs} />;
      case 'RULES':
        return <Rules rules={rules} setRules={setRules} />;
      case 'IP_MANAGER':
        return <IPControl ips={ips} setIps={setIps} />;
      case 'LOGS':
        return <LiveLogs logs={logs} isPaused={isPaused} setIsPaused={setIsPaused} clearLogs={() => setLogs([])} />;
      case 'README':
        return <Readme />;
      default:
        return <Dashboard logs={logs} />;
    }
  };

  return (
    <div className="flex h-screen bg-cyber-900 text-gray-100 font-sans overflow-hidden selection:bg-cyber-accent selection:text-white">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-cyber-800 border-b border-cyber-700 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center text-gray-400 text-sm">
            <span className="mr-2">Pages</span> / <span className="ml-2 text-white font-medium capitalize">{currentView.toLowerCase().replace('_', ' ')}</span>
          </div>

          <div className="flex items-center space-x-4">
             <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-cyber-900 border border-cyber-700 rounded-full py-1.5 pl-10 pr-4 text-sm text-gray-300 focus:outline-none focus:border-cyber-accent transition-colors"
                />
             </div>
             
             <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
             </button>
             
             <div className="flex items-center space-x-2 border-l border-cyber-700 pl-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-accent to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                    BG
                </div>
                <span className="text-sm font-medium hidden md:block">ByGhost</span>
             </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;