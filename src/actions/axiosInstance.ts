import axios from "axios";
import { getCookie } from "cookies-next";

// Get Token
export const getToken = () => {
  let token;
  token = getCookie("token");
  return token;
};

// Attach Token
export const authHeader = () => {
  const accessToken = getToken();
  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  }
  return {};
};

let apiUrl;
apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Server Instance Options
const AxiosInstance = axios.create({
  baseURL: apiUrl,
  maxContentLength: 100000,
  maxBodyLength: 100000,
});

// Server Instance Options
const DownloadInstance = axios.create({
  baseURL: apiUrl,
  maxContentLength: 100000,
  maxBodyLength: 100000,
  responseType: "blob",
});

// Main Instance
export const api = {
  get: async (url: string) => {
    try {
      const headers = authHeader();
      const { data } = await AxiosInstance.get(url, { headers });
      return {
        success: true,
        data: data,
      };
    } catch (err) {
      return {
        success: false,
        staus: err.response?.status || 500,
        message: err?.response?.data || "An unknown error occurred",
      };
    }
  },
  post: async (url: string, payload: object) => {
    try {
      const headers = authHeader();
      const { data } = await AxiosInstance.post(url, payload, { headers });

      return {
        success: true,
        data: data,
      };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data || "An unknown error occurred",
      };
    }
  },
  put: async (url: string, payload: object) => {
    try {
      const headers = authHeader();
      const { data } = await AxiosInstance.put(url, payload, { headers });

      return {
        success: true,
        data: data,
      };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data,
      };
    }
  },
  download: async (url: string, payload: object) => {
    try {
      const res = await DownloadInstance.get(url, {
        params: payload,
      });
      return res;
    } catch (err) {
      return {
        isFailed: err.response?.status || 500,
        message: err.response?.statusText || "An unknown error occurred",
      };
    }
  },
};
