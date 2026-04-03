'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: Date;
}

interface FinanceContextType {
  role: 'admin' | 'viewer';
  setRole: (role: 'admin' | 'viewer') => void;
  isAuthenticated: boolean;
  login: (role: 'admin' | 'viewer') => void;
  logout: () => void;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  editTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<'admin' | 'viewer'>('viewer');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = (selectedRole: 'admin' | 'viewer') => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setRole('viewer');
    setIsAuthenticated(false);
  };

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      description: 'January Salary',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      date: new Date('2026-01-10'),
    },
    {
      id: '2',
      description: 'January Rent',
      amount: 1500,
      type: 'expense',
      category: 'Housing',
      date: new Date('2026-01-12'),
    },
    {
      id: '3',
      description: 'January Groceries',
      amount: 350,
      type: 'expense',
      category: 'Food',
      date: new Date('2026-01-18'),
    },
    {
      id: '4',
      description: 'February Salary',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      date: new Date('2026-02-10'),
    },
    {
      id: '5',
      description: 'February Rent',
      amount: 1500,
      type: 'expense',
      category: 'Housing',
      date: new Date('2026-02-12'),
    },
    {
      id: '6',
      description: 'Electric Bill',
      amount: 145,
      type: 'expense',
      category: 'Utilities',
      date: new Date('2026-02-15'),
    },
    {
      id: '7',
      description: 'March Salary',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      date: new Date('2026-03-10'),
    },
    {
      id: '8',
      description: 'Freelance Design',
      amount: 1200,
      type: 'income',
      category: 'Freelance',
      date: new Date('2026-03-15'),
    },
    {
      id: '9',
      description: 'March Rent',
      amount: 1500,
      type: 'expense',
      category: 'Housing',
      date: new Date('2026-03-12'),
    },
    {
      id: '10',
      description: 'Movie Tickets',
      amount: 45,
      type: 'expense',
      category: 'Entertainment',
      date: new Date('2026-03-20'),
    },
    {
      id: '11',
      description: 'April Salary',
      amount: 5000,
      type: 'income',
      category: 'Salary',
      date: new Date('2026-04-10'),
    },
    {
      id: '12',
      description: 'April Rent',
      amount: 1500,
      type: 'expense',
      category: 'Housing',
      date: new Date('2026-04-12'),
    },
    {
      id: '13',
      description: 'Train Pass',
      amount: 120,
      type: 'expense',
      category: 'Transportation',
      date: new Date('2026-04-14'),
    },
    {
      id: '14',
      description: 'Gym Membership',
      amount: 50,
      type: 'expense',
      category: 'Health',
      date: new Date('2026-04-01'),
    },
  ]);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('finance_transactions_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          const mapped = parsed.map((t: any) => ({ ...t, date: new Date(t.date) }));
          setTransactions(mapped);
        }
      } catch (e) {
        console.error("Failed to parse transactions from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when transactions change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('finance_transactions_v2', JSON.stringify(transactions));
    }
  }, [transactions, isLoaded]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (id: string, updated: Omit<Transaction, 'id'>) => {
    setTransactions(
      transactions.map((t) => (t.id === id ? { ...updated, id } : t))
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        login,
        logout,
        transactions,
        addTransaction,
        deleteTransaction,
        editTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider');
  }
  return context;
}
