import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/tours" element={<Tours />} />

        <Route path="/tours/:id" element={<TourDetails />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/booking" element={<Booking />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/admin" element={<Admin />} />
      </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;