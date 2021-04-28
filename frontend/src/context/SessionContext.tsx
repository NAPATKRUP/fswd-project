import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useCookies } from 'react-cookie';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ME_QUERY } from '../graphql/meQuery';
import { LOGIN_MUTATION } from '../graphql/loginMutation';

interface IUser {
  _id: string;
  displayName: string;
  role: string;
}

const SessionContext: React.Context<{
  user?: IUser | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}> = createContext({
  login: (username: string, password: string) => new Promise<void>((resolve, reject) => {}),
  logout: () => new Promise<void>((resolve, reject) => {}),
});

export const SessionProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [, setCookie, removeCookie] = useCookies(['token']);
  const history = useHistory();
  const location = useLocation();

  const [queryMe, { loading, data, client }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: 'network-only',
  });
  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = useCallback(
    async (username, password) => {
      const result = await login({ variables: { username, password } });

      if (result.data.login.token) {
        setCookie('token', result.data.login.token, { maxAge: 86400 });
        setUser(result?.data?.login?.user);

        if (user?.role === 'customer') return history.push('/');
        if (user?.role === 'admin') return history.push('/admin');
      }
    },
    [history, login, setCookie, user]
  );

  const handleLogout = useCallback(async () => {
    removeCookie('token', { maxAge: 86400 });
    await client?.clearStore();
    await queryMe();
    history.push('/');
    setUser(null);
  }, [client, history, queryMe, removeCookie]);

  useEffect(() => {
    if (location.pathname.includes('/admin') && user?.role === 'customer') {
      history.push('no-permission');
    }
  }, [history, location, user?.role]);

  useEffect(() => {
    if (data?.me) {
      setUser(data?.me);
    }
  }, [data]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await queryMe();
      } catch (err) {
        console.log(err);
      }
    };
    loadData();
  }, [queryMe]);

  return (
    <SessionContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export default SessionContext;
