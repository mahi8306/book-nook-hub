import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - in production, this would connect to Supabase
const mockUsers: { email: string; password: string; user: User }[] = [
  {
    email: "admin@bookstore.com",
    password: "admin123",
    user: { id: "1", email: "admin@bookstore.com", name: "Admin User", role: "admin" },
  },
  {
    email: "customer@example.com",
    password: "customer123",
    user: { id: "2", email: "customer@example.com", name: "John Doe", role: "customer" },
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const found = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    
    if (found) {
      setUser(found.user);
      return true;
    }
    return false;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Check if user exists
    if (mockUsers.some((u) => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: "customer",
    };
    
    mockUsers.push({ email, password, user: newUser });
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
