export type ApiError = {
  message: string;
};

export type ApiResult<T> =
  | { data: T; error: null; status: 'success' }
  | { data: null; error: ApiError; status: 'error' };
