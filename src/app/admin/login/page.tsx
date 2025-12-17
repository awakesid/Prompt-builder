'use client';

import { useState, useTransition } from 'react';
// useRouter is no longer needed for successful login redirect
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { loginAction } from '@/actions/authActions';
import { Loader2, LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    startTransition(async () => {
      try {
        // loginAction will either redirect or return an error object
        const result = await loginAction(formData);

        // If loginAction returns, it means there was an error
        if (result?.error) {
          setError(result.error);
          toast({ title: 'Login Failed', description: result.error, variant: 'destructive' });
        }
        // If login was successful, loginAction would have called redirect(),
        // and this part of the client code would be bypassed or the component would unmount.
      } catch (e: any) {
        // This catch block handles errors thrown by redirect() or other unexpected action errors.
        // The NEXT_REDIRECT error is special and signals Next.js to perform the redirect.
        // We only want to show a toast for other types of errors.
        if (e.digest?.startsWith('NEXT_REDIRECT')) {
          // This is the expected error type for redirects, let Next.js handle it.
          // console.log("Redirecting..."); // Optional: for debugging
        } else {
          console.error("Login submission error:", e);
          setError("An unexpected error occurred. Please try again.");
          toast({ title: "Error", description: "An unexpected error occurred during login.", variant: "destructive" });
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isPending}
              />
            </div>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
