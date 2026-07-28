import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import cartService from "../../services/cartService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      console.log("Product:", data);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
      alert("Failed to load product.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await cartService.addToCart(product.id, 1);
      console.log("Added to Cart:", response);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Add to Cart Error:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <h3>Product not found.</h3>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1>{product.name}</h1>

      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <p>
        <strong>Brand:</strong> {product.brand}
      </p>

      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <button onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;