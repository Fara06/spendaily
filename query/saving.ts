/** @format */

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/core/utils/service";
import { MutationParams } from "@/core/types/query";

export type SavingsTarget = {
  id: number;
  user_id: number;
  title: string;
  target_amount: number;
  daily_limit: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
};

export type Reminder = {
    id: number;
    user_id: number;
    title: string;
    description: string;
    remind_time: string;
    frequency: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
};

export const useGetSavingsTarget = () => {
  return useQuery({
    queryKey: ["savings-targets"],
    queryFn: async () => {
      const res = await api.get<SavingsTarget[]>("/savings-targets");
      return res.data;
    },
  });
};

export const useCreateSavingsTarget = (props?: MutationParams<SavingsTarget>) => {
  return useMutation({
    mutationFn: async (params: {
      title: string;
      target_amount: number;
      daily_limit: number;
      start_date: string;
      end_date: string;
    }) => {
      const res = await api.post<SavingsTarget>("/savings-targets", params);
      return res.data;
    },
    ...props,
  });
};

export const useUpdateSavingsTarget = (props?: MutationParams<SavingsTarget>) => {
  return useMutation({
    mutationFn: async (params: {
      id: number;
      title: string;
      target_amount: number;
      daily_limit: number;
      start_date: string;
      end_date: string;
    }) => {
      const { id, ...rest } = params;
      const res = await api.put<SavingsTarget>(`/savings-targets/${id}`, rest);
      return res.data;
    },
    ...props,
  });
};

export const useDeleteSavingsTarget = (props?: MutationParams<{ message: string }>) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/savings-targets/${id}`);
      return res.data;
    },
    ...props,
  });
};

export const useGetStreak = () => {
  return useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      const res = await api.get<{ streak: number }>("/transactions/streak");
      return res.data;
    },
  });
};

export const useGetReminders = () => {
    return useQuery({
        queryKey: ["reminders"],
        queryFn: async () => {
            const res = await api.get<Reminder[]>("/reminders");
            return res.data;
        },
    });
};

export const useToggleReminder = (props?: MutationParams<Reminder>) => {
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.patch<Reminder>(`/reminders/${id}/toggle`);
            return res.data;
        },
        ...props,
    });
};