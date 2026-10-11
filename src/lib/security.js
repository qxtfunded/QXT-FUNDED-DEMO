// Client-side Privacy, Session Hardening & Security Utilities

export const PRIVACY_PROFILE = {
  activeShield: 'Active Guard v4.8',
  edgeProxyStatus: 'Operational',
  ipRotationInterval: '5 minutes (Auto-Rotating Anycast Edge Node)',
  currentEdgeNode: 'edge-frankfurt-shield-09.relay',
  encryptionStandard: 'AES-256-GCM / TLS 1.3 Strict',
  referrerPolicy: 'strict-origin-when-cross-origin',
  cookiePolicy: 'HttpOnly-flagged, SameSite=Strict, Secure-only',
};

// Generates simulated rotating edge nodes to illustrate edge origin masking
export function getRotatingEdgeNode() {
  const nodes = [
    { id: 'FRA-SHIELD-01', location: 'Frankfurt, DE', latency: '12ms', ip: '185.220.101.5' },
    { id: 'ZUR-SHIELD-04', location: 'Zurich, CH', latency: '18ms', ip: '194.26.29.112' },
    { id: 'AMS-SHIELD-09', location: 'Amsterdam, NL', latency: '15ms', ip: '198.51.100.84' },
    { id: 'STK-SHIELD-02', location: 'Stockholm, SE', latency: '22ms', ip: '193.138.218.70' },
    { id: 'SIN-SHIELD-07', location: 'Singapore, SG', latency: '34ms', ip: '103.251.167.20' },
  ];
  const index = Math.floor(Date.now() / (5 * 60 * 1000)) % nodes.length;
  return nodes[index];
}

// Sanitizes and masks sensitive strings for display
export function maskSensitiveData(str, visibleChars = 4) {
  if (!str || str.length <= visibleChars * 2) return str;
  const start = str.slice(0, visibleChars);
  const end = str.slice(-visibleChars);
  return `${start}••••••••${end}`;
}

// Comprehensive secure wiping of local session traces
export function purgeSessionTraces() {
  try {
    sessionStorage.clear();
    // Keep essential order history if user needs it, or wipe everything on demand
    const keysToRemove = ['qxt_temp_token', 'qxt_fingerprint', 'qxt_draft_order'];
    keysToRemove.forEach(k => localStorage.removeItem(k));
    return true;
  } catch {
    return false;
  }
}
