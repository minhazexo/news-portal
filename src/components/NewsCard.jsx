import { motion } from "framer-motion";
import "./NewsCard.css";

export default function NewsCard({ article }) {
  const imageUrl = article.image_url || "/logo192.png"; // fallback
  const title = article.title || "শিরোনাম পাওয়া যায়নি";
  const description = article.description || "বিবরণ পাওয়া যায়নি";

  return (
    <motion.div
      className="news-card"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <img src={imageUrl} alt={title} />
      <div className="news-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </motion.div>
  );
}