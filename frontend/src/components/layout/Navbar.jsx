import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const {
    user,
    logout,
    isAuthenticated
  } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          🌾 FarmHub
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          {/* Left Navigation */}
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </li>

            {/* ADMIN ONLY */}
            {isAuthenticated && user?.role === "ADMIN" && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/category-management"
                >
                  Manage Categories
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="d-flex align-items-center">

            {/* Search */}
            <form
              className="d-flex me-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="form-control"
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
              />
            </form>

            {/* NOT LOGGED IN */}
            {!isAuthenticated ? (
              <>
                <Link
                  className="btn btn-outline-light me-2"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="btn btn-warning"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {/* Logged-in user */}
                <span className="text-white me-3">
                  Hi, {user?.name}
                  {user?.role && ` (${user.role})`}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;