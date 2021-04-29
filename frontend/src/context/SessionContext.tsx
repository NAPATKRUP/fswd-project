import { createContext, FC, useCallback, useContext, useEffect, useState } from 'react';
import { REGISTER_MUTATION } from '../graphql/registerMutation';
import { CREATE_CART_MUTATION } from '../graphql/createCartMutation';
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

enum EnumCartStatus {
  WAITING = 'WAITING',
  CHECKOUT = 'CHECKOUT',
}

const SessionContext: React.Context<{
  user?: IUser | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}> = createContext({
  login: (username: string, password: string) => new Promise<void>((resolve, reject) => {}),
  register: (username: string, password: string, displayName: string) =>
    new Promise<void>((resolve, reject) => {}),
  logout: () => new Promise<void>((resolve, reject) => {}),
});

export const SessionProvider: FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [, setCookie, removeCookie] = useCookies(['token']);
  const history = useHistory();
  const location = useLocation();
  const [login] = useMutation(LOGIN_MUTATION);
  const [register] = useMutation(REGISTER_MUTATION);
  const [createCart] = useMutation(CREATE_CART_MUTATION);
  const [queryMe, { loading, data, client }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: 'network-only',
  });

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

  const handleRegister = useCallback(
    async (username, password, displayName) => {
      const result = await register({ variables: { username, password, displayName } });

      if (result.data.register.token) {
        setCookie('token', result.data.register.token, { maxAge: 86400 });
        setUser(result?.data?.register?.user);

        await createCart({
          variables: { userId: result?.data?.register?.user?._id, status: EnumCartStatus.WAITING },
        });

        return history.push('/');
      }
    },
    [createCart, history, register, setCookie]
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
    <SessionContext.Provider
      value={{ user, login: handleLogin, logout: handleLogout, register: handleRegister }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export default SessionContext;
