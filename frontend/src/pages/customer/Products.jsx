import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";

function Products() {
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      console.log("Products:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    Promise.resolve().then(loadProducts);
  }, []);

  return (
    <div className="container py-5">
      <h1>Products</h1>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - ₹{product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;