import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

const categoryImages = {
  Fruits: "/categoryImage/fruit.jpeg",
  Vegetables: "/categoryImage/vegetable.jpeg",
  "Leafy Vegetables": "/categoryImage/vegetable.jpeg",
  Dairy: "/categoryImage/dairy.jpeg",
  Grains: "/categoryImage/grains.jpeg",
  Pulses: "/categoryImage/grains.jpeg",
  Spices: "/categoryImage/spices.jpeg",
  Flowers: "/categoryImage/flower.jpeg",
  "Dry Fruits": "/categoryImage/dryfruit.jpeg",
  "Organic Products": "/categoryImage/organic.jpeg",
};

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const imageUrl =
    categoryImages[category.name] ||
    "/categoryImage/organic.jpeg";

  return (
    <div className="category-card">

      <img
        src={imageUrl}
        alt={category.name}
        className="category-image"
      />

      <h4>{category.name}</h4>

      <p>{category.description}</p>

      <button
        className="btn btn-success"
        onClick={() =>
          navigate(`/products?category=${category.name}`)
        }
      >
        Browse Products
      </button>

    </div>
  );
};

export default CategoryCard;