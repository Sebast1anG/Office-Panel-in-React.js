import React from "react";

declare module "./AuthContext" {
  export const AuthProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => JSX.Element;
  export const useAuth: () => {
    isAuthenticated: boolean;
    login: (role: string) => void;
    logout: () => void;
    extendSession: () => void;
    showWarning: boolean;
    role: string | null;
  };
}
