import { useEffect, useState } from "react";
import api from "../services/api";
import TourCard from "../components/TourCard";

function Tours() {
  const [tours, setTours] = useState([]);
const [city, setCity] = useState("");
  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await api.get("/tours");

      setTours(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const searchTours = async () => {
  try {

    if (city === "") {
      fetchTours();
      return;
    }

    const response = await api.get(`/tours/search?city=${city}`);

    setTours(response.data.data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="container mt-5">

      <h1>All Tours</h1>
<div className="row mb-4">

  <div className="col-md-4">

    <input
      type="text"
      className="form-control"
      placeholder="Search by city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
    />

  </div>

  <div className="col-md-2">

    <button
      className="btn btn-primary"
      onClick={searchTours}
    >
      Search
    </button>

  </div>

</div>
      <div className="row">

        {tours.map((tour) => (
          <div className="col-md-4 mb-4" key={tour._id}>
            <TourCard tour={tour} />
          </div>
        ))}

      </div>

    </div>
  );
}

export default Tours;