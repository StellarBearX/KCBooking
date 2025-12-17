"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { storage } from "@/src/utils/storage.utils";

export interface User {
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
}

interface UserContextType {
  user: User;
  updateUser: (userData: Partial<User>) => void;
  clearUser: () => void;
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
    // Load user data from storage
    const savedUser = storage.get<User>("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => {
      const updated = { ...prev, ...userData };
      storage.set("user", updated);
      return updated;
    });
  };

  const clearUser = () => {
    storage.remove("user");
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
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

