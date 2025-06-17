// src/components/layout/SidebarLogo.tsx
import Link from 'next/link';
import Logo from '@/components/icons/Logo';

export function SidebarLogo() {
  return (
    <Link href="/hub" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
      {/* Hidden when sidebar is open, visible when collapsed to icon */}
      <Logo iconOnly className="hidden group-data-[collapsible=icon]:block" />
      
      {/* Visible when sidebar is open, hidden when collapsed */}
      <Logo className="block group-data-[collapsible=icon]:hidden" />
    </Link>
  );
}