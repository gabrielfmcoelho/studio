import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import Logo from '@/components/icons/Logo';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserPlus } from 'lucide-react';

// This is a placeholder page. In a real app, you'd have a form and logic similar to LoginForm.
export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <MainHeader />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-md animate-fade-in">
          <CardHeader className="text-center space-y-4">
             <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Create an Account</CardTitle>
            <CardDescription className="text-muted-foreground">
              Join Solude Platform and start transforming your business today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="John Doe" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" className="bg-input" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" className="bg-input" />
                </div>
                <Button type="submit" className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
