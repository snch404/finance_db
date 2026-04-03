'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFinance, Transaction } from '@/context/finance-context';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Plus, Trash2, Edit, Download } from 'lucide-react';
import { AddTransactionModal } from '@/components/add-transaction-modal';

export default function Transactions() {
  const { transactions, deleteTransaction, role } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>(
    'all'
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

  const handleExportCSV = () => {
    const headers = ['ID', 'Description', 'Amount', 'Type', 'Category', 'Date'];
    const csvContent = [
      headers.join(','),
      ...transactions.map((t) =>
        `"${t.id}","${t.description}",${t.amount},"${t.type}","${t.category}","${new Date(t.date).toISOString().split('T')[0]}"`
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  const handleExportJSON = () => {
    const jsonContent = JSON.stringify(transactions, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.json';
    link.click();
  };

  const filteredTransactions = transactions
    .filter((t) => {
      const matchesSearch = t.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
            <p className="text-muted-foreground">
              Manage and track all your financial transactions
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 border-border text-foreground">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer text-foreground">Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportJSON} className="cursor-pointer text-foreground">Export as JSON</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {role === 'admin' && (
              <Button
                onClick={() => {
                  setTransactionToEdit(null);
                  setIsModalOpen(true);
                }}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Plus className="w-4 h-4" />
                Add Transaction
              </Button>
            )}
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">
              All Transactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="w-full sm:w-40 bg-input border-border text-foreground">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions Table */}
            {filteredTransactions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Description
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground">
                        Date
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                        Amount
                      </th>
                      {role === 'admin' && (
                        <th className="text-right py-3 px-4 font-semibold text-muted-foreground">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-border hover:bg-secondary/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-foreground font-medium">
                          {transaction.description}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {transaction.category}
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-semibold ${
                            transaction.type === 'income'
                              ? 'text-green-500'
                              : 'text-red-500'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}$
                          {transaction.amount.toLocaleString()}
                        </td>
                        {role === 'admin' && (
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setTransactionToEdit(transaction);
                                  setIsModalOpen(true);
                                }}
                                className="text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteTransaction(transaction.id)}
                                className="text-red-500 hover:bg-red-500/10 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No transactions found
                </p>
              </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-border mt-6">
              <div>
                <p className="text-xs text-muted-foreground">Total Transactions</p>
                <p className="text-lg font-bold text-foreground">
                  {filteredTransactions.length}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Income</p>
                <p className="text-lg font-bold text-green-500">
                  ${filteredTransactions
                    .filter((t) => t.type === 'income')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Expenses</p>
                <p className="text-lg font-bold text-red-500">
                  ${filteredTransactions
                    .filter((t) => t.type === 'expense')
                    .reduce((sum, t) => sum + t.amount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isModalOpen && role === 'admin' && (
          <AddTransactionModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setTransactionToEdit(null);
            }}
            transactionToEdit={transactionToEdit}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
