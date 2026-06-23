import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Admin() {
  const { user } = useContext(AuthContext);

  const [tours, setTours] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchTours();
    }
  }, [user]);

  const fetchTours = async () => {
    try {
      const response = await api.get("/tours");

      setTours(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createTour = async () => {
  try {

    await api.post("/tours", {
      title: "Goa Beach Tour",
      city: "Goa",
      address: "Calangute",
      distance: 100,
      photo: "goa.jpg",
      desc: "Enjoy beaches and nightlife",
      price: 12000,
      maxGroupSize: 15,
      featured: true
    });

    alert("Tour created");

    fetchTours();

  } catch (error) {

    console.log(error);

  }
};

  const deleteTour = async (id) => {
    try {
      await api.delete(`/tours/${id}`);

      alert("Tour deleted");

      fetchTours();

    } catch (error) {
      console.log(error);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="container mt-5">
        <h2>Access Denied</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5">

      <h1>Admin Dashboard</h1>
      <h3>Add New Tour</h3>

<button
  className="btn btn-success mb-4"
  onClick={createTour}
>
  Add Sample Tour
</button>

      <h3>All Tours</h3>

      {tours.map((tour) => (
        <div
          key={tour._id}
          className="card p-3 mb-3"
        >
          <h4>{tour.title}</h4>

          <p>{tour.city}</p>

          <p>₹ {tour.price}</p>

          <button
            className="btn btn-danger"
            onClick={() => deleteTour(tour._id)}
          >
            Delete Tour
          </button>

        </div>
      ))}

    </div>
  );
}

export default Admin;