export interface ServerRespone<T = undefined> {
  success: boolean;
  msg?: string;
  result?: T;
}
