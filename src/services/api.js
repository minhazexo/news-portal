import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

// Latest news with safe pagination + fallback
export const fetchLatestNews = async (page = 1) => {
  try {
    const params = {
      apikey: API_KEY,
      language: "bn", // try Bengali first
    };
    if (page > 1) params.page = page; // only add page if > 1

    const res = await axios.get("https://newsdata.io/api/1/latest", { params });

    if (res.data.status === "error") {
      console.warn("No Bengali results, retrying with English...");
      const fallbackParams = { apikey: API_KEY, language: "en" };
      if (page > 1) fallbackParams.page = page;

      const fallbackRes = await axios.get("https://newsdata.io/api/1/latest", {
        params: fallbackParams,
      });
      return fallbackRes.data.results || [];
    }

    return res.data.results || [];
  } catch (err) {
    console.error(
      "Error fetching latest news:",
      err.response?.data?.message || err.response?.data || err.message
    );
    return [];
  }
};

// News with category (supports country + language)
export const fetchNews = async (page = 1, category = "") => {
  try {
    const params = {
      apikey: API_KEY,
      country: "bd",
      language: "bn",
      page,
    };
    if (category && category !== "top") params.category = category;

    const res = await axios.get("https://newsdata.io/api/1/news", { params });
    return res.data.results || [];
  } catch (err) {
    console.error(
      "Error fetching news:",
      err.response?.data?.message || err.response?.data || err.message
    );
    return [];
  }
};

// Search helper
export const searchNews = async (query, page = 1) => {
  try {
    const params = {
      apikey: API_KEY,
      q: query,
      country: "bd",
      language: "bn",
      page,
    };

    const res = await axios.get("https://newsdata.io/api/1/news", { params });
    return res.data.results || [];
  } catch (err) {
    console.error(
      "Error searching news:",
      err.response?.data?.message || err.response?.data || err.message
    );
    return [];
  }
};
