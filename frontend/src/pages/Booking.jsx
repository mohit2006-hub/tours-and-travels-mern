import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Booking() {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await api.get(
        `/bookings/${user.id}`
      );

      setBookings(response.data.data);

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

      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="card p-3 mb-3"
          >
            <h4>{booking.tourId?.title}</h4>

            <p>
              Guests: {booking.guestSize}
            </p>

            <p>
              Date: {booking.bookAt?.substring(0,10)}
            </p>

            <p>
              Status: {booking.paymentStatus}
            </p>

          </div>
        ))
      )}

    </div>
  );
}

export default Booking;