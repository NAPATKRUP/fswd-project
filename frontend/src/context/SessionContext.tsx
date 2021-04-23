import { useMutation } from "@apollo/client";
import { createContext, FC, useCallback, useContext, useState } from "react";
import { useCookies } from "react-cookie";

import { LOGIN_MUTATION } from "../graphql/loginMutation";

const SessionContext: React.Context<{}> = createContext({});

export const SessionProvider: FC = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [, setCookie, removeCookie] = useCookies(["token"]);
  const [login] = useMutation(LOGIN_MUTATION);

  const handleLogin = useCallback(
    async (username, password) => {
      const result = await login({ variables: { username, password } });
    },
    [login]
  );

  return (
    <SessionContext.Provider value={{ login: handleLogin }}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);

export default SessionContext;
