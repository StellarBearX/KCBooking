// Formatting utilities
export const formatters = {
  currency: (amount: number, currency: string = "THB"): string => {
    return new Intl.NumberFormat("th-TH", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  },

  phone: (phone: string): string => {
    const cleaned = phone.replace(/[-\s]/g, "");
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  },

  truncate: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  },
};

