import { useEffect, useState } from "react";

import ProductCard from "../../components/Product/ProductCard";
import ProductFilter from "../../components/Product/ProductFilter";

import {
  getAvailableProducts,
  searchProducts,
  getProductsByCategoryName,
  getProductsByPriceRange,
  getProductsByStock,
  getProductByName,
} from "../../services/productService";

import {
  getActiveCategories,
} from "../../services/categoryService";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productData = await getAvailableProducts();
      const categoryData = await getActiveCategories();

      setProducts(productData);
      setFilteredProducts(productData);
      setCategories(categoryData);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  // ==========================
  // SEARCH PRODUCTS (Keyword)
  // ==========================
  const handleSearch = async (keyword) => {
    if (!keyword || !keyword.trim()) {
      loadData();
      return;
    }

    try {
      const data = await searchProducts(keyword);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  // ==========================
  // EXACT PRODUCT NAME SEARCH
  // ==========================
  const handleNameSearch = async (name) => {
    if (!name || !name.trim()) {
      loadData();
      return;
    }

    try {
      const data = await getProductByName(name);
      setFilteredProducts(data ? (Array.isArray(data) ? data : [data]) : []);
    } catch (error) {
      console.error("Product name search failed:", error);
    }
  };

  // ==========================
  // CATEGORY NAME FILTER
  // ==========================
  const handleCategoryNameChange = async (categoryName) => {
    if (!categoryName) {
      loadData();
      return;
    }

    try {
      const data = await getProductsByCategoryName(categoryName);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Category name filter failed:", error);
    }
  };

  // ==========================
  // PRICE FILTER
  // ==========================
  const handlePrice = async (minPrice, maxPrice) => {
    if (minPrice === "" && maxPrice === "") {
      loadData();
      return;
    }

    try {
      const data = await getProductsByPriceRange(
        minPrice || 0,
        maxPrice || 999999
      );

      setFilteredProducts(data);
    } catch (error) {
      console.error("Price filter failed:", error);
    }
  };

  // ==========================
  // STOCK FILTER
  // ==========================
  const handleStockFilter = async (stockValue) => {
    if (!stockValue) {
      loadData();
      return;
    }

    try {
      const data = await getProductsByStock(stockValue);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Stock filter failed:", error);
    }
  };

  // ==========================
  // SORT
  // ==========================
  const handleSort = (sort) => {
    let sorted = [...filteredProducts];

    switch (sort) {
      case "low":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "high":
        sorted.sort((a, b) => b.price - a.price);
        break;

      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-4">
        Fresh Farm Products
      </h2>

      <ProductFilter
        categories={categories}
        onSearch={handleSearch}
        onNameSearch={handleNameSearch}
        onCategoryChange={handleCategoryNameChange}
        onPriceChange={handlePrice}
        onStockChange={handleStockFilter}
        onSortChange={handleSort}
      />

      <div className="row">

        {filteredProducts.length === 0 ? (

          <div className="col-12">
            <div className="alert alert-warning text-center">
              No Products Found
            </div>
          </div>

        ) : (

          filteredProducts.map((product) => (

            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Products;