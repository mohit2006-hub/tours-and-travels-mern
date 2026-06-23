import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Wishlist() {

  const { user } = useContext(AuthContext);
  const userId = user?._id || user?.id;

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    if (user) {
      fetchWishlist();
    }

  }, [user]);

  const fetchWishlist = async () => {

    try {

      const response = await api.get(
        `/wishlist/${user.id}`
      );

      setWishlist(response.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!user) {

    return (
      <div className="container mt-5">
        <h2>Please Login First</h2>
      </div>
    );

  }

  return (
    <div className="container mt-5">

      <h1>My Wishlist ❤️</h1>

      {
        wishlist.length === 0 ? (
          <p>No tours saved.</p>
        ) : (
          wishlist.map((tour) => (
            <div
              key={tour._id}
              className="card p-3 mb-3"
            >
              <h4>{tour.title}</h4>

              <p>{tour.city}</p>

              <h5>₹ {tour.price}</h5>

            </div>
          ))
        )
      }

    </div>
  );
}

export default Wishlist;