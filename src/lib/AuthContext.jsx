import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('qxt_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      uid: 'trader_9921',
      email: 'trader@qxtfunded.com',
      displayName: 'Alex Rivers',
      country: 'United Kingdom',
      kycStatus: 'Verified (Level 2)',
      twoFactorEnabled: true,
      lastLoginIp: '185.220.101.5 (Secure Cloud Proxy)',
      lastLoginDate: new Date().toLocaleDateString(),
    };
  });

  const [securitySettings, setSecuritySettings] = useState({
    sessionTimeout: '30m',
    ipMaskingActive: true,
    stealthMode: true,
    strictCookies: true,
    antiFingerprint: true,
  });

  useEffect(() => {
    if (currentUser) {
      try {
        localStorage.setItem('qxt_user', JSON.stringify(currentUser));
      } catch {
        // ignore
      }
    }
  }, [currentUser]);

  const login = (email, password) => {
    const user = {
      uid: `trader_${Math.floor(1000 + Math.random() * 9000)}`,
      email,
      displayName: email.split('@')[0],
      country: 'Global',
      kycStatus: 'Verified (Level 1)',
      twoFactorEnabled: true,
      lastLoginIp: '194.26.29.112 (Shield Protected)',
      lastLoginDate: new Date().toLocaleDateString(),
    };
    setCurrentUser(user);
    return { success: true };
  };

  const signup = (name, email, password) => {
    const user = {
      uid: `trader_${Math.floor(1000 + Math.random() * 9000)}`,
      email,
      displayName: name,
      country: 'Global',
      kycStatus: 'Pending Verification',
      twoFactorEnabled: false,
      lastLoginIp: '194.26.29.112 (Shield Protected)',
      lastLoginDate: new Date().toLocaleDateString(),
    };
    setCurrentUser(user);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('qxt_user');
    } catch {
      // ignore
    }
  };

  const updateSecurity = (key, val) => {
    setSecuritySettings(prev => ({ ...prev, [key]: val }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      signup,
      logout,
      securitySettings,
      updateSecurity,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
