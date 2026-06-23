import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  // 1. Destructure the auth context and define the logout handler
  const { user, setUser, setToken } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          TourEase
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/tours">
            Tours
          </Link>

          <Link className="nav-link" to="/wishlist">
            Wishlist
          </Link>

          
          {user ? (
  <>
    <Link className="nav-link" to="/profile">
      Profile
    </Link>

<Link className="nav-link" to="/booking">
  My Bookings
</Link>
{
  user?.role === "admin" && (
    <Link className="nav-link" to="/admin">
      Admin
    </Link>
  )
}
    <button
      className="btn btn-danger ms-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
) : (
  <>
    <Link className="nav-link" to="/login">
      Login
    </Link>

    <Link className="nav-link" to="/register">
      Register
    </Link>

  </>
)}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;