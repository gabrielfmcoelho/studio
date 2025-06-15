
import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY, USER_DETAILS_KEY, API_BASE_URL } from "./constants";
import type { LoginResponse, ApiUser, UserResponseWrapper } from "@/types/api";

// Re-export ApiUser as User for internal consistency if needed, or use ApiUser directly
export type User = ApiUser;

// Store tokens in a variable to avoid repeated localStorage access in the same session for performance
let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;
let inMemoryUserDetails: User | null = null;


export const login = async (email: string, password?: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Falha ao fazer login. Verifique suas credenciais." }));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  }

  const tokens = await response.json() as LoginResponse;
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
  inMemoryAccessToken = tokens.accessToken;
  inMemoryRefreshToken = tokens.refreshToken;
  return tokens;
};

export const loginGuest = async (): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/login-guest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Guest login might not need a body, or might send IP implicitly.
    // API docs specify no parameters for guest login in body.
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Falha ao fazer login como convidado." }));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  }
  const tokens = await response.json() as LoginResponse;
    if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
  inMemoryAccessToken = tokens.accessToken;
  inMemoryRefreshToken = tokens.refreshToken;
  // For guest, user details might be minimal or a generic guest profile
  // Store a generic guest user for now if API doesn't provide one immediately
  const guestUser: User = {
    id: 0, // Or a specific guest ID
    email: "guest@solude.tech",
    first_name: "Convidado",
    organization_id: 0, // Or a default guest org
    organization_name: "N/A",
    role_id: 0, // Guest role
  };
  storeCurrentUserDetails(guestUser);
  return tokens;
}

export const fetchUserDetails = async (token: string, email: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(email)}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
        throw new Error("Usuário não encontrado.");
    }
    const errorData = await response.json().catch(() => ({ message: "Falha ao buscar detalhes do usuário." }));
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  }
  const userDataWrapper = await response.json() as UserResponseWrapper;
  return userDataWrapper.data; 
};

export const storeCurrentUserDetails = (user: User): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(user));
  }
  inMemoryUserDetails = user;
}

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);
  }
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
  inMemoryUserDetails = null;
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  if (inMemoryAccessToken) return inMemoryAccessToken;
  inMemoryAccessToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return inMemoryAccessToken;
};

export const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  if (inMemoryRefreshToken) return inMemoryRefreshToken;
  inMemoryRefreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY);
  return inMemoryRefreshToken;
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  if (inMemoryUserDetails) return inMemoryUserDetails;
  
  const userStr = localStorage.getItem(USER_DETAILS_KEY);
  if (userStr) {
    try {
      inMemoryUserDetails = JSON.parse(userStr) as User;
      return inMemoryUserDetails;
    } catch (error) {
      console.error("Failed to parse user details from localStorage", error);
      return null;
    }
  }
  return null;
};
