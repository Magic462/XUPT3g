import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import { getCaptcha } from '@/services/captcha';
import { postLogin } from '@/services/login';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captchaData, setCaptchaData] = useState<string>('');
  const [captchaImg, setCaptchaImg] = useState<string>('');
  const [captchaID, setCaptchaID] = useState<string>('');

  const nav = useNavigate();

  const setCaptcha = async () => {
    try {
      const response = await getCaptcha();
      const { captchaID, captchaImage } = response;

      setCaptchaImg(captchaImage);
      setCaptchaID(captchaID);
    } catch (error) {
      console.error('获取验证码失败:', error);
    }
  };

  const refreshCaptcha = () => {
    setCaptchaData('');
    setCaptcha();
  };

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        alert('错误：' + error.response.data.message);
      } else {
        alert('网络错误，请检查您的连接。');
      }
    } else {
      console.error('发生错误:', error);
      alert('发生错误，请重试。');
    }
  };

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await postLogin({
        username,
        password,
        captchaID,
        captchaData,
      });
      // console.log(response);

      // localStorage.setItem('token', response.token);
      // localStorage.setItem('status', response.status);
      // localStorage.setItem('username', response.username);
      // alert('登录成功！');
      if (response.status === '0') {
        nav('/mine/admin/editdonation');
        login(response.token, response.status, response.username);
      } else if (response.status === '1' || response.status === '2') {
        nav('/mine/user/myinfo');
        login(response.token, response.status, response.username);
      }
    } catch (error) {
      handleError(error);
      console.error('请求错误:', error);
      refreshCaptcha();
    }
  };

  useEffect(() => {
    setCaptcha();
  }, []);

  return (
    <div className="card">
      <div className="card2">
        <form className="form">
          <p id="heading">Login</p>
          <div className="field">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
            >
              <path d="M2.76 3.061a.5.5 0 0 1 .679.2l1.283 2.352A8.9 8.9 0 0 1 8 5a8.9 8.9 0 0 1 3.278.613l1.283-2.352a.5.5 0 1 1 .878.478l-1.252 2.295C14.475 7.266 16 9.477 16 12H0c0-2.523 1.525-4.734 3.813-5.966L2.56 3.74a.5.5 0 0 1 .2-.678ZM5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m6 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            </svg>
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              height={16}
              width={16}
              xmlns="http://www.w3.org/2000/svg"
              className="input-icon"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
            </svg>
            <input
              type="text"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="input-icon"
            >
              <path
                fillRule="evenodd"
                d="M8.48 10.901C11.211 10.227 13 7.837 13 5A5 5 0 0 0 3 5c0 2.837 1.789 5.227 4.52 5.901l-.244.487a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224zM4.352 3.356a4 4 0 0 1 3.15-2.325C7.774.997 8 1.224 8 1.5s-.226.496-.498.542c-.95.162-1.749.78-2.173 1.617a.6.6 0 0 1-.52.341c-.346 0-.599-.329-.457-.644"
              />
            </svg>
            <input
              type="text"
              className="input-field"
              placeholder="Vertify"
              value={captchaData}
              onChange={(e) => {
                setCaptchaData(e.target.value);
              }}
            />
            {captchaImg ? (
              <img
                src={captchaImg}
                alt="验证码"
                onClick={refreshCaptcha}
                className="captcha-image"
              />
            ) : (
              <div className="captcha-placeholder">加载中...</div>
            )}
          </div>
          <div className="btn">
            <button className="button1" onClick={handleLogin}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
