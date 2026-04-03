'use client';

import { useRouter } from 'next/navigation';
import { useFinance } from '@/context/finance-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { LayoutDashboard, TrendingUp, ShieldCheck, Eye } from 'lucide-react';

const mockChartData = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 9800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];

export default function LandingPage() {
  const { login } = useFinance();
  const router = useRouter();

  const handleLogin = (role: 'admin' | 'viewer') => {
    login(role);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar */}
      <header className="flex h-16 items-center justify-between px-8 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          <span>Finance<span className="text-primary">Dash</span></span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm" className="font-semibold">
              Login
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleLogin('admin')} className="cursor-pointer gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Login as Admin</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLogin('viewer')} className="cursor-pointer gap-2">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span>Login as Viewer</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 lg:py-24 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          <div className="flex flex-col space-y-8 max-w-2xl text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                Take Control of Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Financial Future</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                The most intuitive and powerful dashboard to track your income, monitor expenses, and analyze spending patterns.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto gap-2 text-base font-semibold"
                onClick={() => handleLogin('admin')}
              >
                <ShieldCheck className="w-5 h-5" />
                Login as Admin
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto gap-2 text-base font-semibold"
                onClick={() => handleLogin('viewer')}
              >
                <Eye className="w-5 h-5" />
                Login as Viewer
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 text-sm text-muted-foreground font-medium">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                Real-time Analytics
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                Secure Roles
              </div>
            </div>
          </div>

          {/* Visual Showcase / Mock Chart */}
          <div className="w-full h-[400px] lg:h-[500px] p-6 rounded-2xl border border-border bg-card/40 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
            <div className="relative h-full w-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Weekly Overview</h3>
                  <p className="text-sm text-muted-foreground">Income vs Expenses</p>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                  <span className="h-3 w-3 rounded-full bg-blue-400" />
                  <span className="h-3 w-3 rounded-full bg-muted" />
                </div>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockChartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value: number) => `$${value}`} />
                    <Tooltip 
                      cursor={{fill: 'hsl(var(--accent))', opacity: 0.2}}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                      itemStyle={{ color: 'hsl(var(--foreground))' }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                    />
                    <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
