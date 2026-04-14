/** @format */

import { useMutation } from "@tanstack/react-query";
import { api, local } from "@/core/utils/service";
import { MutationParams } from "@/core/types/query";
import Cookies from "js-cookie";

export type UserData = {
  id: number;
  name: string;
  email: string;
  google_id?: string | null;
  avatar?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type AuthRes = {
  message: string;
  user: UserData;
  token: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};



export const useLogin = (props?: MutationParams<AuthRes>) => {
  return useMutation({
    mutationFn: async (params: LoginParams) => {
      const res = await api.post<AuthRes>("/auth/login", params);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      Cookies.set("token", res.data.token, { expires: 7 });
      return res.data;
    },
    ...props,
  });
};

export const useRegister = (props?: MutationParams<AuthRes>) => {
  return useMutation({
    mutationFn: async (params: RegisterParams) => {
      const res = await api.post<AuthRes>("/auth/register", params);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      Cookies.set("token", res.data.token, { expires: 7 });
      return res.data;
    },
    ...props,
  });
};

export const useLogout = (props?: MutationParams<{ message: string }>) => {
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Cookies.remove("token");
      return res.data;
    },
    ...props,
  });
};

export const loginWithGoogle = async () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};
