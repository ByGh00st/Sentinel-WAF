import React, { useState } from 'react';
import { Rule } from '../types';
import { Plus, Trash2, Edit2, ToggleLeft, ToggleRight, Save, X } from 'lucide-react';

interface RulesProps {
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
}

const Rules: React.FC<RulesProps> = ({ rules, setRules }) => {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newRule, setNewRule] = useState<Partial<Rule>>({});
  const [isAdding, setIsAdding] = useState(false);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const deleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const handleSaveNew = () => {
    if (newRule.name && newRule.pattern) {
      setRules([
        ...rules,
        {
          id: Date.now().toString(),
          name: newRule.name,
          pattern: newRule.pattern,
          action: (newRule.action as any) || 'BLOCK',
          description: newRule.description || 'Custom Rule',
          enabled: true,
          hits: 0,
        }
      ]);
      setNewRule({});
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">WAF Rules Configuration</h2>
          <p className="text-gray-400">Manage regex-based filtering patterns.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-cyber-accent hover:bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add New Rule
        </button>
      </div>

      {isAdding && (
        <div className="bg-cyber-800 p-6 rounded-xl border border-cyber-700 animate-in fade-in slide-in-from-top-4">
          <h3 className="text-lg font-semibold text-white mb-4">New Rule Definition</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Rule Name</label>
              <input 
                type="text" 
                className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-white focus:border-cyber-accent focus:outline-none"
                placeholder="e.g. SQLi Defense"
                value={newRule.name || ''}
                onChange={e => setNewRule({...newRule, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Action</label>
              <select 
                className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-white focus:border-cyber-accent focus:outline-none"
                value={newRule.action || 'BLOCK'}
                onChange={e => setNewRule({...newRule, action: e.target.value as any})}
              >
                <option value="BLOCK">BLOCK</option>
                <option value="FLAG">FLAG</option>
                <option value="ALLOW">ALLOW</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Regex Pattern</label>
              <input 
                type="text" 
                className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-white font-mono text-sm focus:border-cyber-accent focus:outline-none"
                placeholder="e.g. (\.\./|\.\.\)"
                value={newRule.pattern || ''}
                onChange={e => setNewRule({...newRule, pattern: e.target.value})}
              />
            </div>
            <div className="md:col-span-2">
               <label className="block text-sm text-gray-400 mb-1">Description</label>
               <input 
                type="text" 
                className="w-full bg-cyber-900 border border-cyber-700 rounded p-2 text-white focus:border-cyber-accent focus:outline-none"
                value={newRule.description || ''}
                onChange={e => setNewRule({...newRule, description: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-3">
            <button 
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveNew}
              className="px-4 py-2 bg-cyber-accent text-white rounded hover:bg-cyan-600"
            >
              Save Rule
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {rules.map((rule) => (
          <div key={rule.id} className="bg-cyber-800 p-4 rounded-xl border border-cyber-700 flex flex-col md:flex-row items-start md:items-center justify-between hover:border-cyber-600 transition-colors">
            <div className="flex-1 mb-4 md:mb-0">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-lg font-semibold text-white">{rule.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  rule.action === 'BLOCK' ? 'bg-red-500/20 text-red-400' :
                  rule.action === 'FLAG' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {rule.action}
                </span>
                <span className="text-xs text-gray-500 font-mono">ID: {rule.id}</span>
              </div>
              <p className="text-gray-400 text-sm mb-2">{rule.description}</p>
              <div className="bg-cyber-900 p-2 rounded border border-cyber-700 inline-block max-w-full overflow-x-auto">
                <code className="text-cyber-accent text-xs font-mono">{rule.pattern}</code>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
              <div className="text-right mr-4">
                <p className="text-xs text-gray-500">Hits</p>
                <p className="text-lg font-mono text-white">{rule.hits}</p>
              </div>
              
              <button onClick={() => toggleRule(rule.id)} className="text-gray-400 hover:text-white transition-colors">
                {rule.enabled ? <ToggleRight size={32} className="text-cyber-success" /> : <ToggleLeft size={32} />}
              </button>
              
              <button 
                onClick={() => deleteRule(rule.id)}
                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;