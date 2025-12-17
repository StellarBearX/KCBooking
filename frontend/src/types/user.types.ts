export interface User {
  id?: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  language: "th" | "en";
  notifications: boolean;
  theme: "light" | "dark";
}

