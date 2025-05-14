import 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    customAuth?: boolean;
  }

  interface InternalAxiosRequestConfig {
    customAuth?: boolean;
  }
}
