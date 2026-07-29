import { Link } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { useState } from "react";

import wishlistService from "../../services/wishlistService";
import cartService from "../../services/cartService";

function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);

  // ================= ADD TO CART =================
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

  // ================= WISHLIST =================
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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

  return (
    <div className="card h-100 shadow-sm position-relative">

      {/* Wishlist */}
      <button
        className="btn btn-light position-absolute"
        style={{
          top: 10,
          right: 10,
          borderRadius: "50%",
          zIndex: 10,
        }}
        onClick={handleWishlist}
      >
        {wishlisted ? (
          <FaHeart className="text-danger" />
        ) : (
          <FaRegHeart className="text-danger" />
        )}
      </button>

      <img
        src={product.imageUrl || "/images/no-image.png"}
        className="card-img-top"
        alt={product.name}
        style={{
          height: "220px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">

        <h5>{product.name}</h5>

        <small className="text-success">
          {product.categoryName}
        </small>

        {/* Rating */}
        <div className="mt-2 mb-2">
          {product.averageRating ? (
            <>
              <span className="text-warning">
                <FaStar />
              </span>

              <strong className="ms-1">
                {product.averageRating}
              </strong>

              <small className="text-muted ms-2">
                ({product.reviewCount || 0} reviews)
              </small>
            </>
          ) : (
            <small className="text-muted">
              No ratings yet
            </small>
          )}
        </div>

        <p className="text-muted">
          {product.description}
        </p>

        <h4 className="text-success">
          ₹ {product.price}
        </h4>

        <p>
          Stock :
          <strong className="text-success">
            {" "}
            {product.stock}
          </strong>
        </p>

        <div className="d-flex gap-2 mt-auto">

          <button
            className="btn btn-success flex-fill"
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="me-2" />
            Add Cart
          </button>

          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-success"
          >
            Details
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;