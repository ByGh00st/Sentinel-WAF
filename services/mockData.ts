import { LogEntry, Rule, IPConfig } from '../types';

export const generateMockLogs = (count: number): LogEntry[] => {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
  const paths = ['/api/login', '/api/data', '/admin', '/user/profile', '/search', '/wp-admin', '/.env'];
  
  return Array.from({ length: count }).map((_, i) => {
    const isBlock = Math.random() > 0.8;
    const action: 'ALLOW' | 'BLOCK' | 'FLAG' = isBlock ? 'BLOCK' : (Math.random() > 0.9 ? 'FLAG' : 'ALLOW');
    const threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'NONE' = action === 'BLOCK' ? 'HIGH' : (action === 'FLAG' ? 'MEDIUM' : 'NONE');
    
    return {
      id: `log-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString(),
      ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      method: methods[Math.floor(Math.random() * methods.length)],
      path: paths[Math.floor(Math.random() * paths.length)],
      status: action === 'BLOCK' ? 403 : 200,
      action,
      threatLevel,
      details: isBlock ? 'SQL Injection Attempt detected via Regex' : undefined,
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const INITIAL_RULES: Rule[] = [
  {
    id: '1001',
    name: 'SQL Injection Protection',
    pattern: "('(''|[^'])*')|(;)|(\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT( +INTO){0,1}|MERGE|SELECT|UPDATE|UNION( +ALL){0,1})\b)",
    action: 'BLOCK',
    description: 'Prevents common SQL injection patterns in query parameters.',
    enabled: true,
    hits: 1420
  },
  {
    id: '1002',
    name: 'XSS Prevention',
    pattern: "(<script>|javascript:|on(load|error|click|mouseover)=)",
    action: 'BLOCK',
    description: 'Blocks Cross-Site Scripting (XSS) attacks.',
    enabled: true,
    hits: 856
  },
  {
    id: '1003',
    name: 'Directory Traversal',
    pattern: "(\.\./|\.\.\\)",
    action: 'BLOCK',
    description: 'Detects attempts to access parent directories.',
    enabled: true,
    hits: 34
  },
  {
    id: '1004',
    name: 'Admin Panel Protection',
    pattern: "^/admin/.*",
    action: 'FLAG',
    description: 'Monitors access to admin routes without blocking immediately.',
    enabled: false,
    hits: 0
  }
];

export const INITIAL_IPS: IPConfig[] = [
  { id: '1', ip: '10.0.0.55', type: 'WHITELIST', note: 'Internal VPN', dateAdded: '2023-10-01' },
  { id: '2', ip: '45.33.22.11', type: 'BLACKLIST', note: 'Known Scanner Bot', dateAdded: '2023-10-05' },
  { id: '3', ip: '185.220.101.5', type: 'BLACKLIST', note: 'Tor Exit Node', dateAdded: '2023-10-12' },
];