import { motion } from "framer-motion";
import "./NewsCard.css";

export default function NewsCard({ article }) {
  return (
    <motion.div
      className="news-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img src={article.image || "/logo192.png"} alt={article.title} />
      <div className="news-content">
        <h3>{article.title}</h3>
        <p>{article.description}</p>
      </div>
    </motion.div>
  );
}
