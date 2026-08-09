
import "./CategoryCard.css";
import { useNavigate } from "react-router-dom";

const categoryImages = {
  Fruits: "/categoryImage/fruit.jpeg",
  Vegetables: "/categoryImage/vegetable.jpeg",
  Grains: "/categoryImage/grains.jpeg",
  Spices: "/categoryImage/spices.jpeg",
  Flowers: "/categoryImage/flower.jpeg",
  "Dry Fruits": "/categoryImage/dryfruit.jpeg",
  "Organic Products": "/categoryImage/organic.jpeg",
  Dairy: "/categoryImage/dairy.jpeg"
};

const CategoryCard = ({ category }) => {

  const navigate = useNavigate();

  const handleBrowseProducts = () => {
    navigate(
      `/products?category=${encodeURIComponent(category.name)}`
    );
  };

  return (
    <>

      <img
        src={categoryImages[category.name]}
        alt={category.name}
        className="category-image"
      />

      <h4>{category.name}</h4>

      <p>{category.description}</p>

      <button
        className="btn btn-success"
        onClick={handleBrowseProducts}
      >
        Browse Products
      </button>

    </>
  );
};

export default CategoryCard;
