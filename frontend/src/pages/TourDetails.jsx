import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function TourDetails() {

  const { id } = useParams();

  const [tour, setTour] = useState(null);
const [reviews, setReviews] = useState([]);
const [fullName, setFullName] = useState("");
const [phone, setPhone] = useState("");
const [guestSize, setGuestSize] = useState(1);
const [bookAt, setBookAt] = useState("");
const { user } = useContext(AuthContext);
  useEffect(() => {
  fetchTour();
  fetchReviews();
}, []);
  const fetchTour = async () => {
    try {
      const response = await api.get(`/tours/${id}`);

      setTour(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };
  const fetchReviews = async () => {
  try {
    const response = await api.get(`/reviews/${id}`);

    setReviews(response.data.data);

  } catch (error) {
    console.log(error);
  }
};
const addToWishlist = async () => {
  try {
    if (!user) {
      alert("Please login first");
      return;
    }

    await api.post("/wishlist", {
      userId: user?._id || user?.id, 
      tourId: tour._id,
    });

    alert("Added to wishlist ❤️");
  } catch (error) {
    console.log(error);
  }
};
const createBooking = async () => {
  try {
    if (!user) {
      alert("Please login first");
      return;
    }

    // Create Razorpay Order
    const { data } = await axios.post(
      "http://localhost:5050/api/payment/create-order",
      {
        amount: tour.price * guestSize,
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "Tours & Travels",
      description: tour.title,
      order_id: data.order.id,

      handler: async function (response) {

  try {

    // Verify Payment
    const verify = await api.post("/payment/verify-payment", {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });

    if (!verify.data.success) {
      alert("Payment Verification Failed");
      return;
    }

    // Create Booking
    await api.post("/bookings", {
      userId: user?._id || user?.id,
      tourId: tour._id,
      fullName,
      phone,
      guestSize,
      bookAt,
      paymentId: response.razorpay_payment_id,
      paymentStatus: "Paid",
    });

    alert("🎉 Payment Successful! Booking Confirmed.");

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }

},

      prefill: {
        name: fullName,
        contact: phone,
      },

      theme: {
        color: "#0d6efd",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  } catch (error) {
    console.log(error);
  }
};

  if (!tour) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-5">

      <img
        src="https://picsum.photos/700/400"
        className="img-fluid rounded"
        alt=""
      />

      <h1 className="mt-3">
        {tour.title}
      </h1>

      <h4>{tour.city}</h4>

      <h3>₹ {tour.price}</h3>
      <button
  className="btn btn-danger mt-3"
  onClick={addToWishlist}
>
  ❤️ Add to Wishlist
</button>

      <p>{tour.desc}</p>

      <h5>Maximum Group Size: {tour.maxGroupSize}</h5>
      <hr />

<h2>Book This Tour</h2>

<div className="mb-3">

  <input
    type="text"
    className="form-control"
    placeholder="Full Name"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
  />

</div>

<div className="mb-3">

  <input
    type="text"
    className="form-control"
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />

</div>

<div className="mb-3">

  <input
    type="number"
    className="form-control"
    placeholder="Guests"
    value={guestSize}
    onChange={(e) => setGuestSize(e.target.value)}
  />

</div>

<div className="mb-3">

  <input
    type="date"
    className="form-control"
    value={bookAt}
    onChange={(e) => setBookAt(e.target.value)}
  />

</div>

<button
  className="btn btn-success"
  onClick={createBooking}
>
  Book Now
</button>
      <hr />

<h3>Reviews ⭐</h3>

{
  reviews.length === 0 ? (
    <p>No reviews yet.</p>
  ) : (
    reviews.map((review) => (
      <div
        key={review._id}
        className="card p-3 mb-3"
      >
        <h5>{review.username}</h5>

        <h6>⭐ {review.rating}/5</h6>

        <p>{review.reviewText}</p>

      </div>
    ))
  )
}

    </div>
  );
}

export default TourDetails;