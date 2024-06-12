import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const SESSION_KEY = 'auth_session';
const SESSION_DURATION = 300000;
const WARNING_DURATION = 10000;

const getSession = () => {
  const session = localStorage.getItem(SESSION_KEY);
  if (session) {
    const { isAuthenticated, expiry } = JSON.parse(session);
    if (new Date().getTime() < expiry) {
      return { isAuthenticated, expiry };
    }
  }
  return { isAuthenticated: false, expiry: 0 };
};

const saveSession = (isAuthenticated) => {
  const expiry = new Date().getTime() + SESSION_DURATION;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ isAuthenticated, expiry }));
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getSession().isAuthenticated);
  const [showWarning, setShowWarning] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
    saveSession(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(SESSION_KEY);
    console.log('User has been logged out.');
  };

  const extendSession = () => {
    saveSession(true);
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, extendSession, showWarning }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
