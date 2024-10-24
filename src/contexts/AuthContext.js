import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const SESSION_KEY = 'auth_session';
const SESSION_DURATION = 120000; 
const WARNING_DURATION = 10000;

const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    const { isAuthenticated, role, expiry } = JSON.parse(session);
    if (new Date().getTime() < expiry) {
      return { isAuthenticated, role, expiry };
    }
  }
  return { isAuthenticated: false, role: null, expiry: 0 };
};

const saveSession = (isAuthenticated, role) => {
  const expiry = new Date().getTime() + SESSION_DURATION;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ isAuthenticated, role, expiry }));
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getSession().isAuthenticated);
  const [showWarning, setShowWarning] = useState(false);
  const [role, setRole] = useState(getSession().role);

  const login = (role) => {
    setIsAuthenticated(true);
    setRole(role);
    saveSession(true, role);
    setShowWarning(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem(SESSION_KEY);
    setShowWarning(false);
    console.log('User has been logged out.');
  };

  const extendSession = () => {
    saveSession(true, role, 10000);
    setShowWarning(false);
    console.log('Session extended.');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const session = getSession();
      const currentTime = new Date().getTime();
      if (currentTime >= session.expiry - WARNING_DURATION && currentTime < session.expiry) {
        setShowWarning(true);
      } else if (currentTime >= session.expiry) {
        setIsAuthenticated(false);
        localStorage.removeItem(SESSION_KEY);
        setShowWarning(false);
      } else {
        setShowWarning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout, extendSession, showWarning }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
