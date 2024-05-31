"use server";

import { UserType } from "@/types";
import axios from "axios";

export const signIn = async (formData: FormData) => {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (userData: UserType) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/volunteer`,
      {
        ...userData,
      }
    );
  } catch (error) {
    throw error;
  }
};
