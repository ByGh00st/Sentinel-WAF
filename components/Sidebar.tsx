import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, ShieldAlert, Globe, Terminal, FileText, Activity } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
    { id: 'DASHBOARD', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'RULES', label: 'WAF Rules', icon: <ShieldAlert size={20} /> },
    { id: 'IP_MANAGER', label: 'IP Access Control', icon: <Globe size={20} /> },
    { id: 'LOGS', label: 'Live Traffic', icon: <Activity size={20} /> },
    { id: 'README', label: 'Documentation', icon: <FileText size={20} /> },
  ];

  return (
    <div className="w-64 bg-cyber-800 border-r border-cyber-700 h-screen flex flex-col flex-shrink-0">
      <div className="p-6 flex items-center space-x-3 border-b border-cyber-700">
        <div className="w-8 h-8 bg-cyber-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          <Terminal className="text-white" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wider">SENTINEL</h1>
          <p className="text-xs text-cyber-500 font-mono">WAF PROTECTION</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              currentView === item.id
                ? 'bg-cyber-accent/10 text-cyber-accent border border-cyber-accent/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]'
                : 'text-gray-400 hover:bg-cyber-700 hover:text-white'
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-cyber-700">
        <div className="bg-cyber-900 rounded-lg p-3 border border-cyber-700">
          <p className="text-xs text-cyber-500 mb-1">SYSTEM STATUS</p>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyber-success animate-pulse"></span>
            <span className="text-sm font-mono text-cyber-success">OPERATIONAL</span>
          </div>
        </div>
        <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">Developer ByGhost</p>
            <p className="text-xs text-gray-600">byghost.tr</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;