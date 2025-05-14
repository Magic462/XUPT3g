import axiosInstance from './index';
import type { AxiosRequestConfig } from 'axios';

// 封装通用请求方法，自动支持泛型
export function get<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return axiosInstance.get(url, config);
}

export function post<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  return axiosInstance.post(url, data, config);
}

export function put<T = unknown>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  return axiosInstance.put(url, data, config);
}

export function del<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  return axiosInstance.delete(url, config);
}
