import { Link } from "react-router-dom";

function TourCard({ tour }) {
  return (
    <div className="card shadow">

      <img
        src="https://picsum.photos/300/200"
        className="card-img-top"
        alt=""
      />

      <div className="card-body">

        <h4>{tour.title}</h4>

        <p>{tour.city}</p>

        <h5>₹ {tour.price}</h5>

        <Link
          to={`/tours/${tour._id}`}
          className="btn btn-primary"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default TourCard;