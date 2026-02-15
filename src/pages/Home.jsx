import { useEffect, useState } from "react";
import { fetchTopNews } from "../services/api";
import NewsCard from "../components/NewsCard";
import { motion } from "framer-motion";
import "./Home.css";

const categories = [
  { name: "general", icon: "📰" },
  { name: "business", icon: "💼" },
  { name: "technology", icon: "💻" },
  { name: "sports", icon: "🏅" },
];

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    setLoading(true);
    fetchTopNews(page, perPage, category)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [page, category]);

  const topHeadline = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div className="container home">
      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((cat) => (
          <button
  key={cat.name}
  className={cat.name === category ? "active" : ""}
  onClick={() => { setCategory(cat.name); setPage(1); }}
>
  <span className="icon">{cat.icon}</span>
  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
</button>
        ))}
      </div>

      {/* Hero */}
      {loading ? (
        <div className="skeleton hero-skeleton"></div>
      ) : (
        <motion.section
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img src={topHeadline.image} alt={topHeadline.title} />
          <div className="hero-text">
            <h1>{topHeadline.title}</h1>
            <p>{topHeadline.description}</p>
          </div>
        </motion.section>
      )}

      {/* Grid + Sidebar */}
      <div className="content">
        <div className="news-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="skeleton"></div>
              ))
            : otherArticles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
        </div>

        {!loading && (
          <aside className="sidebar">
            <h3>Trending</h3>
            {otherArticles.slice(0, 5).map((article, index) => (
              <p key={index}>{article.title}</p>
            ))}
          </aside>
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="pagination">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Prev
          </button>
          <span>{page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={otherArticles.length < perPage}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
