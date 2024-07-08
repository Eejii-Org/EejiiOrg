"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
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
        console.log(data);
        setUser(data as any);
      } catch (e) {}
    };
    getUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
