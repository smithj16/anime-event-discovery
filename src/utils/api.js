// src/utils/api.js
import api from "./customAxios";

/**
 * Example: filteredEventsApi
 * We pass `token` as an argument and inject it into headers["x-access-token"].
 */
export const filteredEventsApi = async (filters, token) => {
  try {
    const queryString = new URLSearchParams(filters).toString();
    const response = await api.get(`/secure/readAllEventsFilter?${queryString}`, {
      headers: {
        "x-access-token": token || ""
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered events:", error);
    throw error;
  }
};
/**
 * Example: latestNewsApi
 */
export const latestNewsApi = async (token) => {
  try {
    const response = await api.get("/latestNews", {
      headers: {
        "x-access-token": token || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    throw error;
  }
};

/**
 * Example: upcomingEventsApi
 */
export const upcomingEventsApi = async (token) => {
  try {
    const response = await api.post(
      "/secure/readAllDocuments/UpcomingEvents",
      {},
      {
        headers: {
          "x-access-token": token || "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    throw error;
  }
};

/**
 * Example: popularEventsApi
 */
export const popularEventsApi = async (token) => {
  try {
    const response = await api.post(
      "/secure/readAllDocuments/PopularEvents",
      {},
      {
        headers: {
          "x-access-token": token || "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching popular events:", error);
    throw error;
  }
};
