"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (result.error) {
        // Handle common auth errors with user-friendly messages
        if (result.error.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (result.error.message.includes("Email not confirmed")) {
          setError("Please verify your email before logging in.");
        } else {
          setError(result.error.message);
        }
        return;
      }

      toast.success("Login successful");
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <div className="text-sm text-red-500">{error}</div>}
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                Login with Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
