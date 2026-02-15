import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchNews } from "../services/api";
import NewsCard from "../components/NewsCard";
import { motion } from "framer-motion";

export default function Search() {
  const queryParams = new URLSearchParams(useLocation().search);
  const initialQuery = queryParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchNews(query)
      .then((data) => setArticles(data))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      {loading && Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton"></div>
      ))}
      {!loading && articles.length === 0 && query && <p>No results found</p>}

      <motion.div
        className="news-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} />
        ))}
      </motion.div>
    </div>
  );
}
