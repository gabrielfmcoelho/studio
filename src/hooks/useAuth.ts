
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  isAuthenticated as checkAuth, 
  getCurrentUser as getStoredUser, 
  User as ApiUserType, // Renamed to avoid conflict if User is defined locally
  login as apiLogin, 
  loginGuest as apiGuestLogin,
  logout as apiLogout,
  fetchUserDetails,
  storeCurrentUserDetails
} from '@/lib/authService';
import type { LoginResponse } from '@/types/api';

// Use ApiUserType as the type for user state
export type User = ApiUserType;

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  guestLogin: () => Promise<void>;
  logout: () => void;
}

export const useAuth = (): AuthState => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
    if (authStatus) {
      setUser(getStoredUser());
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const tokens: LoginResponse = await apiLogin(email, password);
      if (tokens.accessToken) {
        const userDetails = await fetchUserDetails(tokens.accessToken, email);
        storeCurrentUserDetails(userDetails);
        setUser(userDetails);
        setIsAuthenticated(true);
        // Check user role for admin redirect
        if (userDetails.role_id === 1) { // Assuming role_id 1 is admin
            router.push('/admin');
        } else {
            router.push('/hub');
        }
      } else {
        throw new Error("Login falhou, tokens não recebidos.");
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const guestLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      const tokens: LoginResponse = await apiGuestLogin();
      if (tokens.accessToken) {
        // For guests, user details might be generic or not fetched separately
        // authService.loginGuest already stores a generic guest user.
        const guestUserDetails = getStoredUser(); // Retrieve the generic guest user
        setUser(guestUserDetails);
        setIsAuthenticated(true);
        router.push('/hub');
      } else {
        throw new Error("Login como convidado falhou, tokens não recebidos.");
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [router]);


  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
    router.refresh();
  }, [router]);

  return { isAuthenticated, user, isLoading, login, guestLogin, logout };
};
