import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

function ProductDetailsAdmin() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= LOAD PRODUCT =================

  const loadProduct = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        `/admin/products/${id}`
      );

      setProduct(response.data);

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load product details."
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  // ================= ACTIVATE =================

  const handleActivate = async () => {

    if (!window.confirm("Activate this product?")) {
      return;
    }

    try {

      const response = await api.patch(
        `/admin/products/${id}/activate`
      );

      setProduct(response.data);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to activate product."
      );
    }
  };

  // ================= DEACTIVATE =================

  const handleDeactivate = async () => {

    if (!window.confirm("Deactivate this product?")) {
      return;
    }

    try {

      const response = await api.patch(
        `/admin/products/${id}/deactivate`
      );

      setProduct(response.data);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to deactivate product."
      );
    }
  };

  // ================= LOADING =================

  if (loading) {

    return (
      <div className="container py-5 text-center">

        <div
          className="spinner-border text-success"
          role="status"
        />

        <p className="mt-3 text-muted">
          Loading product details...
        </p>

      </div>
    );
  }

  // ================= ERROR =================

  if (error) {

    return (
      <div className="container py-4">

        <div className="alert alert-danger">
          {error}
        </div>

        <button
          className="btn btn-secondary"
          onClick={() =>
            navigate("/admin/products")
          }
        >
          Back to Products
        </button>

      </div>
    );
  }

  if (!product) {
    return null;
  }

  // ================= UI =================

  return (

    <div className="container py-4">

      {/* Header */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Product Details
          </h2>

          <p className="text-muted mb-0">
            Product #{product.id}
          </p>

        </div>

        <button
          className="btn btn-outline-secondary"
          onClick={() =>
            navigate("/admin/products")
          }
        >
          ← Back
        </button>

      </div>


      <div className="row g-4">

        {/* Image */}

        <div className="col-lg-4">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center">

              {product.imageUrl ? (

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />

              ) : (

                <div
                  className="bg-light rounded d-flex align-items-center justify-content-center"
                  style={{
                    height: "300px",
                  }}
                >
                  <span className="text-muted">
                    No product image
                  </span>
                </div>

              )}

            </div>

          </div>

        </div>


        {/* Product information */}

        <div className="col-lg-8">

          <div className="card shadow-sm border-0">

            <div className="card-body p-4">

              <div className="d-flex justify-content-between mb-4">

                <div>

                  <h3 className="fw-bold">
                    {product.name}
                  </h3>

                  <p className="text-muted">
                    {product.brand || "No brand"}
                  </p>

                </div>

                {product.active ? (

                  <span className="badge bg-success align-self-start fs-6">
                    ACTIVE
                  </span>

                ) : (

                  <span className="badge bg-secondary align-self-start fs-6">
                    INACTIVE
                  </span>

                )}

              </div>


              <hr />


              <div className="row g-4">

                <div className="col-md-6">

                  <small className="text-muted">
                    Price
                  </small>

                  <h5>
                    ₹{Number(product.price).toFixed(2)}
                  </h5>

                </div>


                <div className="col-md-6">

                  <small className="text-muted">
                    Stock
                  </small>

                  <h5>
                    {product.stock}
                  </h5>

                </div>


                <div className="col-md-6">

                  <small className="text-muted">
                    Category
                  </small>

                  <h6>
                    {product.categoryName || "-"}
                  </h6>

                </div>


                <div className="col-md-6">

                  <small className="text-muted">
                    Category ID
                  </small>

                  <h6>
                    {product.categoryId || "-"}
                  </h6>

                </div>


                <div className="col-md-6">

                  <small className="text-muted">
                    Farmer
                  </small>

                  <h6>
                    {product.farmerName || "-"}
                  </h6>

                </div>


                <div className="col-md-6">

                  <small className="text-muted">
                    Farmer ID
                  </small>

                  <h6>
                    {product.farmerId || "-"}
                  </h6>

                </div>

              </div>


              <hr />


              <div className="mb-4">

                <small className="text-muted">
                  Description
                </small>

                <p className="mt-2">
                  {product.description}
                </p>

              </div>


              <div className="row">

                <div className="col-md-6">

                  <small className="text-muted">
                    Created At
                  </small>

                  <p>
                    {product.createdAt
                      ? new Date(
                          product.createdAt
                        ).toLocaleString()
                      : "-"}
                  </p>

                </div>


                <div className="col-md-6">

                  <small className="text-muted">
                    Last Updated
                  </small>

                  <p>
                    {product.updatedAt
                      ? new Date(
                          product.updatedAt
                        ).toLocaleString()
                      : "-"}
                  </p>

                </div>

              </div>


              <hr />


              {/* Moderation action */}

              {product.active ? (

                <button
                  className="btn btn-danger"
                  onClick={handleDeactivate}
                >
                  Deactivate Product
                </button>

              ) : (

                <button
                  className="btn btn-success"
                  onClick={handleActivate}
                >
                  Activate Product
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetailsAdmin;