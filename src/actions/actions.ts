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
  Home
*/

export const getHomeStatistics = async () => {
  "use server";
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/statistics`
  );
};
export const getHomeData = async () => {
  "use server";
  try {
    const res = await Promise.all([
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?state=new&order[startTime]=asc&isEnabled=true&search=&limit=1`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?state=new&order[startTime]=asc&isEnabled=true&search=&type=event&limit=1`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?state=new&order[startTime]=asc&isEnabled=true&search=&type=volunteering_event&limit=1`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?state=new&isEnabled=true&order[startTime]=asc&limit=3`
      ),
      axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media?order[startTime]=asc&limit=4`
      ),
    ]);
    const resData = res.map((res, index) => {
      if (index < 3) {
        return res.data?.["hydra:member"]?.[0];
      }
      return res.data?.["hydra:member"];
    });
    const features = {
      project: resData[0],
      event: resData[1],
      volunteeringEvent: resData[2],
    };
    const latestProjects = resData[3];
    const latestMedia = resData[4];

    return { features, latestProjects, latestMedia };
  } catch {
    throw Error("Failed to get home data");
  }
};

/* 
  Media
*/

export const getMedias = async (page: number, q: string) => {
  "use server";
  return await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/media?order[startTime]=asc&limit=12&page=${page}${
      q ? "&title=" + q : ""
    }`
  );
};

/* 
  Events
*/

export const getEvents = async (page: number, q: string, t: string) => {
  "use server";
  return await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/events?state=new&order[startTime]=asc&type=${t}&isEnabled=true&limit=12&page=${page}${
      q ? "&title=" + q : ""
    }`
  );
};

export const getFeaturedEvents = async () => {
  "use server";
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?state=new&isEnabled=true&limit=4&isFeatured=true`
  );
};

export const getEvent = async (slug: string) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}`
    );
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getEventUsers = async (slug: string) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${slug}/eventUsers`
    );
    return res.data?.["hydra:member"];
  } catch (e) {
    console.error(e);
    return null;
  }
};

/* 
  Events
*/

export const getProjects = async (page: number, q: string, t: string) => {
  "use server";
  return await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/projects?state=new&isEnabled=true&order[startTime]=asc&type=${t}&limit=12&page=${page}${
      q ? "&title=" + q : ""
    }`
  );
};

export const getFeaturedProjects = async () => {
  "use server";
  return await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects?state=new&isEnabled=true&limit=4&isFeatured=true`
  );
};

export const getProject = async (slug: string) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${slug}`
    );
    return res;
  } catch (e) {
    console.error(e);
    return { data: null };
  }
};
