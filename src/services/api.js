import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4";

// Fetch top headlines with pagination and category
export const fetchTopNews = async (page = 1, perPage = 6, category = "general") => {
  const res = await axios.get(
    `${BASE_URL}/top-headlines?lang=en&country=us&category=${category}&max=${perPage}&page=${page}&apikey=${API_KEY}`
  );
  return res.data.articles;
};

// Search news
export const searchNews = async (query) => {
  const res = await axios.get(
    `${BASE_URL}/search?q=${query}&lang=en&max=12&apikey=${API_KEY}`
  );
  return res.data.articles;
};
