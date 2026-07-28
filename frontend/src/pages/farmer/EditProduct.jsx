import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/Product/ProductForm";

import {
  getProductById,
  updateProduct,
} from "../../services/productService";

import {
  getActiveCategories,
} from "../../services/categoryService";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

    try {

      const productData = await getProductById(id);

      const categoryData = await getActiveCategories();

      setProduct(productData);

      setCategories(categoryData);

    } catch (error) {

      console.error(error);

    }

  };

  const handleSubmit = async (updatedProduct) => {

    try {

      await updateProduct(id, updatedProduct);

      alert("Product Updated Successfully.");

      navigate("/farmer/products");

    } catch (error) {

      console.error(error);

      alert("Failed to update product.");

    }

  };

  if (!product) {

    return (
      <div className="container py-5 text-center">
        <h4>Loading...</h4>
      </div>
    );

  }

  return (
    <div className="container py-4">

      <h2 className="mb-4">
        Edit Product
      </h2>

      <ProductForm
        categories={categories}
        initialData={product}
        onSubmit={handleSubmit}
        onCancel={() => navigate("/farmer/products")}
      />

    </div>
  );
}

export default EditProduct;