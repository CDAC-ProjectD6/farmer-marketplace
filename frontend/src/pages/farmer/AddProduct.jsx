import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/Product/ProductForm";

import {
  createProduct,
} from "../../services/productService";

import {
  getActiveCategories,
} from "../../services/categoryService";

function AddProduct() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getActiveCategories();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (product) => {
    try {

      await createProduct(product);

      alert("Product Added Successfully.");

      navigate("/farmer/products");

    } catch (error) {

      console.error(error);

      alert("Failed to add product.");

    }
  };

  return (
    <div className="container py-4">

      <h2 className="mb-4">
        Add Product
      </h2>

      <ProductForm
        categories={categories}
        initialData={null}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/farmer/products")}
      />

    </div>
  );
}

export default AddProduct;