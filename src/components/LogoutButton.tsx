'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { logoutAction } from '@/actions/authActions';
import { Loader2, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logoutAction();
        // The redirect happens in the server action, but we can still show a toast.
        toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
      } catch (error) {
        console.error("Logout error:", error);
        toast({ title: 'Logout Failed', description: 'Could not log out. Please try again.', variant: 'destructive' });
      }
    });
  };

  return (
    <Button variant="outline" onClick={handleLogout} disabled={isPending}>
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
      Logout
    </Button>
  );
}
