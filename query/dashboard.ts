/** @format */

import { useQuery } from "@tanstack/react-query";
import { api } from "@/core/utils/service";

export type UserData = {
  id: number;
  name: string;
  email: string;
  google_id?: string | null;
  avatar?: string | null;
};

export type TransactionSummary = {
  period: string;
  label: string;
  total_income: number;
  total_expense: number;
  balance: number;
  transactions: Transaction[];
};

export type Transaction = {
  id: number;
  user_id: number;
  category_id: number;
  type: "income" | "expense";
  amount: string;
  transaction_time: string;
  source: string;
  note: string | null;
  created_at: string;
  updated_at: string;
};

export type Habit = {
  id: number;
  user_id: number;
  habit_type: "good" | "bad";
  title: string;
  description: string;
  score: number;
  detected_at: string;
  created_at: string;
  updated_at: string;
};

export type SavingsTarget = {
  id: number;
  user_id: number;
  target_amount: number;
  daily_limit: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get<UserData>("/user");
      return res.data;
    },
  });
};

export const useGetTransactionSummary = (
  period: "monthly" | "weekly" | "yearly" = "monthly",
) => {
  return useQuery({
    queryKey: ["transactions-summary", period],
    queryFn: async () => {
      const res = await api.get<TransactionSummary>(
        `/transactions/summary?period=${period}`,
      );
      return res.data;
    },
  });
};

export const useGetTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await api.get<Transaction[]>("/transactions");
      return res.data;
    },
  });
};

export const useGetHabits = () => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: async () => {
      const res = await api.get<Habit[]>("/habits");
      return res.data;
    },
  });
};

export const useGetSavingsTarget = () => {
  return useQuery({
    queryKey: ["savings-target"],
    queryFn: async () => {
      const res = await api.get<SavingsTarget>("/savings-target");
      return res.data;
    },
  });
};
