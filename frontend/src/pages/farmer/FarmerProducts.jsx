import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProductTable from "../../components/Product/ProductTable";

import {
  getProductsByFarmer,
  deleteProduct,
} from "../../services/productService";

function FarmerProducts() {
  const [products, setProducts] = useState([]);

  const farmerId = localStorage.getItem("userId");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProductsByFarmer(farmerId);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    window.location.href = `/farmer/products/edit/${product.id}`;
  };

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2 className="fw-bold">
          My Products
        </h2>

        <Link
          to="/farmer/products/add"
          className="btn btn-success"
        >
          + Add Product
        </Link>

      </div>

      <ProductTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default FarmerProducts;