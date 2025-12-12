import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Shield, AlertTriangle, Activity, Globe } from 'lucide-react';
import { LogEntry } from '../types';

interface DashboardProps {
  logs: LogEntry[];
}

const Dashboard: React.FC<DashboardProps> = ({ logs }) => {
  // Mock aggregation for charts
  const data = [
    { name: '00:00', requests: 400, blocked: 24 },
    { name: '04:00', requests: 300, blocked: 13 },
    { name: '08:00', requests: 200, blocked: 98 },
    { name: '12:00', requests: 278, blocked: 39 },
    { name: '16:00', requests: 189, blocked: 48 },
    { name: '20:00', requests: 239, blocked: 38 },
    { name: '24:00', requests: 349, blocked: 43 },
  ];

  const pieData = [
    { name: 'SQL Injection', value: 400 },
    { name: 'XSS', value: 300 },
    { name: 'Path Traversal', value: 300 },
    { name: 'DDoS Attempt', value: 200 },
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#06b6d4', '#8b5cf6'];

  const stats = [
    { label: 'Total Requests', value: '2.4M', icon: <Activity className="text-blue-400" />, trend: '+12%' },
    { label: 'Threats Blocked', value: '14,203', icon: <Shield className="text-emerald-400" />, trend: '+5%' },
    { label: 'Avg Latency', value: '24ms', icon: <Globe className="text-indigo-400" />, trend: '-2%' },
    { label: 'Active Alerts', value: '3', icon: <AlertTriangle className="text-red-400" />, trend: 'HIGH' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-cyber-800 p-6 rounded-xl border border-cyber-700 shadow-lg hover:border-cyber-600 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white font-mono">{stat.value}</h3>
              </div>
              <div className="p-2 bg-cyber-900 rounded-lg border border-cyber-700">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs">
              <span className="text-cyber-success bg-cyber-success/10 px-2 py-0.5 rounded mr-2">{stat.trend}</span>
              <span className="text-gray-500">vs last 24h</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-cyber-800 p-6 rounded-xl border border-cyber-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Activity size={18} className="mr-2 text-cyber-accent" />
            Traffic Overview
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBlock" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorReq)" />
                <Area type="monotone" dataKey="blocked" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorBlock)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-cyber-800 p-6 rounded-xl border border-cyber-700 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
            <Shield size={18} className="mr-2 text-cyber-danger" />
            Attack Distribution
          </h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '0.5rem' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-3xl font-bold text-white block">1.2k</span>
                <span className="text-xs text-gray-500">Threats</span>
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx] }}></span>
                  <span className="text-gray-300">{entry.name}</span>
                </div>
                <span className="text-gray-400 font-mono">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;