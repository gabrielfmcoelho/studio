import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  isAuthenticated as checkAuth, 
  getCurrentUser as getStoredUser, 
  User as ApiUserType,
  login as apiLogin, 
  loginGuest as apiGuestLogin,
  logout as apiLogout,
} from '@/lib/authService';

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
    // On initial load, check the stored auth state
    const authStatus = checkAuth();
    if (authStatus) {
      setUser(getStoredUser());
    }
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password?: string) => {
    setIsLoading(true);
    try { 
      // 1. Call the login service. It handles everything internally.
      await apiLogin(email, password);
      
      // 2. After success, get the now-current user from the service.
      const currentUser = getStoredUser();
      
      console.log("currentUser", currentUser);

      // 3. Update the hook's state.
      setUser(currentUser);
      setIsAuthenticated(true);
      
      // 4. Redirect based on role.
      if (currentUser?.role_id === 1) { // Assuming role_id 1 is admin
          router.push('/admin');
      } else {
          router.push('/hub');
      }
    } catch (error) {
      console.error("Login failed:", error);
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
      // 1. Call the guest login service. It handles tokens and user storage internally.
      await apiGuestLogin();
      
      // 2. After success, get the generic guest user that the service stored.
      const guestUserDetails = getStoredUser();

      // 3. Update the hook's state.
      setUser(guestUserDetails);
      setIsAuthenticated(true);

      // 4. Redirect to the main hub.
      router.push('/hub');
    } catch (error) {
      console.error("Guest login failed:", error);
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
  }, [router]);

  return { isAuthenticated, user, isLoading, login, guestLogin, logout };
};