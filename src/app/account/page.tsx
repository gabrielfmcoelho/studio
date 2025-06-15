"use client"; // This page will likely have forms and client-side interactions

import AuthenticatedPageLayout from '@/components/layout/AuthenticatedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

const accountSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  // Add other fields like currentPassword, newPassword, confirmPassword if implementing password change
});
type AccountFormValues = z.infer<typeof accountSchema>;

const notificationsSchema = z.object({
  emailNotifications: z.boolean().default(false),
  pushNotifications: z.boolean().default(false),
});
type NotificationsFormValues = z.infer<typeof notificationsSchema>;


export default function AccountPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isProfileSaving, setIsProfileSaving] = useState(false);
  const [isNotificationSaving, setIsNotificationSaving] = useState(false);

  const profileForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    values: { // Use values instead of defaultValues to react to user changes
      name: user?.name || "",
      email: user?.email || "",
    },
    disabled: authLoading,
  });

  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsSchema),
    // Default values would be fetched from user preferences
    defaultValues: {
        emailNotifications: true,
        pushNotifications: false,
    },
  });


  const onProfileSubmit = async (data: AccountFormValues) => {
    setIsProfileSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Profile updated:", data);
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
    setIsProfileSaving(false);
  };
  
  const onNotificationsSubmit = async (data: NotificationsFormValues) => {
    setIsNotificationSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Notifications settings updated:", data);
    toast({ title: "Notifications Updated", description: "Your notification preferences have been saved." });
    setIsNotificationSaving(false);
  };

  if (authLoading) {
    return (
      <AuthenticatedPageLayout pageTitle="My Account">
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AuthenticatedPageLayout>
    );
  }


  return (
    <AuthenticatedPageLayout pageTitle="My Account">
      <div className="space-y-8 max-w-3xl mx-auto">
        {/* Profile Information Card */}
        <Card className="shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details and email address.</CardDescription>
          </CardHeader>
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                    <AvatarImage src={user?.name ? `https://avatar.vercel.sh/${user.name}.png` : `https://avatar.vercel.sh/default.png`} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                    <Button type="button" variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-background hover:bg-muted">
                        <Camera size={16} />
                        <span className="sr-only">Change avatar</span>
                    </Button>
                </div>
                <div className="flex-grow space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...profileForm.register("name")} className="bg-input" />
                    {profileForm.formState.errors.name && <p className="text-sm text-destructive">{profileForm.formState.errors.name.message}</p>}
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...profileForm.register("email")} className="bg-input" />
                {profileForm.formState.errors.email && <p className="text-sm text-destructive">{profileForm.formState.errors.email.message}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isProfileSaving}>
                {isProfileSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Profile
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Notification Settings Card */}
        <Card className="shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Manage how you receive notifications from Solude Platform.</CardDescription>
          </CardHeader>
          <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)}>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Receive updates and alerts via email.
                    </span>
                    </Label>
                    <Switch
                        id="emailNotifications"
                        checked={notificationsForm.watch("emailNotifications")}
                        onCheckedChange={(checked) => notificationsForm.setValue("emailNotifications", checked)}
                    />
                </div>
                <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                    <Label htmlFor="pushNotifications" className="flex flex-col space-y-1">
                    <span>Push Notifications</span>
                    <span className="font-normal leading-snug text-muted-foreground">
                        Get real-time alerts on your device (if supported).
                    </span>
                    </Label>
                     <Switch
                        id="pushNotifications"
                        checked={notificationsForm.watch("pushNotifications")}
                        onCheckedChange={(checked) => notificationsForm.setValue("pushNotifications", checked)}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" disabled={isNotificationSaving}>
                    {isNotificationSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Preferences
                </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Security Settings Card Placeholder */}
        <Card className="shadow-md bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your password and two-factor authentication.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Change Password</Button>
            {/* Placeholder for 2FA setup */}
          </CardContent>
        </Card>
      </div>
    </AuthenticatedPageLayout>
  );
}
