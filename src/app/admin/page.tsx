import AuthenticatedPageLayout from '@/components/layout/AuthenticatedPageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, Settings, FileText } from 'lucide-react';

export default function AdminPage() {
  const adminStats = [
    { title: "Total Users", value: "1,234", icon: Users, color: "text-primary" },
    { title: "Active Solutions", value: "42", icon: FileText, color: "text-green-500" },
    { title: "Platform Health", value: "Optimal", icon: Settings, color: "text-yellow-500" },
    { title: "API Calls Today", value: "150,K+", icon: BarChart, color: "text-indigo-500" },
  ];

  return (
    <AuthenticatedPageLayout pageTitle="Admin Dashboard">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Admin!</h1>
          <p className="text-muted-foreground">Manage your Solude Platform instance from here.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Manage landing pages, team members, and solution details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Placeholder for content management tools.</p>
                    {/* Example: Link to manage solutions, users etc. */}
                </CardContent>
            </Card>
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>Configure platform-wide settings and integrations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Placeholder for system configuration options.</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </AuthenticatedPageLayout>
  );
}
