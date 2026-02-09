import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import { getCaptcha } from '@/services/captcha';
import { postLogin } from '@/services/login';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/assets/images/3Glogo.png';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captchaData, setCaptchaData] = useState<string>('');
  const [captchaImg, setCaptchaImg] = useState<string>('');
  const [captchaID, setCaptchaID] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const handleError = (error: unknown) => {
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
          <p id="heading">
            {/* <img src={Logo} alt="3G Logo" /> */}
            <p>XUPT3g</p>
          </p>
          <div className="field">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8136"
              width="20"
              height="20"
            >
              <path
                d="M626.24 559.04a262.72 262.72 0 1 0-242.56 0C96 631.04 82.56 955.2 82.56 960l64 1.92c0-14.4 14.72-352 358.4-352s371.52 339.2 372.48 353.6l64-4.48c-0.32-4.8-25.92-328-315.2-400z m-320-232.64a198.72 198.72 0 1 1 198.72 198.4 198.72 198.72 0 0 1-198.72-198.4z"
                p-id="8137"
                fill="#ffffff"
              ></path>
            </svg>
            <div className="content-field">
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
          </div>
          <div className="field">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5587"
              width="20"
              height="20"
            >
              <path
                d="M136.533568 460.565045V947.412741A25.599984 25.599984 0 0 0 162.176219 972.799392h691.114234c14.335991 0 25.642651-11.30666 25.642651-25.365317V460.586379a25.599984 25.599984 0 0 0-25.642651-25.365318H162.176219c-14.335991 0-25.642651 11.30666-25.642651 25.365318z m-51.199968 0A76.543952 76.543952 0 0 1 162.176219 383.99976h691.114234a76.799952 76.799952 0 0 1 76.842619 76.565285V947.412741A76.543952 76.543952 0 0 1 853.290453 1023.99936H162.176219A76.799952 76.799952 0 0 1 85.3336 947.434075V460.586379z"
                fill="#ffffff"
                p-id="5588"
              ></path>
              <path
                d="M290.133472 217.599864c0-91.733276 74.60262-166.399896 166.421229-166.399896H546.133312a166.442563 166.442563 0 0 1 166.421229 166.399896v91.519943s7.082662 17.557322 27.221317 17.557322c20.159987 0 23.978652-17.535989 23.978651-17.535989V217.599864C763.733176 97.429272 666.239904 0 546.111979 0H456.533368C336.362776 0 238.933504 97.663939 238.933504 217.599864v191.99988l51.199968-9.813327V217.599864z m0 0c0-91.733276 74.60262-166.399896 166.421229-166.399896H546.133312a166.442563 166.442563 0 0 1 166.421229 166.399896v91.519943h51.199968V217.599864C763.733176 97.429272 666.239904 0 546.111979 0H456.533368C336.362776 0 238.933504 97.663939 238.933504 217.599864v191.99988l51.199968-9.813327V217.599864zM495.829343 576.831639v241.130516a25.599984 25.599984 0 1 0 51.199968 0V576.831639a25.599984 25.599984 0 1 0-51.199968 0z"
                fill="#ffffff"
                p-id="5589"
              ></path>
            </svg>
            <div className="content-field">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-field"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7168"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M949.9648 359.2704a34.7648 34.7648 0 0 0-6.4512-45.2096 31.4368 31.4368 0 0 0-45.2096 6.4c-1.6896 1.6896-181.1456 214.2208-394.6496 214.2208-207.0528 0-394.8544-214.2208-396.288-214.2208a33.28 33.28 0 0 0-45.4656-4.9664 33.0752 33.0752 0 0 0-3.072 45.4656A699.2896 699.2896 0 0 0 162.304 457.8304L79.7696 543.744a31.4368 31.4368 0 0 0 1.6384 45.2096c4.3008 6.5536 11.776 10.24 19.5072 9.728a32.8704 32.8704 0 0 0 23.808-9.728l87.6032-91.392a640 640 0 0 0 148.2752 75.2128l-34.9696 115.2a32.6144 32.6144 0 0 0 23.808 40.448h9.728a30.9248 30.9248 0 0 0 30.72-23.808l34.048-114.688a450.56 450.56 0 0 0 80.896 8.0896 448 448 0 0 0 80.6912-8.0896l34.048 113.3056c3.9424 13.7728 16.384 23.3984 30.72 23.7568a11.8784 11.8784 0 0 0 8.0896-1.6384 32.1536 32.1536 0 0 0 22.6304-40.448l-34.816-113.8176a629.0944 629.0944 0 0 0 146.944-75.9296l87.296 90.4704a31.1808 31.1808 0 0 0 45.2608 0 32.3584 32.3584 0 0 0 1.6384-45.2096L845.0048 454.656a637.9008 637.9008 0 0 0 104.96-95.232v-0.2048z"
                      fill="#ffffff"
                      p-id="7169"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6801"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M504.1152 204.8c185.6512 0 353.6384 105.0624 504.1152 315.0848-150.4768 210.0224-318.464 315.0848-504.1152 315.0848-185.6512 0-353.6384-105.0624-504.1152-315.0848C150.528 309.8624 318.464 204.8 504.1152 204.8z m0 62.976c-146.7392 0-283.136 76.0832-410.7264 233.3696l-14.848 18.7392 0.7168 0.9216c126.976 163.2256 262.656 245.1456 408.576 250.8288l16.2816 0.3072c146.7904 0 283.136-76.0832 410.7264-233.3696l14.7456-18.688-0.6144-0.9728c-126.9248-163.1744-262.656-245.0944-408.576-250.7776l-16.2816-0.3072z m0 63.0784a189.0304 189.0304 0 1 1 0 378.0608 189.0304 189.0304 0 0 1 0-378.0608z m0 62.976a126.0544 126.0544 0 1 0 0 252.0576 126.0544 126.0544 0 0 0 0-252.0576z"
                      fill="#ffffff"
                      p-id="6802"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="field">
            <svg
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6339"
              width="20"
              height="20"
            >
              <path
                d="M943.1 172c-2.4-0.2-245.1-25.3-413.8-147.8-5.1-3.7-11-5.6-17.3-5.6-6.2 0-12.2 1.9-17.3 5.6C326.9 146 83.3 171.8 80.9 172c-15.2 1.4-26.6 14.1-26.6 29.3 0 6.7 0.6 165.8 54.8 344.4 32.1 105.8 76.4 196.4 131.9 269.2 70.3 92.3 158.5 156 262 189.2 2.9 0.9 5.9 1.4 9 1.4s6.1-0.5 8.9-1.4c103.6-33.2 191.7-96.8 262-189.2 55.4-72.7 99.8-163.2 131.9-269.2 54.1-178.6 54.8-337.7 54.8-344.4C969.7 186.1 958.3 173.5 943.1 172zM910.1 227.2l-0.1 1.6c-2.9 58.1-13.4 174.4-51.4 299.9-66.7 220.1-183.1 360.1-346 416.1L512 945l-0.6-0.2C349 888.9 232.7 749.4 165.8 530.1c-39.8-130.5-49.4-254.2-51.8-301.4l-0.1-1.6 1.5-0.2c70.6-10.3 250.5-44.8 395.5-142.4l0.9-0.7 1 0.7C658 182.1 837.9 216.6 908.5 227L910.1 227.2z"
                p-id="6340"
                fill="#ffffff"
              ></path>
              <path
                d="M641.8 351 467 580.3l-89-76.1c-5.3-4.5-12.1-7-19.1-7-8.6 0-16.8 3.7-22.4 10.3-10.5 12.3-9.1 31 3.3 41.5l112.7 96.4c5.2 4.4 12.4 7 19.6 7 0.9 0 1.8 0 2.7-0.1 8-0.8 15.4-5 20.3-11.4l193.7-254c4.8-6.3 6.8-14 5.7-21.8-1-7.8-5.1-14.7-11.3-19.5C670.1 335.6 651.6 338.1 641.8 351z"
                p-id="6341"
                fill="#ffffff"
              ></path>
            </svg>
            <div className="content-field">
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
                <div className="captcha-placeholder">
                  <svg
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8227"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M909.1 209.3l-56.4 44.1C775.8 155.1 656.2 92 521.9 92 290 92 102.3 279.5 102 511.5 101.7 743.7 289.8 932 521.9 932c181.3 0 335.8-115 394.6-276.1 1.5-4.2-0.7-8.9-4.9-10.3l-56.7-19.5c-4.1-1.4-8.6 0.7-10.1 4.8-1.8 5-3.8 10-5.9 14.9-17.3 41-42.1 77.8-73.7 109.4-31.6 31.6-68.4 56.4-109.3 73.8-42.3 17.9-87.4 27-133.8 27-46.5 0-91.5-9.1-133.8-27-40.9-17.3-77.7-42.1-109.3-73.8-31.6-31.6-56.4-68.4-73.7-109.4-17.9-42.4-27-87.4-27-133.9s9.1-91.5 27-133.9c17.3-41 42.1-77.8 73.7-109.4 31.6-31.6 68.4-56.4 109.3-73.8 42.3-17.9 87.4-27 133.8-27 46.5 0 91.5 9.1 133.8 27 40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.6 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c-0.1-6.6-7.8-10.3-13-6.2z"
                      p-id="8228"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </div>
              )}
            </div>
          </div>
          <div className="btn">
            <button className="button1" onClick={handleLogin}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
