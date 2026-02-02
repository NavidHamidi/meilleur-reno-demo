export interface APIResponse<T> {
  ok: boolean;
  data: T;
  message: string;
}
