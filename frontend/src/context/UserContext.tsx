import React, { createContext, FunctionComponent, useState } from "react";

interface UserContextProps {
  role: any;
  user: any;
  setUser: any;
  setRole: any;
}

export const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const UserProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<string>("customer");

  return (
    <UserContext.Provider value={{ user, setUser, role, setRole }}>{children}</UserContext.Provider>
  );
};
