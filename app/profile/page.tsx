"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type UserProfile = {
  id: string;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
};

export default function ProfilePage() {
  const { user, isLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error(error);
          toast.error("Error fetching profile");
        } else {
          setProfile(data);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchProfile();
    }
  }, [user]);

  if (isLoading || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Email</h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium">Display Name</h3>
            <p className="text-sm text-muted-foreground">
              {profile.display_name || "Not set"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to dashboard
          </Button>
          <Button variant="destructive" onClick={signOut}>
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
