import { Link, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import cartService from "../../services/cartService";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const {
    user,
    logout,
    isAuthenticated,
  } = useAuth();

  const [cartCount, setCartCount] = useState(0);


  // ================= LOGOUT =================

  const handleLogout = () => {

    logout();
    navigate("/");
  };


  // ================= CART COUNT =================

  useEffect(() => {

    const loadCartCount = async () => {

      if (
        isAuthenticated &&
        user?.role === "CONSUMER"
      ) {

        try {

          const cart =
            await cartService.getCart();

          setCartCount(
            cart?.items?.length || 0
          );

        } catch (error) {

          console.log(
            "Cart count error:",
            error
          );

          setCartCount(0);
        }

      } else {

        setCartCount(0);
      }
    };

    loadCartCount();

  }, [isAuthenticated, user]);


  // ================= ACTIVE LINK =================

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "nav-link active fw-bold"
      : "nav-link";


  return (

    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">

      <div className="container">


        {/* ================= LOGO ================= */}

        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          🌾 FarmHub
        </Link>


        {/* ================= MOBILE BUTTON ================= */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        <div
          className="collapse navbar-collapse"
          id="navbarMenu"
        >


          {/* ================= LEFT MENU ================= */}

          <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            {/* HOME */}

            <li className="nav-item">

              <NavLink
                className={navLinkClass}
                to="/"
              >
                Home
              </NavLink>

            </li>


            {/* PRODUCTS */}

            <li className="nav-item">

              <NavLink
                className={navLinkClass}
                to="/products"
              >
                Products
              </NavLink>

            </li>


            {/* CATEGORIES */}

            <li className="nav-item">

              <NavLink
                className={navLinkClass}
                to="/categories"
              >
                Categories
              </NavLink>

            </li>


            {/* ================= CUSTOMER MENU ================= */}

            {
              isAuthenticated &&
              user?.role === "CONSUMER" &&

              <>

                <li className="nav-item">

                  <NavLink
                    className={navLinkClass}
                    to="/cart"
                  >

                    🛒 Cart

                    {
                      cartCount > 0 &&

                      <span className="badge bg-warning text-dark ms-1">
                        {cartCount}
                      </span>
                    }

                  </NavLink>

                </li>


                <li className="nav-item">

                  <NavLink
                    className={navLinkClass}
                    to="/wishlist"
                  >
                    ❤️ Wishlist
                  </NavLink>

                </li>


                <li className="nav-item">

                  <NavLink
                    className={navLinkClass}
                    to="/orders"
                  >
                    My Orders
                  </NavLink>

                </li>

              </>
            }


            {/* ================= FARMER MENU ================= */}

            {
              isAuthenticated &&
              user?.role === "FARMER" &&

              <li className="nav-item dropdown">

                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={(e) => e.preventDefault()}
                >
                  Farmer
                </a>


                <ul className="dropdown-menu">


                  {/* FARMER PRODUCTS */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/farmer/products"
                    >
                      🌾 Manage Products
                    </Link>

                  </li>


                  {/* ADD PRODUCT */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/farmer/products/add"
                    >
                      ➕ Add Product
                    </Link>

                  </li>


                  <li>
                    <hr className="dropdown-divider" />
                  </li>


                  {/* FARMER ORDERS */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/farmer/orders"
                    >
                      📦 Manage Orders
                    </Link>

                  </li>


                </ul>

              </li>
            }


            {/* ================= ADMIN MENU ================= */}

            {
              isAuthenticated &&
              user?.role === "ADMIN" &&

              <li className="nav-item dropdown">


                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  onClick={(e) => e.preventDefault()}
                >
                  Admin
                </a>


                <ul className="dropdown-menu">


                  {/* DASHBOARD */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/admin/dashboard"
                    >
                      📊 Dashboard
                    </Link>

                  </li>


                  <li>
                    <hr className="dropdown-divider" />
                  </li>


                  {/* CATEGORIES */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/category-management"
                    >
                      Manage Categories
                    </Link>

                  </li>


                  {/* PRODUCTS */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/admin/products"
                    >
                      Manage Products
                    </Link>

                  </li>


                  {/* ORDERS */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/admin/orders"
                    >
                      Manage Orders
                    </Link>

                  </li>


                  {/* USERS */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/admin/users"
                    >
                      Manage Users
                    </Link>

                  </li>


                  {/* FARMER APPROVAL */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/admin/farmers"
                    >
                      Farmer Approval
                    </Link>

                  </li>


                </ul>

              </li>
            }


            {/* ================= ABOUT ================= */}

            <li className="nav-item">

              <NavLink
                className={navLinkClass}
                to="/about"
              >
                About
              </NavLink>

            </li>


            {/* ================= CONTACT ================= */}

            <li className="nav-item">

              <NavLink
                className={navLinkClass}
                to="/contact"
              >
                Contact
              </NavLink>

            </li>

          </ul>


          {/* ================= RIGHT SIDE ================= */}

          <div className="d-flex align-items-center gap-2">


            {/* SEARCH */}

            <form
              className="d-flex"
              onSubmit={(e) =>
                e.preventDefault()
              }
            >

              <input
                className="form-control"
                type="search"
                placeholder="Search..."
              />

            </form>


            {/* ================= NOT LOGGED IN ================= */}

            {
              !isAuthenticated &&

              <>

                <Link
                  className="btn btn-outline-light"
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
            }


            {/* ================= LOGGED IN ================= */}

            {
              isAuthenticated &&

              <div className="dropdown">


                <button
                  className="btn btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  👤 {user?.name}
                </button>


                <ul className="dropdown-menu dropdown-menu-end">


                  <li>

                    <span className="dropdown-item-text fw-bold">
                      {user?.name}
                    </span>

                  </li>


                  <li>

                    <span className="dropdown-item-text">
                      Role: {user?.role}
                    </span>

                  </li>


                  <li>
                    <hr className="dropdown-divider" />
                  </li>


                  {/* PROFILE */}

                  <li>

                    <Link
                      className="dropdown-item"
                      to="/profile"
                    >
                      👤 My Profile
                    </Link>

                  </li>


                  {/* CUSTOMER ORDERS */}

                  {
                    user?.role === "CONSUMER" &&

                    <li>

                      <Link
                        className="dropdown-item"
                        to="/orders"
                      >
                        📦 My Orders
                      </Link>

                    </li>
                  }


                  {/* FARMER PRODUCTS */}

                  {
                    user?.role === "FARMER" &&

                    <li>

                      <Link
                        className="dropdown-item"
                        to="/farmer/products"
                      >
                        🌾 My Products
                      </Link>

                    </li>
                  }


                  {/* FARMER ORDERS */}

                  {
                    user?.role === "FARMER" &&

                    <li>

                      <Link
                        className="dropdown-item"
                        to="/farmer/orders"
                      >
                        📦 Farmer Orders
                      </Link>

                    </li>
                  }


                  {/* ADMIN DASHBOARD */}

                  {
                    user?.role === "ADMIN" &&

                    <li>

                      <Link
                        className="dropdown-item"
                        to="/admin/dashboard"
                      >
                        📊 Admin Dashboard
                      </Link>

                    </li>
                  }


                  <li>
                    <hr className="dropdown-divider" />
                  </li>


                  {/* LOGOUT */}

                  <li>

                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </li>


                </ul>

              </div>
            }


          </div>

        </div>

      </div>

    </nav>
  );
}


export default Navbar;