import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm position-relative">

      {/* Wishlist */}
      <button
        className="btn btn-light position-absolute"
        style={{
          top: 10,
          right: 10,
          borderRadius: "50%",
        }}
      >
        <FaHeart className="text-danger" />
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

          <button className="btn btn-success flex-fill">
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