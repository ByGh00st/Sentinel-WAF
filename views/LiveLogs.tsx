import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { Pause, Play, Download, Trash2, Filter } from 'lucide-react';

interface LiveLogsProps {
  logs: LogEntry[];
  isPaused: boolean;
  setIsPaused: (val: boolean) => void;
  clearLogs: () => void;
}

const LiveLogs: React.FC<LiveLogsProps> = ({ logs, isPaused, setIsPaused, clearLogs }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPaused) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isPaused]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Live Traffic Logs</h2>
          <p className="text-gray-400">Real-time request monitoring and interception.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsPaused(!isPaused)}
            className={`px-3 py-1.5 rounded flex items-center text-sm ${isPaused ? 'bg-amber-500/20 text-amber-400' : 'bg-cyber-800 text-gray-300'}`}
          >
            {isPaused ? <Play size={16} className="mr-2" /> : <Pause size={16} className="mr-2" />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button 
            onClick={clearLogs}
            className="px-3 py-1.5 bg-cyber-800 rounded text-gray-300 hover:text-red-400 hover:bg-cyber-700 flex items-center text-sm transition-colors"
          >
            <Trash2 size={16} className="mr-2" />
            Clear
          </button>
           <button 
            className="px-3 py-1.5 bg-cyber-800 rounded text-gray-300 hover:text-white hover:bg-cyber-700 flex items-center text-sm transition-colors"
          >
            <Download size={16} className="mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 bg-black rounded-xl border border-cyber-700 font-mono text-sm overflow-hidden flex flex-col shadow-2xl">
        <div className="bg-cyber-900 border-b border-cyber-700 p-2 flex text-xs text-gray-500 uppercase tracking-wider font-semibold">
            <div className="w-24">Time</div>
            <div className="w-20">Method</div>
            <div className="w-16">Status</div>
            <div className="w-32">IP Address</div>
            <div className="flex-1">Path</div>
            <div className="w-24 text-right">Action</div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {logs.length === 0 && (
            <div className="text-center text-gray-600 mt-20">Waiting for traffic...</div>
          )}
          
          {logs.map((log) => (
            <div 
                key={log.id} 
                className={`flex items-center p-1.5 rounded hover:bg-cyber-800 transition-colors ${
                    log.action === 'BLOCK' ? 'text-red-400 bg-red-500/5' : 
                    log.action === 'FLAG' ? 'text-amber-400 bg-amber-500/5' : 'text-emerald-400'
                }`}
            >
                <div className="w-24 opacity-60 text-xs">{log.timestamp.split('T')[1].split('.')[0]}</div>
                <div className="w-20 font-bold">{log.method}</div>
                <div className={`w-16 ${log.status >= 400 ? 'text-red-500' : 'text-green-500'}`}>{log.status}</div>
                <div className="w-32 text-gray-400">{log.ip}</div>
                <div className="flex-1 text-gray-300 truncate pr-4" title={log.path}>
                    {log.path}
                    {log.details && <span className="ml-2 text-xs opacity-50 italic">- {log.details}</span>}
                </div>
                <div className="w-24 text-right">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        log.action === 'BLOCK' ? 'border-red-500/30 bg-red-500/10' :
                        log.action === 'FLAG' ? 'border-amber-500/30 bg-amber-500/10' :
                        'border-emerald-500/30 bg-emerald-500/10'
                    }`}>
                        {log.action}
                    </span>
                </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

export default LiveLogs;