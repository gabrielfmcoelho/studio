import { AUTH_TOKEN_KEY, AUTH_REFRESH_TOKEN_KEY, USER_DETAILS_KEY, API_BASE_URL } from "./constants";
import type { LoginResponse, ApiUser, UserResponseWrapper } from "@/types/api";

// Re-export ApiUser as User for internal consistency
export type User = ApiUser;

// In-memory cache for performance, avoiding repeated localStorage access
let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;
let inMemoryUserDetails: User | null = null;

// --- Private Helper Functions ---

/**
 * Centralized function to set session data in all relevant places:
 * in-memory cache, localStorage, and browser cookies.
 */
const _setSessionData = (tokens: LoginResponse, user?: User): void => {
  const { accessToken, refreshToken } = tokens;

  // 1. Set in-memory cache
  inMemoryAccessToken = accessToken;
  inMemoryRefreshToken = refreshToken;
  
  // 2. Set localStorage (for client-side persistence)
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, refreshToken);

    // 3. Set cookies (for server-side/middleware access)
    // Access token (shorter lifespan)
    document.cookie = `${AUTH_TOKEN_KEY}=${accessToken}; path=/; max-age=3600; Secure; SameSite=Strict`; 
    // Refresh token (longer lifespan)
    document.cookie = `${AUTH_REFRESH_TOKEN_KEY}=${refreshToken}; path=/; max-age=86400; Secure; SameSite=Strict`;
  }

  if (user) {
    storeCurrentUserDetails(user);
  }
};

/**
 * Centralized API error handling.
 */
const _handleApiError = async (response: Response, defaultMessage: string): Promise<Error> => {
  try {
    const errorData = await response.json();
    return new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
  } catch {
    return new Error(defaultMessage);
  }
};

// --- Public API ---

export const login = async (email: string, password?: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // --- DEBUG STEP 1: Log the raw response from the server ---
    // This tells us the status and if the response object itself is valid.
    console.log('DEBUG: Full API Response:', response);

    if (!response.ok) {
      // This part handles server errors (status 4xx, 5xx)
      console.error('DEBUG: API response was not OK.', response.status, response.statusText);
      throw await _handleApiError(response, "Falha ao fazer login. Verifique suas credenciais.");
    }
    
    // --- DEBUG STEP 2: Clone the response to log the body as text ---
    // We clone it because a response body can only be read once.
    const responseText = await response.clone().text();
    console.log('DEBUG: Raw response body (as text):', responseText);

    // Now we try to parse it as JSON
    const tokens = await response.json() as LoginResponse;
    
    // --- DEBUG STEP 3: Log the parsed tokens object ---
    // This will show you if it's undefined or an empty object.
    console.log('DEBUG: Parsed tokens object:', tokens);

    // --- THE FIX: Validate the parsed object ---
    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      console.error('DEBUG: Validation failed. The parsed tokens object is invalid or missing properties.');
      throw new Error("A resposta da autenticação foi inválida ou não continha os tokens necessários.");
    }

    // If validation passes, the rest of the code will run safely.
    console.log('DEBUG: Validation successful. Fetching user details...');
    const user = await fetchUserDetails(tokens.accessToken, email);
    
    _setSessionData(tokens, user);

  } catch (error) {
    // This will catch any error, including network issues or JSON parsing errors.
    console.error('DEBUG: An error occurred in the login function:', error);
    // Re-throw the error so the UI layer can handle it.
    throw error;
  }
};


export const loginGuest = async (): Promise<void> => {
  // You can add the same debugging steps to this function if you use it.
  try {
    const response = await fetch(`${API_BASE_URL}/login-guest`, {
      method: 'POST',
    });

    console.log('DEBUG (Guest): Full API Response:', response);

    if (!response.ok) {
      throw await _handleApiError(response, "Falha ao fazer login como convidado.");
    }
    
    const responseText = await response.clone().text();
    console.log('DEBUG (Guest): Raw response body (as text):', responseText);

    const tokens = await response.json() as LoginResponse;
    console.log('DEBUG (Guest): Parsed tokens object:', tokens);

    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      throw new Error("A resposta da autenticação de convidado foi inválida ou não continha os tokens necessários.");
    }
    
    const guestUser: User = {
      id: 0,
      email: "guest@solude.tech",
      first_name: "Convidado",
      organization_id: 0,
      organization_name: "N/A",
      role_id: 0,
    };

    _setSessionData(tokens, guestUser);
  } catch(error) {
    console.error('DEBUG: An error occurred in the loginGuest function:', error);
    throw error;
  }
};

export const fetchUserDetails = async (token: string, email: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(email)}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    throw await _handleApiError(response, "Falha ao buscar detalhes do usuário.");
  }
  
  const userDataWrapper = await response.json() as UserResponseWrapper;
  return userDataWrapper.data;
};

export const storeCurrentUserDetails = (user: User): void => {
  inMemoryUserDetails = user;
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(user));
  }
};

export const logout = (): void => {
  // Clear all storage locations
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
  inMemoryUserDetails = null;

  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);

    // Expire cookies by setting max-age to 0
    document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0;`;
    document.cookie = `${AUTH_REFRESH_TOKEN_KEY}=; path=/; max-age=0;`;
  }
};

const _getToken = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  
  // Prioritize in-memory cache
  if (key === AUTH_TOKEN_KEY && inMemoryAccessToken) return inMemoryAccessToken;
  if (key === AUTH_REFRESH_TOKEN_KEY && inMemoryRefreshToken) return inMemoryRefreshToken;

  // Fallback to localStorage
  const token = localStorage.getItem(key);
  if (token) {
    if (key === AUTH_TOKEN_KEY) inMemoryAccessToken = token;
    if (key === AUTH_REFRESH_TOKEN_KEY) inMemoryRefreshToken = token;
  }
  return token;
};

export const getAuthToken = (): string | null => _getToken(AUTH_TOKEN_KEY);
export const getRefreshToken = (): string | null => _getToken(AUTH_REFRESH_TOKEN_KEY);

export const isAuthenticated = (): boolean => !!getAuthToken();

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null;
  if (inMemoryUserDetails) return inMemoryUserDetails;

  const userStr = localStorage.getItem(USER_DETAILS_KEY);
  if (!userStr) return null;

  try {
    inMemoryUserDetails = JSON.parse(userStr) as User;
    return inMemoryUserDetails;
  } catch (error) {
    console.error("Failed to parse user details from localStorage", error);
    // Clear corrupted data
    localStorage.removeItem(USER_DETAILS_KEY); 
    return null;
  }
};