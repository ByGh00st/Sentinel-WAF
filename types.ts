export interface LogEntry {
  id: string;
  timestamp: string;
  ip: string;
  method: string;
  path: string;
  status: number;
  action: 'ALLOW' | 'BLOCK' | 'FLAG';
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'NONE';
  ruleId?: string;
  details?: string;
}

export interface Rule {
  id: string;
  name: string;
  pattern: string; // Regex string
  action: 'BLOCK' | 'FLAG' | 'ALLOW';
  description: string;
  enabled: boolean;
  hits: number;
}

export interface IPConfig {
  id: string;
  ip: string;
  type: 'BLACKLIST' | 'WHITELIST';
  note?: string;
  dateAdded: string;
}

export type ViewState = 'DASHBOARD' | 'RULES' | 'IP_MANAGER' | 'LOGS' | 'README';

export interface StatMetric {
  label: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}