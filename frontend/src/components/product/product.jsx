import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

import { getActiveCategories } from "../../services/categoryService";

function Products() {
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ==========================
  // LOAD PRODUCTS
  // ==========================
  useEffect(() => {
    loadData();
  }, [searchParams]);

  const loadData = async () => {
    try {
      // Get all available products
      const productData = await getAvailableProducts();

      // Get active categories
      const categoryData = await getActiveCategories();

      setProducts(productData);
      setCategories(categoryData);

      // Get category from URL
      const categoryName = searchParams.get("category");

      if (categoryName) {
        // Category came from Categories page
        const categoryProducts =
          await getProductsByCategoryName(categoryName);

        setFilteredProducts(categoryProducts);
      } else {
        // Normal /products page
        setFilteredProducts(productData);
      }
    } catch (error) {
      console.error("Error loading products:", error);
      setFilteredProducts([]);
    }
  };

  // ==========================
  // SEARCH PRODUCTS (KEYWORD)
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
      setFilteredProducts([]);
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

      setFilteredProducts(
        data ? (Array.isArray(data) ? data : [data]) : []
      );
    } catch (error) {
      console.error("Product name search failed:", error);
      setFilteredProducts([]);
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
      setFilteredProducts([]);
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
      setFilteredProducts([]);
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
      setFilteredProducts([]);
    }
  };

  // ==========================
  // SORT
  // ==========================
  const handleSort = (sort) => {
    const sorted = [...filteredProducts];

    switch (sort) {
      case "low":
        sorted.sort((a, b) => a.price - b.price);
        break;

      case "high":
        sorted.sort((a, b) => b.price - a.price);
        break;

      case "name":
        sorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        break;

      default:
        break;
    }

    setFilteredProducts(sorted);
  };

  // ==========================
  // RESET FILTERS
  // ==========================
  const handleReset = () => {
    loadData();
  };

  return (
    <div className="container py-4">

      {/* PAGE TITLE */}
      <h2 className="fw-bold mb-4">
        Fresh Farm Products
      </h2>

      {/* FILTERS */}
      <ProductFilter
        categories={categories}
        onSearch={handleSearch}
        onNameSearch={handleNameSearch}
        onCategoryChange={handleCategoryNameChange}
        onPriceChange={handlePrice}
        onStockChange={handleStockFilter}
        onSortChange={handleSort}
        onReset={handleReset}
      />

      {/* PRODUCTS */}
      <div className="row mt-4">

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