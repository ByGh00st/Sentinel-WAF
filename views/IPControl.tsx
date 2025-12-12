import React, { useState } from 'react';
import { IPConfig } from '../types';
import { Plus, Trash2, ShieldCheck, ShieldBan, Search } from 'lucide-react';

interface IPControlProps {
  ips: IPConfig[];
  setIps: React.Dispatch<React.SetStateAction<IPConfig[]>>;
}

const IPControl: React.FC<IPControlProps> = ({ ips, setIps }) => {
  const [newIP, setNewIP] = useState('');
  const [newType, setNewType] = useState<'BLACKLIST' | 'WHITELIST'>('BLACKLIST');
  const [filter, setFilter] = useState('');

  const handleAdd = () => {
    if (newIP) {
      setIps([
        {
          id: Date.now().toString(),
          ip: newIP,
          type: newType,
          dateAdded: new Date().toISOString().split('T')[0],
          note: 'Manual Entry'
        },
        ...ips
      ]);
      setNewIP('');
    }
  };

  const removeIP = (id: string) => {
    setIps(ips.filter(i => i.id !== id));
  };

  const filteredIps = ips.filter(ip => ip.ip.includes(filter));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">IP Access Control</h2>
          <p className="text-gray-400">Manage whitelist and blacklist entries.</p>
        </div>
        
        <div className="flex items-center bg-cyber-800 border border-cyber-700 rounded-lg p-1 w-full md:w-auto">
          <Search size={18} className="text-gray-500 ml-2" />
          <input 
            type="text" 
            placeholder="Search IP..." 
            className="bg-transparent border-none text-white px-3 py-1 focus:outline-none placeholder-gray-600"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-cyber-800 p-6 rounded-xl border border-cyber-700">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Entry</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="IP Address (e.g. 192.168.1.1)" 
            className="flex-1 bg-cyber-900 border border-cyber-700 rounded p-2 text-white focus:border-cyber-accent focus:outline-none font-mono"
            value={newIP}
            onChange={e => setNewIP(e.target.value)}
          />
          <select 
            className="bg-cyber-900 border border-cyber-700 rounded p-2 text-white focus:border-cyber-accent focus:outline-none"
            value={newType}
            onChange={e => setNewType(e.target.value as any)}
          >
            <option value="BLACKLIST">BLACKLIST (Block)</option>
            <option value="WHITELIST">WHITELIST (Allow)</option>
          </select>
          <button 
            onClick={handleAdd}
            className="bg-cyber-accent hover:bg-cyan-600 text-white px-6 py-2 rounded transition-colors flex items-center justify-center"
          >
            <Plus size={18} className="mr-2" />
            Add IP
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Blacklist Column */}
        <div className="bg-cyber-800 rounded-xl border border-cyber-700 overflow-hidden">
          <div className="p-4 bg-red-500/10 border-b border-red-500/20 flex items-center justify-between">
            <h3 className="text-red-400 font-semibold flex items-center">
              <ShieldBan size={18} className="mr-2" />
              Blacklist
            </h3>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
              {ips.filter(i => i.type === 'BLACKLIST').length}
            </span>
          </div>
          <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
            {filteredIps.filter(i => i.type === 'BLACKLIST').map(ip => (
              <div key={ip.id} className="flex items-center justify-between p-3 hover:bg-cyber-700 rounded group transition-colors">
                <div>
                  <p className="text-white font-mono">{ip.ip}</p>
                  <p className="text-xs text-gray-500">{ip.note} • {ip.dateAdded}</p>
                </div>
                <button 
                  onClick={() => removeIP(ip.id)}
                  className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {filteredIps.filter(i => i.type === 'BLACKLIST').length === 0 && (
              <div className="p-8 text-center text-gray-600 italic">No blacklisted IPs</div>
            )}
          </div>
        </div>

        {/* Whitelist Column */}
        <div className="bg-cyber-800 rounded-xl border border-cyber-700 overflow-hidden">
           <div className="p-4 bg-green-500/10 border-b border-green-500/20 flex items-center justify-between">
            <h3 className="text-green-400 font-semibold flex items-center">
              <ShieldCheck size={18} className="mr-2" />
              Whitelist
            </h3>
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
              {ips.filter(i => i.type === 'WHITELIST').length}
            </span>
          </div>
          <div className="p-2 space-y-2 max-h-[500px] overflow-y-auto">
             {filteredIps.filter(i => i.type === 'WHITELIST').map(ip => (
              <div key={ip.id} className="flex items-center justify-between p-3 hover:bg-cyber-700 rounded group transition-colors">
                <div>
                  <p className="text-white font-mono">{ip.ip}</p>
                  <p className="text-xs text-gray-500">{ip.note} • {ip.dateAdded}</p>
                </div>
                <button 
                  onClick={() => removeIP(ip.id)}
                  className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
             {filteredIps.filter(i => i.type === 'WHITELIST').length === 0 && (
              <div className="p-8 text-center text-gray-600 italic">No whitelisted IPs</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPControl;