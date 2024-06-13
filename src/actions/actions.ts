"use server";

import { UserType } from "@/types";
import axios from "axios";

/* 
  Authentication
*/

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
  "use server";
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/volunteer`,
      {
        ...userData,
      }
    );
    console.log(res);
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const verifyEmail = async (email: string, token: string) => {
  "use server";
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verifyEmail`,
    {
      email,
      token,
    }
  );
};

export const getVerifyEmail = async (email: string) => {
  "use server";
  return await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verificationToken`,
    {
      email,
    }
  );
};

/* 
  Media
*/

export const getEvents = async (page: number, q: string, t: string) => {
  "use server";
  return await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/events?state=new&order[startTime]=asc&type=${t}&enabled=true&limit=12&page=${page}${
      q ? "&title=" + q : ""
    }`
  );
};

export const getFeaturedEvents = async () => {
  "use server";
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?state=new&enabled=true&limit=4&isFeatured=true`
  );
};

export const getEvent = async (slug: string) => {
  "use server";
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}`
  );
};
