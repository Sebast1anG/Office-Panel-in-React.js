import React from "react";

declare module "./AuthContext" {
  export const AuthProvider: React.FC<{ children: React.ReactNode }>;
  export const useAuth: () => {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
    extendSession: () => void;
    showWarning: boolean;
  };
}
