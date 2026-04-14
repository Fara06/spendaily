
import { useQuery } from "@tanstack/react-query";
import { api } from "@/core/utils/service";

export type SpendingByCategory = {
  category_id: number;
  category_name: string;
  category_icon: string;
  total: number;
};

export type SpendingByTime = {
  period: "dawn" | "day" | "evening" | "night" | "midnight";
  total: number;
  percent: number;
};

export type TopSpend = {
  category_id: number;
  category_name: string;
  category_icon: string;
  total: number;
};

export type SavingsTip = {
  tip: string;
};

export const useGetSpendingByCategory = (period: "monthly" | "weekly" | "yearly" = "monthly") => {
  return useQuery({
    queryKey: ["spending-by-category", period],
    queryFn: async () => {
      const res = await api.get<SpendingByCategory[]>(`/insights/spending-by-category?period=${period}`);
      return res.data;
    },
  });
};

export const useGetSpendingByTime = (period: "monthly" | "weekly" | "yearly" = "monthly") => {
  return useQuery({
    queryKey: ["spending-by-time", period],
    queryFn: async () => {
      const res = await api.get<SpendingByTime[]>(`/insights/spending-by-time?period=${period}`);
      return res.data;
    },
  });
};

export const useGetTopSpends = (period: "weekly" | "monthly" | "yearly" = "weekly") => {
  return useQuery({
    queryKey: ["top-spends", period],
    queryFn: async () => {
      const res = await api.get<TopSpend[]>(`/insights/top-spends?period=${period}`);
      return res.data;
    },
  });
};

export const useGetSavingsTip = () => {
  return useQuery({
    queryKey: ["savings-tip"],
    queryFn: async () => {
      const res = await api.get<SavingsTip>("/insights/savings-tip");
      return res.data;
    },
  });
};