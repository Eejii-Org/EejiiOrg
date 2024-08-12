"use server";

import { BannerPositionType } from "@/components/ad";
import { UserType } from "@/types";
import axios from "axios";

/* 
  Authentication
*/

export const signIn = async (userData: UserType) => {
  try {
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
      {
        ...userData
      }
    );

    return data;
  } catch (error: any) {
    return error.response?.data;
  }
};

export const signUp = async (userData: UserType) => {
  "use server";

  try {
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`,
      {
        ...userData,
      }
    );

    return data;
  } catch (error: any) {
    return error?.response?.data
  }
};

export const verifyEmail = async (email: string, token: string) => {
  try {
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verifyEmail`,
    {
      email,
      token,
    }
    );

    return data;
  } catch (error: any) {
    return error?.response?.data
  }
};

export const getVerifyEmail = async (email: string) => {
  "use server";

  try {
    const {data} = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verificationToken`,
      {
        email,
      }
    );
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data
    }
  }
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

export const registerCustomer = async (email: string) => {
  "use server";
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/new`,
      {
        email,
      }
    );
    return res;
  } catch (e) {
    console.error(e);
    return null;
  }
};

// export const donateMoney = async (email: string | null, amount: number) => {
//   try {
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/donate`,
//       {
//         amount,
//         method: "qpay",
//         email,
//       }
//     );
//     return res;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// };

/* 
  Categories
*/
export const getCategories = async () => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`
    );
    return res.data?.["hydra:member"];
  } catch (e) {
    console.error(e);
    return null;
  }
};

/* 
  Advertisement
*/
export const getAdvertisement = async (position: BannerPositionType) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/banners?bannerPosition.code=${position}`
    );
    return res.data["hydra:member"];
  } catch (e) {
    console.error(e);
    return null;
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

export const getMediaByPartner = async (partnerId: number, limit: number) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/media?order[startTime]=asc&limit=${limit}&owner.id=${partnerId}`
    );
    return res.data["hydra:member"];
  } catch (e) {
    console.error(e);
    return null;
  }
};

/* 
  Events
*/

export const getEvents = async (
  page: number,
  q: string,
  t: string,
  category: string
) => {
  "use server";
  return await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/events?state=new&order[startTime]=asc&type=${t}&isEnabled=true&limit=12&page=${page}${
      category ? "&categories.slug=" + category : ""
    }${q ? "&title=" + q : ""}`
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

export const getProjects = async (
  page: number,
  q: string,
  t: string,
  category: string
) => {
  "use server";
  return await axios.get(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/projects?state=new&isEnabled=true&order[startTime]=asc&type=${t}&limit=12&page=${page}${
      q ? "&title=" + q : ""
    }${category ? "&categories.slug=" + category : ""}`
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

/* 
  Partners
*/
export const getPartners = async () => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/partners?state=accepted`
    );
    return res.data?.["hydra:member"];
  } catch (e) {
    console.error(e);
    return { data: null };
  }
};
export const getPartner = async (id: string) => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/partners/${id}`
    );
    return res.data;
  } catch (e) {
    console.error(e);
    return { data: null };
  }
};

/* 
  Volunteers
*/
export const getVolunteers = async (q: string, level: string, page: number) => {
  "use server";

  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/api/volunteers?order[level]=desc&state=accepted&search=${q}&${
        level ? "level=" + level : ""
      }&page=${page || 1}`
    );
    return {
      pageLast: res.data?.["hydra:meta"].pagination.last,
      data: res.data?.["hydra:member"],
    };
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getVolunteersCountry = async () => {
  "use server";
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home/volunteersByCountry`
    );
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/* 
  Supporters
*/

export const getSupporters = async (q: string) => {
  "use server";

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/supporters?order[totalActivityCount]=desc&totalActivityCount[gt]=0&search=${q}`
    );
    return res.data?.["hydra:member"];
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getSupporterData = async (id: string) => {
  "use server";

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}/activities`
    );
    return res.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
