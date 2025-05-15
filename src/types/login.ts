export interface LoginRequest {
  username: string;
  password: string;
  captchaID: string;
  captchaData: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  username: string;
}
