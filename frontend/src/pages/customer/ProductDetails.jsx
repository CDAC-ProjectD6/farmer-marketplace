import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";

import { getProductById } from "../../services/productService";
import cartService from "../../services/cartService";
import wishlistService from "../../services/wishlistService";

import ReviewSection from "../../components/review/ReviewSection";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // ADD TO CART
  // ==========================
  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(product.id, 1);
      alert("Product added to cart successfully.");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Failed to add product.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  // ==========================
  // WISHLIST
  // ==========================
  const handleWishlist = async () => {
    try {
      if (wishlisted) {
        await wishlistService.removeFromWishlist(product.id);
        setWishlisted(false);
        alert("Removed from wishlist.");
      } else {
        await wishlistService.addToWishlist(product.id);
        setWishlisted(true);
        alert("Added to wishlist.");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Wishlist operation failed."
        );
      } else {
        alert("Something went wrong.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h3>Product not found</h3>

        <Link
          to="/products"
          className="btn btn-success mt-3"
        >
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row g-5">

        <div className="col-lg-5">
          <img
            src={product.imageUrl || "/images/no-image.png"}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-lg-7">

          <div className="d-flex justify-content-between">

            <h2>{product.name}</h2>

            <button
              className="btn btn-light border"
              onClick={handleWishlist}
            >
              {wishlisted ? (
                <FaHeart color="red" size={28} />
              ) : (
                <FaRegHeart size={28} />
              )}
            </button>

          </div>

          <h3 className="text-success mt-3">
            ₹ {product.price}
          </h3>

          <div className="mt-2 mb-3">
            {product.averageRating ? (
              <>
                <span className="text-warning fs-5">
                  ⭐
                </span>

                <strong className="ms-2">
                  {product.averageRating}
                </strong>

                <span className="text-muted ms-2">
                  ({product.reviewCount || 0} reviews)
                </span>
              </>
            ) : (
              <span className="text-muted">
                No ratings yet
              </span>
            )}
          </div>

          <hr />

          <p>
            <strong>Category :</strong>{" "}
            {product.categoryName}
          </p>

          <p>
            <strong>Brand :</strong>{" "}
            {product.brand}
          </p>

          <p>
            <strong>Farmer :</strong>{" "}
            {product.farmerName}
          </p>

          <p>
            <strong>Stock :</strong>{" "}
            {product.stock}
          </p>

          <hr />

          <h5>Description</h5>

          <p>{product.description}</p>

          <div className="mt-4">

            <button
              className="btn btn-success me-3"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="me-2" />
              Add To Cart
            </button>

            <Link
              to="/products"
              className="btn btn-outline-secondary"
            >
              Back
            </Link>

          </div>

        </div>

      </div>

      <ReviewSection productId={product.id} />

    </div>
  );
}

export default ProductDetails;