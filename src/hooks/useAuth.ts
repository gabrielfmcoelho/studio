import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated as checkAuth, getCurrentUser, User, login as apiLogin, logout as apiLogout } from '@/lib/authService';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
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
    setUser(authStatus ? getCurrentUser() : null);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const loggedInUser = await apiLogin(email, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      router.push('/hub');
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error; // Re-throw to be caught by form
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const logout = useCallback(() => {
    apiLogout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  }, [router]);

  return { isAuthenticated, user, isLoading, login, logout };
};
