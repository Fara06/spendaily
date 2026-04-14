import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/core/utils/service";
import { MutationParams } from "@/core/types/query";

export type Reminder = {
  id: number;
  user_id: number;
  title: string;
  description?: string;
  remind_time: string;
  frequency: "daily" | "weekly" | "monthly";
  is_active: boolean;
  last_sent_at?: string | null;
  created_at: string;
  updated_at: string;
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

export const useCreateReminder = (props?: MutationParams<Reminder>) => {
  return useMutation({
    mutationFn: async (params: {
      title: string;
      description?: string;
      remind_time: string;
      frequency: "daily" | "weekly" | "monthly";
    }) => {
      const res = await api.post<Reminder>("/reminders", params);
      return res.data;
    },
    ...props,
  });
};


export const useUpdateReminder = (props?: MutationParams<Reminder>) => {
  return useMutation({
    mutationFn: async (params: {
      id: number;
      title: string;
      description?: string;
      remind_time: string;
      frequency: "daily" | "weekly" | "monthly";
    }) => {
      const { id, ...rest } = params;
      const res = await api.put<Reminder>(`/reminders/${id}`, rest);
      return res.data;
    },
    ...props,
  });
};

export const useDeleteReminder = (
  props?: MutationParams<{ message: string }>,
) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.delete(`/reminders/${id}`);
      return res.data;
    },
    ...props,
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
