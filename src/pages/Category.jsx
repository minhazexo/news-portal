import { useParams } from "react-router-dom";

export default function Category() {
  const { name } = useParams();

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <h1>Category: {name}</h1>
    </div>
  );
}
