import { useParams } from "react-router-dom";

export default function SingleNews() {
  const { id } = useParams();

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h1>News ID: {id}</h1>
    </div>
  );
}
