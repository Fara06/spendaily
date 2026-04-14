/** @format */

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/core/utils/service";
import { MutationParams } from "@/core/types/query";
import { useQueryClient } from "@tanstack/react-query";

export type Mission = {
  id: number;
  title: string;
  description: string;
  type: string;
  target_value: number;
  duration: number;
  reward_points: number;
  color: string;
  icon: string;
  is_featured: boolean;
  is_flash: boolean;
  estimated_saving: number;
  participants_count: number;
  progress?: number;
  progress_percentage?: number;
  status?: string;
  is_claimed?: boolean;
  created_at: string;
  updated_at: string;
};

export type UserMission = {
  id: number;
  user_id: number;
  mission_id: number;
  start_date: string;
  end_date: string;
  progress: number;
  status: "in_progress" | "completed" | "failed";
  is_claimed: boolean;
  created_at: string;
  updated_at: string;
};

export type UserMissionWithDetail = UserMission & {
  mission: Mission;
};


export const useGetMissions = (p0: string) => {
  return useQuery({
    queryKey: ["missions"],
    queryFn: async () => {
      const res = await api.get<Mission[]>("/missions");
      return res.data;
    },
  });
};

export const useGetFeaturedMissions = () => {
  return useQuery({
    queryKey: ["missions", "featured"],
    queryFn: async () => {
      const res = await api.get<Mission[]>("/missions?is_featured=1");
      return res.data;
    },
  });
};

export const useGetFlashMissions = () => {
  return useQuery({
    queryKey: ["missions", "flash"],
    queryFn: async () => {
      const res = await api.get<Mission[]>("/missions?is_flash=1");
      return res.data;
    },
  });
};

export const useGetMissionById = (id: number) => {
  return useQuery({
    queryKey: ["missions", id],
    queryFn: async () => {
      const res = await api.get<Mission>(`/missions/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};


export const useGetUserMissions = () => {
  return useQuery({
    queryKey: ["user-missions"],
    queryFn: async () => {
      const res = await api.get<UserMissionWithDetail[]>("/user-missions");
      return res.data;
    },
  });
};

export const useGetActiveMissions = () => {
  return useQuery({
    queryKey: ["user-missions", "active"],
    queryFn: async () => {
      const res = await api.get<UserMissionWithDetail[]>(
        "/user-missions?status=in_progress",
      );
      return res.data;
    },
  });
};

export const useGetCompletedMissions = () => {
  return useQuery({
    queryKey: ["user-missions", "completed"],
    queryFn: async () => {
      const res = await api.get<UserMissionWithDetail[]>(
        "/user-missions?status=completed",
      );
      return res.data;
    },
  });
};

export const useGetUserMissionById = (id: number) => {
  return useQuery({
    queryKey: ["user-missions", id],
    queryFn: async () => {
      const res = await api.get<UserMissionWithDetail>(`/user-missions/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};


export const useStartMission = (props?: MutationParams<UserMission>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mission_id: number) => {
      const res = await api.post<UserMission>("/user-missions", { mission_id });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-missions"] });
      queryClient.invalidateQueries({ queryKey: ["user-missions", "active"] });
    },
    ...props,
  });
};

export const useUpdateMissionProgress = (
  props?: MutationParams<UserMission>,
) => {
  return useMutation({
    mutationFn: async (params: { id: number; progress: number }) => {
      const { id, ...rest } = params;
      const res = await api.patch<UserMission>(
        `/user-missions/${id}/progress`,
        rest,
      );
      return res.data;
    },
    ...props,
  });
};

export const useVerifyMissionDay = (props?: MutationParams<UserMission>) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.patch<UserMission>(`/user-missions/${id}/verify`);
      return res.data;
    },
    ...props,
  });
};

export const useClaimMissionReward = (props?: MutationParams<UserMission>) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.patch<UserMission>(`/user-missions/${id}/claim`);
      return res.data;
    },
    ...props,
  });
};

export const useAbandonMission = (
  props?: MutationParams<{ message: string }>,
) => {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.patch<{ message: string }>(
        `/user-missions/${id}/abandon`,
      );
      return res.data;
    },
    ...props,
  });
};
