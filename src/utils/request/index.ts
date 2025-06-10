import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { message } from '@/utils/message';

// 创建axios实例
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://10csqn6268959.vicp.fun',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig & { customAuth?: boolean }) => {
    const token = localStorage.getItem('token');

    // 只有明确标记了customAuth才添加token
    if (token && config.customAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err: AxiosError) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code, data, message: msg } = res.data;
    switch (code) {
      case 200:
        return data;
      case 401:
        message.warning('登录失效，请重新登录');
        localStorage.removeItem('token');
        localStorage.removeItem('status');
        localStorage.removeItem('username');
        window.location.href = '/login';
        return Promise.reject(res.data);
      default:
        message.error(msg || '请求失败');
        return Promise.reject(res.data);
    }
  },
  (err: AxiosError) => {
    message.error(onErrorReason(err.message));
    return Promise.reject(err);
  }
);

// 错误消息转中文
function onErrorReason(message: string): string {
  if (message.includes('Network Error')) return '网络异常，请检查网络情况!';
  if (message.includes('timeout')) return '请求超时，请重试!';
  return '服务异常，请重试!';
}

export default axiosInstance;
