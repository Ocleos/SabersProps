import type { ApiError, ApiResult } from '~src/types/apiResult.type';

export const toApiResult = <T>(data: T, error: ApiError | null): ApiResult<T> => {
  if (error) {
    return { data: null, error: { message: error.message }, status: 'error' };
  }

  return { data, error: null, status: 'success' };
};

export const unwrapApiResult = <T>(result: ApiResult<T>): T => {
  if (result.status === 'error') {
    throw new Error(result.error.message);
  }

  return result.data;
};
