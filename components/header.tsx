'use client';

import { useFinance } from '@/context/finance-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { role, logout } = useFinance();
  const [isDark, setIsDark] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-8">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Welcome back</h2>
        <p className="text-sm text-muted-foreground">Here&apos;s your financial overview</p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 cursor-default hover:bg-background"
          >
            <User className="w-4 h-4" />
            <span className="capitalize">{role}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-muted-foreground hover:text-red-400" />
          </Button>
        </div>
      </div>
    </header>
  );
}
