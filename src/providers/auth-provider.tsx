"use client";

import { UserType } from "@/types";
import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useState } from "react";
type AuthType = {
  user: UserType | null;
  userLoading: boolean;
};

export const AuthContext = createContext<AuthType>({
  user: null,
  userLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  useEffect(() => {
    const getUser = async () => {
      setUserLoading(true);
      const token = getCookie("token");
      if (!token) return;
      try {
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data.data);
        setUser(data.data as any);
      } catch (e) {}
      setUserLoading(false);
    };
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, userLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
