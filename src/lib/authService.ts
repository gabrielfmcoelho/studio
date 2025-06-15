import { AUTH_TOKEN_KEY } from "./constants";

// Mock user type
export interface User {
  id: string;
  email: string;
  name: string;
}

// Store token in a variable to avoid repeated localStorage access in the same session
let inMemoryToken: string | null = null;

export const login = async (email: string, _password?: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  if (email === "admin@solude.tech" || email === "user@solude.tech") {
    const mockUser: User = {
      id: email === "admin@solude.tech" ? "admin123" : "user123",
      email,
      name: email === "admin@solude.tech" ? "Admin User" : "Regular User",
    };
    const token = `mock-token-${mockUser.id}-${Date.now()}`;
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem("soludeUser", JSON.stringify(mockUser));
    }
    inMemoryToken = token;
    return mockUser;
  }
  throw new Error("Invalid credentials");
};

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem("soludeUser");
  }
  inMemoryToken = null;
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  if (inMemoryToken) return inMemoryToken;
  inMemoryToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return inMemoryToken;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const userStr = localStorage.getItem("soludeUser");
  if (userStr) {
    try {
      return JSON.parse(userStr) as User;
    } catch (error) {
      return null;
    }
  }
  return null;
};
