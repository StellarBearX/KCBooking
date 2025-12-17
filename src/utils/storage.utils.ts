const STORAGE_KEYS = {
  user: "kcbooking_user",
  bookings: "kcbooking_bookings",
  preferences: "kcbooking_preferences",
} as const;

export const storage = {
  get: <T>(key: keyof typeof STORAGE_KEYS): T | null => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(STORAGE_KEYS[key]);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${key}`, error);
      return null;
    }
  },

  set: <T>(key: keyof typeof STORAGE_KEYS, value: T): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage: ${key}`, error);
    }
  },

  remove: (key: keyof typeof STORAGE_KEYS): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEYS[key]);
    } catch (error) {
      console.error(`Error removing from localStorage: ${key}`, error);
    }
  },

  clear: (): void => {
    if (typeof window === "undefined") return;
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error("Error clearing localStorage", error);
    }
  },
};

