'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { SummaryCard } from '@/components/summary-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinance } from '@/context/finance-context';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, TrendingUp, Wallet, PieChart as PieIcon } from 'lucide-react';

const lineChartData = [
  { month: 'Jan', income: 4000, expense: 2400 },
  { month: 'Feb', income: 3000, expense: 1398 },
  { month: 'Mar', income: 2000, expense: 9800 },
  { month: 'Apr', income: 2780, expense: 3908 },
  { month: 'May', income: 1890, expense: 4800 },
  { month: 'Jun', income: 2390, expense: 3800 },
];

const pieChartData = [
  { name: 'Food', value: 235 },
  { name: 'Housing', value: 1500 },
  { name: 'Transportation', value: 400 },
  { name: 'Entertainment', value: 150 },
  { name: 'Utilities', value: 180 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

export default function Overview() {
  const { transactions, role } = useFinance();

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Balance"
            value={`$${balance.toLocaleString()}`}
            change={12}
            trend="up"
            icon={<DollarSign className="w-5 h-5" />}
          />
          <SummaryCard
            title="Total Income"
            value={`$${totalIncome.toLocaleString()}`}
            change={8}
            trend="up"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <SummaryCard
            title="Total Expenses"
            value={`$${totalExpense.toLocaleString()}`}
            change={-5}
            trend="down"
            icon={<Wallet className="w-5 h-5" />}
          />
          <SummaryCard
            title="Transactions"
            value={transactions.length}
            icon={<PieIcon className="w-5 h-5" />}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Income vs Expense Chart */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Income vs Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.20 0 0)" />
                  <XAxis stroke="oklch(0.65 0 0)" />
                  <YAxis stroke="oklch(0.65 0 0)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.12 0 0)',
                      border: '1px solid oklch(0.20 0 0)',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'oklch(0.95 0 0)' }}
                    itemStyle={{ color: 'oklch(0.95 0 0)' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="oklch(0.55 0.2 262)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="oklch(0.55 0.2 27)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Expense Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'oklch(0.12 0 0)',
                      border: '1px solid oklch(0.20 0 0)',
                      borderRadius: '8px',
                      color: 'oklch(0.95 0 0)',
                    }}
                    itemStyle={{ color: 'oklch(0.95 0 0)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>


      </div>
    </DashboardLayout>
  );
}
