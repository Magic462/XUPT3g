import axiosInstance from './index';
import type { AxiosRequestConfig } from 'axios';

export function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig & { customAuth?: boolean }
): Promise<T> {
  return axiosInstance.get(url, config);
}

export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig & { customAuth?: boolean }
): Promise<T> {
  const isFormData = data instanceof FormData;

  return axiosInstance.post(url, data, {
    ...config,
    headers: {
      ...(config?.headers || {}),
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    },
  });
}

export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig & { customAuth?: boolean }
): Promise<T> {
  return axiosInstance.put(url, data, config);
}

export function del<T = unknown>(
  url: string,
  config?: AxiosRequestConfig & { customAuth?: boolean }
): Promise<T> {
  return axiosInstance.delete(url, config);
}
