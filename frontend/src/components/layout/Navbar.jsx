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
    isAuthenticated
  } = useAuth();



  const [cartCount, setCartCount] = useState(0);



  const handleLogout = () => {

    logout();

    navigate("/");

  };




  useEffect(() => {


    const loadCartCount = async () => {


      if(isAuthenticated && user?.role === "CONSUMER") {


        try {


          const cart =
            await cartService.getCart();


          setCartCount(
            cart?.items?.length || 0
          );


        }
        catch(error){


          console.log(
            "Cart count error:",
            error
          );


          setCartCount(0);

        }


      }


    };


    loadCartCount();


  }, [isAuthenticated, user]);






  const navLinkClass = ({isActive}) =>

    isActive
      ? "nav-link active fw-bold"
      : "nav-link";






return (

<nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm">


<div className="container">



{/* Logo */}

<Link
className="navbar-brand fw-bold fs-4"
to="/"
>

🌾 FarmHub

</Link>





{/* Mobile Button */}

<button

className="navbar-toggler"

type="button"

data-bs-toggle="collapse"

data-bs-target="#navbarMenu"

>

<span className="navbar-toggler-icon"></span>

</button>





<div

className="collapse navbar-collapse"

id="navbarMenu"

>



{/* LEFT MENU */}

<ul className="navbar-nav me-auto mb-2 mb-lg-0">



<li className="nav-item">

<NavLink
className={navLinkClass}
to="/"
>

Home

</NavLink>

</li>





<li className="nav-item">

<NavLink
className={navLinkClass}
to="/products"
>

Products

</NavLink>

</li>





<li className="nav-item">

<NavLink
className={navLinkClass}
to="/categories"
>

Categories

</NavLink>

</li>





{/* CUSTOMER MENU */}


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

to="/orders"

>

My Orders

</NavLink>


</li>


</>

}







{/* ADMIN DROPDOWN */}



{
isAuthenticated &&
user?.role === "ADMIN" &&


<li className="nav-item dropdown">


<a

className="nav-link dropdown-toggle"

href="#"

role="button"

data-bs-toggle="dropdown"

>

Admin

</a>





<ul className="dropdown-menu">


<li>

<Link

className="dropdown-item"

to="/category-management"

>

Manage Categories

</Link>

</li>





<li>

<Link

className="dropdown-item"

to="/admin/users"

>

Manage Users

</Link>

</li>





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







<li className="nav-item">

<NavLink

className={navLinkClass}

to="/about"

>

About

</NavLink>

</li>





<li className="nav-item">

<NavLink

className={navLinkClass}

to="/contact"

>

Contact

</NavLink>

</li>






</ul>









{/* RIGHT SIDE */}



<div className="d-flex align-items-center gap-2">





{/* Search */}


<form

className="d-flex"

onSubmit={(e)=>e.preventDefault()}

>


<input

className="form-control"

type="search"

placeholder="Search..."

/>


</form>









{/* NOT LOGIN */}



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









{/* LOGGED IN */}



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

<span className="dropdown-item-text">

Role: {user?.role}

</span>

</li>




<li>
<hr className="dropdown-divider"/>
</li>




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