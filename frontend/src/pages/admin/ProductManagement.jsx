import { useEffect, useState } from "react";

import ProductTable from "../../components/Product/ProductTable";
import ProductFilter from "../../components/Product/ProductFilter";

import {
  getAllProducts,
  deleteProduct,
} from "../../services/productService";

function ProductManagement() {

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getAllProducts();

      setProducts(data);
      setFilteredProducts(data);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {

      await deleteProduct(id);

      const updatedProducts = products.filter(
        (product) => product.id !== id
      );

      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);

      alert("Product deleted successfully.");

    } catch (error) {

      console.error(error);

      alert("Delete failed.");

    }
  };

  const handleEdit = (product) => {
    alert(`Edit Product: ${product.name}`);
  };

  const handleFilter = (filtered) => {
    setFilteredProducts(filtered);
  };

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-4">
        Product Management
      </h2>

      <ProductFilter
        products={products}
        onFilter={handleFilter}
      />

      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default ProductManagement;