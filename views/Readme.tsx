import React from 'react';
import { Terminal, Box, Shield, Activity, Globe, Cpu } from 'lucide-react';

const Readme: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      <div className="bg-cyber-800 p-8 rounded-xl border border-cyber-700 shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Shield size={200} />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">Sentinel WAF</h1>
        <div className="flex space-x-3 text-sm font-mono text-cyber-accent mb-6">
          <span className="bg-cyber-900 px-2 py-1 rounded border border-cyber-700">Node.js</span>
          <span className="bg-cyber-900 px-2 py-1 rounded border border-cyber-700">Express</span>
          <span className="bg-cyber-900 px-2 py-1 rounded border border-cyber-700">Regex</span>
        </div>
        
        <p className="text-lg text-gray-300 leading-relaxed border-l-4 border-cyber-accent pl-4">
          Sentinel WAF, web uygulamalarını yaygın siber saldırılara karşı korumak için tasarlanmış, 
          Node.js tabanlı, hafif ve özelleştirilebilir bir Web Uygulama Güvenlik Duvarıdır.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-cyber-800 p-6 rounded-xl border border-cyber-700 hover:border-cyber-500 transition-colors">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Box className="mr-2 text-blue-400" />
                Key Features
            </h2>
            <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                    <Shield className="mr-2 text-cyber-success mt-1 flex-shrink-0" size={16} />
                    <span>OWASP Top 10 koruması (SQLi, XSS vb.)</span>
                </li>
                <li className="flex items-start">
                    <Activity className="mr-2 text-cyber-accent mt-1 flex-shrink-0" size={16} />
                    <span>Gerçek zamanlı trafik analizi ve engelleme</span>
                </li>
                <li className="flex items-start">
                    <Terminal className="mr-2 text-amber-400 mt-1 flex-shrink-0" size={16} />
                    <span>Regex tabanlı özelleştirilebilir kural setleri</span>
                </li>
                <li className="flex items-start">
                    <Globe className="mr-2 text-indigo-400 mt-1 flex-shrink-0" size={16} />
                    <span>IP tabanlı kara liste/beyaz liste yönetimi</span>
                </li>
                <li className="flex items-start">
                    <Cpu className="mr-2 text-red-400 mt-1 flex-shrink-0" size={16} />
                    <span>Düşük gecikme süresi ve yüksek performans</span>
                </li>
            </ul>
        </div>

        <div className="bg-cyber-800 p-6 rounded-xl border border-cyber-700 hover:border-cyber-500 transition-colors flex flex-col justify-center">
             <h2 className="text-xl font-semibold text-white mb-4">Installation & Usage</h2>
             <div className="bg-black p-4 rounded-lg font-mono text-sm text-gray-300 border border-cyber-700">
                <p className="text-gray-500 mb-2"># Clone repository</p>
                <p className="mb-4"><span className="text-pink-500">git</span> clone https://github.com/byghost/sentinel-waf.git</p>
                
                <p className="text-gray-500 mb-2"># Install dependencies</p>
                <p className="mb-4"><span className="text-pink-500">npm</span> install</p>

                <p className="text-gray-500 mb-2"># Start WAF middleware</p>
                <p><span className="text-pink-500">npm</span> start</p>
             </div>
        </div>
      </div>

      <div className="border-t border-cyber-700 pt-8 mt-8 text-center">
        <p className="text-gray-400 text-sm">Maintained by</p>
        <h3 className="text-2xl font-bold text-white mt-1">ByGhost</h3>
        <a href="https://byghost.tr" target="_blank" rel="noopener noreferrer" className="text-cyber-accent hover:underline mt-1 inline-block">
            byghost.tr
        </a>
      </div>
    </div>
  );
};

export default Readme;