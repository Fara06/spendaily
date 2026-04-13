export type DefaultRes<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
};