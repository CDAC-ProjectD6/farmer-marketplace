import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

function ProductManagement() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageSize = 5;

  // ================= LOAD PRODUCTS =================

  const loadProducts = async () => {

    try {

      setLoading(true);
      setError("");

      const params = {
        page: page,
        size: pageSize,
      };

      if (keyword.trim()) {
        params.keyword = keyword.trim();
      }

      if (status !== "") {
        params.active = status;
      }

      const response = await api.get(
        "/admin/products",
        { params }
      );

      setProducts(response.data.content || []);
      setTotalPages(response.data.totalPages || 0);
      setTotalElements(response.data.totalElements || 0);

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load products."
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, status]);

  // ================= SEARCH =================

  const handleSearch = (event) => {

    event.preventDefault();

    if (page !== 0) {
      setPage(0);
    } else {
      loadProducts();
    }
  };

  // ================= CLEAR FILTER =================

  const handleClear = () => {

    setKeyword("");
    setStatus("");
    setPage(0);

    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  // ================= ACTIVATE =================

  const activateProduct = async (id) => {

    const confirmed = window.confirm(
      "Activate this product?"
    );

    if (!confirmed) return;

    try {

      await api.patch(
        `/admin/products/${id}/activate`
      );

      await loadProducts();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to activate product."
      );
    }
  };

  // ================= DEACTIVATE =================

  const deactivateProduct = async (id) => {

    const confirmed = window.confirm(
      "Deactivate this product?"
    );

    if (!confirmed) return;

    try {

      await api.patch(
        `/admin/products/${id}/deactivate`
      );

      await loadProducts();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to deactivate product."
      );
    }
  };

  // ================= UI =================

  return (

    <div className="container py-4">

      {/* Heading */}

      <div className="mb-4">

        <h2 className="fw-bold mb-1">
          Product Management
        </h2>

        <p className="text-muted mb-0">
          Manage marketplace products and product availability
        </p>

      </div>


      {/* Filters */}

      <div className="card shadow-sm border-0 mb-4">

        <div className="card-body">

          <form
            onSubmit={handleSearch}
            className="row g-3"
          >

            <div className="col-md-6">

              <label className="form-label fw-semibold">
                Search Product
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Search by product name..."
                value={keyword}
                onChange={(e) =>
                  setKeyword(e.target.value)
                }
              />

            </div>


            <div className="col-md-3">

              <label className="form-label fw-semibold">
                Status
              </label>

              <select
                className="form-select"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(0);
                }}
              >

                <option value="">
                  All Products
                </option>

                <option value="true">
                  Active
                </option>

                <option value="false">
                  Inactive
                </option>

              </select>

            </div>


            <div className="col-md-3 d-flex align-items-end gap-2">

              <button
                type="submit"
                className="btn btn-success"
              >
                Search
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleClear}
              >
                Clear
              </button>

            </div>

          </form>

        </div>

      </div>


      {/* Total Products */}

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h5 className="mb-0">
          Products
        </h5>

        <span className="badge bg-success fs-6">
          Total: {totalElements}
        </span>

      </div>


      {/* Error */}

      {error && (

        <div className="alert alert-danger">
          {error}
        </div>

      )}


      {/* Loading */}

      {loading ? (

        <div className="text-center py-5">

          <div
            className="spinner-border text-success"
            role="status"
          />

          <p className="mt-3 text-muted">
            Loading products...
          </p>

        </div>

      ) : products.length === 0 ? (

        <div className="alert alert-info text-center">
          No products found.
        </div>

      ) : (

        <>

          {/* Product Table */}

          <div className="card shadow-sm border-0">

            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="table-light">

                  <tr>

                    <th>ID</th>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Farmer</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Status</th>

                    <th className="text-center">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {products.map((product) => (

                    <tr key={product.id}>

                      <td>
                        #{product.id}
                      </td>


                      <td>

                        <div className="d-flex align-items-center gap-3">

                          {product.imageUrl && (

                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />

                          )}

                          <div>

                            <div className="fw-semibold">
                              {product.name}
                            </div>

                            {product.brand && (

                              <small className="text-muted">
                                {product.brand}
                              </small>

                            )}

                          </div>

                        </div>

                      </td>


                      <td>
                        {product.categoryName || "-"}
                      </td>


                      <td>
                        {product.farmerName || "-"}
                      </td>


                      <td className="fw-semibold">
                        ₹{Number(product.price).toFixed(2)}
                      </td>


                      <td>

                        {product.stock > 0 ? (

                          product.stock

                        ) : (

                          <span className="text-danger fw-semibold">
                            Out of stock
                          </span>

                        )}

                      </td>


                      <td>

                        {product.active ? (

                          <span className="badge bg-success">
                            ACTIVE
                          </span>

                        ) : (

                          <span className="badge bg-secondary">
                            INACTIVE
                          </span>

                        )}

                      </td>


                      <td className="text-center">

                        <div className="d-flex justify-content-center gap-2">

                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() =>
                              navigate(
                                `/admin/products/${product.id}`
                              )
                            }
                          >
                            View
                          </button>


                          {product.active ? (

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                deactivateProduct(
                                  product.id
                                )
                              }
                            >
                              Deactivate
                            </button>

                          ) : (

                            <button
                              className="btn btn-sm btn-outline-success"
                              onClick={() =>
                                activateProduct(
                                  product.id
                                )
                              }
                            >
                              Activate
                            </button>

                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


          {/* Pagination */}

          {totalPages > 1 && (

            <div className="d-flex justify-content-center align-items-center gap-3 mt-4">

              <button
                className="btn btn-outline-success"
                disabled={page === 0}
                onClick={() =>
                  setPage(page - 1)
                }
              >
                Previous
              </button>


              <span className="fw-semibold">

                Page {page + 1} of {totalPages}

              </span>


              <button
                className="btn btn-outline-success"
                disabled={
                  page >= totalPages - 1
                }
                onClick={() =>
                  setPage(page + 1)
                }
              >
                Next
              </button>

            </div>

          )}

        </>

      )}

    </div>
  );
}

export default ProductManagement;