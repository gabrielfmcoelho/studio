
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ApiUser {
  id: number; // Changed from string to number based on PublicUser definition
  email: string;
  first_name: string; // Matches PublicUser
  organization_id: number;
  organization_name: string;
  role_id: number;
}

// Matches domain.PublicUser, but using 'name' as primary name field for consistency
// if domain.PublicUser.first_name is the primary display name, we'll use that.
// For now, adding a generic name property that can be populated from first_name.
export interface UserProfile extends ApiUser {
  name: string; // Convenience property, can be derived from first_name
}


export interface HubService {
  description: string;
  icon_url: string | null; // Can be null if no icon
  id: number;
  last_update: string;
  name: string;
  price: number;
  screenshot_url: string | null; // Can be null
  status: string;
  tags: string[];
  // Assuming 'url' for SolutionCard similar to app_url from PublicService
  // This might need to be constructed or come from another field if not directly available
  app_url?: string; 
}

export interface ApiErrorResponse {
  message: string;
}

// For the /user/{identifier} endpoint response (data wrapper)
export interface UserResponseWrapper {
  data: ApiUser;
  message?: string; // Optional message field
}
