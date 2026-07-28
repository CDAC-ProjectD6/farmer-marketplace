import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getActiveCategories,
} from "../../services/categoryService";

import {
  getAvailableProducts,
} from "../../services/productService";

function Home() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==================== LOAD HOME DATA ====================

  useEffect(() => {

    const loadHomeData = async () => {

      try {

        setLoading(true);
        setError("");

        const [categoryData, productData] =
          await Promise.all([
            getActiveCategories(),
            getAvailableProducts(),
          ]);

        setCategories(categoryData || []);
        setProducts(productData || []);

      } catch (err) {

        console.error(
          "Unable to load home page:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load marketplace data."
        );

      } finally {

        setLoading(false);
      }
    };

    loadHomeData();

  }, []);

  // Show maximum 8 products on Home page
  const featuredProducts = products.slice(0, 8);

  // ==================== CATEGORY CLICK ====================

  const handleCategoryClick = (categoryId) => {

    navigate(
      `/products?category=${categoryId}`
    );
  };

  return (
    <div>

      {/* ==================== HERO SECTION ==================== */}

      <section className="bg-light py-5">

        <div className="container py-4">

          <div className="row align-items-center">

            <div className="col-lg-7">

              <span className="badge bg-success mb-3">
                🌾 Farm Fresh Marketplace
              </span>

              <h1 className="display-4 fw-bold mb-3">

                Fresh From Farmers,

                <span className="text-success">
                  {" "}Directly To You
                </span>

              </h1>

              <p className="lead text-muted mb-4">

                Discover fresh farm products directly
                from local farmers. Simple, fresh and
                reliable.

              </p>

              <div className="d-flex gap-3 flex-wrap">

                <Link
                  to="/products"
                  className="btn btn-success btn-lg"
                >
                  Shop Products
                </Link>

                <Link
                  to="/categories"
                  className="btn btn-outline-success btn-lg"
                >
                  Browse Categories
                </Link>

              </div>

            </div>

            <div className="col-lg-5 text-center mt-5 mt-lg-0">

              <div
                className="bg-success-subtle rounded-4 p-5"
                style={{
                  fontSize: "100px",
                }}
              >
                🌾
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ==================== ERROR ==================== */}

      {error && (

        <div className="container mt-4">

          <div className="alert alert-danger">

            {error}

          </div>

        </div>

      )}


      {/* ==================== CATEGORIES ==================== */}

      <section className="py-5">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2 className="fw-bold mb-1">
                Shop by Category
              </h2>

              <p className="text-muted mb-0">
                Find products from your favourite category.
              </p>

            </div>

            <Link
              to="/categories"
              className="text-success text-decoration-none fw-semibold"
            >
              View All
            </Link>

          </div>


          {loading ? (

            <div className="text-center py-4">

              <div
                className="spinner-border text-success"
                role="status"
              />

              <p className="mt-2 text-muted">
                Loading categories...
              </p>

            </div>

          ) : categories.length === 0 ? (

            <div className="alert alert-light border text-center">

              No categories available.

            </div>

          ) : (

            <div className="row g-3">

              {categories.map((category) => (

                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={category.id}
                >

                  <button
                    type="button"
                    className="card border-0 shadow-sm w-100 h-100 text-start"
                    onClick={() =>
                      handleCategoryClick(category.id)
                    }
                  >

                    <div className="card-body p-4">

                      <div
                        className="mb-3"
                        style={{
                          fontSize: "35px",
                        }}
                      >
                        🌱
                      </div>

                      <h5 className="fw-bold">
                        {category.name}
                      </h5>

                      <p className="text-muted small mb-0">

                        {category.description ||
                          "Explore fresh farm products."}

                      </p>

                    </div>

                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* ==================== PRODUCTS ==================== */}

      <section className="bg-light py-5">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

              <h2 className="fw-bold mb-1">
                Fresh Products
              </h2>

              <p className="text-muted mb-0">
                Available products directly from farmers.
              </p>

            </div>

            <Link
              to="/products"
              className="text-success text-decoration-none fw-semibold"
            >
              View All Products
            </Link>

          </div>


          {loading ? (

            <div className="text-center py-5">

              <div
                className="spinner-border text-success"
                role="status"
              />

              <p className="mt-2 text-muted">
                Loading products...
              </p>

            </div>

          ) : featuredProducts.length === 0 ? (

            <div className="alert alert-light border text-center">

              No products currently available.

            </div>

          ) : (

            <div className="row g-4">

              {featuredProducts.map((product) => (

                <div
                  className="col-sm-6 col-lg-3"
                  key={product.id}
                >

                  <div className="card h-100 border-0 shadow-sm">

                    {/* PRODUCT IMAGE */}

                    {product.imageUrl ? (

                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="card-img-top"
                        style={{
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />

                    ) : (

                      <div
                        className="bg-success-subtle d-flex align-items-center justify-content-center"
                        style={{
                          height: "200px",
                          fontSize: "60px",
                        }}
                      >
                        🥬
                      </div>

                    )}


                    <div className="card-body d-flex flex-column">

                      {/* CATEGORY */}

                      <span className="text-success small fw-semibold">

                        {product.categoryName ||
                          "Farm Product"}

                      </span>


                      {/* PRODUCT NAME */}

                      <h5 className="card-title fw-bold mt-1">

                        {product.name}

                      </h5>


                      {/* FARMER */}

                      {product.farmerName && (

                        <p className="small text-muted mb-2">

                          Farmer: {product.farmerName}

                        </p>

                      )}


                      {/* PRICE */}

                      <h5 className="text-success fw-bold">

                        ₹{product.price}

                      </h5>


                      {/* STOCK */}

                      <p className="small text-muted">

                        {product.stock > 0
                          ? `${product.stock} available`
                          : "Out of stock"}

                      </p>


                      {/* VIEW BUTTON */}

                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-outline-success mt-auto"
                      >
                        View Details
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>


      {/* ==================== WHY FARMHUB ==================== */}

      <section className="py-5">

        <div className="container">

          <div className="text-center mb-5">

            <h2 className="fw-bold">
              Why Choose FarmHub?
            </h2>

            <p className="text-muted">
              Connecting farmers and customers through
              one simple marketplace.
            </p>

          </div>


          <div className="row g-4 text-center">

            <div className="col-md-4">

              <div className="p-4">

                <div
                  className="mb-3"
                  style={{ fontSize: "45px" }}
                >
                  🌱
                </div>

                <h5 className="fw-bold">
                  Fresh Products
                </h5>

                <p className="text-muted">
                  Browse fresh agricultural products
                  available directly from farmers.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="p-4">

                <div
                  className="mb-3"
                  style={{ fontSize: "45px" }}
                >
                  👨‍🌾
                </div>

                <h5 className="fw-bold">
                  Direct From Farmers
                </h5>

                <p className="text-muted">
                  Connect customers directly with
                  approved farmers.
                </p>

              </div>

            </div>


            <div className="col-md-4">

              <div className="p-4">

                <div
                  className="mb-3"
                  style={{ fontSize: "45px" }}
                >
                  🛒
                </div>

                <h5 className="fw-bold">
                  Easy Shopping
                </h5>

                <p className="text-muted">
                  Find products, explore categories
                  and shop from one place.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;