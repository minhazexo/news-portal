import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchNews } from "../services/api";
import NewsCard from "../components/NewsCard";
import "./Home.css";

export default function Search() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    searchNews(query, page, perPage)
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setResults([]);
        setLoading(false);
      });
  }, [query, page]);

  return (
    <div className="container home">
      <h2>Search results for: "{query}"</h2>

      <div className="news-grid">
        {loading
          ? Array.from({ length: perPage }).map((_, i) => (
              <div key={i} className="skeleton"></div>
            ))
          : results.length > 0
          ? results.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))
          : "No results found."}
      </div>

      {!loading && results.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Prev
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={results.length < perPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}