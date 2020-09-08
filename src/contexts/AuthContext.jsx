import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import api from '../resources/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  const setInterceptor = (token) => {
    api.interceptors.request.use(config => {
      config.headers.authorization = token;
      return config;
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'))
    setInterceptor(token);
    setUserData(userData);
  }, [])

  const signIn = async ({ email, password }) => {
    try {
      const { data } = await api.post('/session', {
        email,
        password,
      })
      const { user, token } = data;
      localStorage.setItem('token', `Bearer ${token}`);
      localStorage.setItem('userData', JSON.stringify(user))
      setInterceptor(token);
      setUserData(user);
    } catch(err) {
    }
  }

  const signOut = () => {
    setUserData(null);
    setInterceptor(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        userData,
        authenticated: Boolean(userData),
      }}
    >
      {children}
    </AuthContext.Provider>
  )

}

export function useAuth() {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export default AuthProvider;