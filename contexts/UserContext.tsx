"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
}

interface UserContextType {
  user: User;
  updateUser: (userData: Partial<User>) => void;
}

const defaultUser: User = {
  name: "สมชาย ใจดี",
  email: "somchai@example.com",
  phone: "081-234-5678",
  profileImage: null,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    // Load user data from localStorage if available
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev, ...userData };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

