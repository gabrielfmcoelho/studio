// This file can be used to wrap multiple context providers.
// For now, it's a simple pass-through, but can be expanded.
// For example, if we add React Query, its Provider would go here.

"use client";

import React from 'react';

// No actual providers needed for now as useAuth is a simple hook
// If we had a global AuthContext, it would be here.
// Example:
// import { AuthProvider } from '@/contexts/AuthContext'; // Assuming AuthContext exists
// export function AppProviders({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthProvider>
//       {children}
//     </AuthProvider>
//   );
// }

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
