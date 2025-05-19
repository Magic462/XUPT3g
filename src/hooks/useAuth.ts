// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // 引入路由导航钩子

// interface AuthState {
//   isLoggedIn: boolean;
//   logout: () => void;
// }

// export const useAuth = (): AuthState => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
//     localStorage.getItem('token') !== null
//   );
//   const navigate = useNavigate(); // 获取导航函数

//   const logout = (): void => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/login'); // 退出后导航到登录页
//   };

//   return { isLoggedIn, logout };
// };
