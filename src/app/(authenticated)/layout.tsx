import AuthenticatedHeader from "@/components/layout/AuthenticatedHeader";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <AuthenticatedHeader />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}