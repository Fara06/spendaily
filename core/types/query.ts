export type MutationParams<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: unknown) => void;
};