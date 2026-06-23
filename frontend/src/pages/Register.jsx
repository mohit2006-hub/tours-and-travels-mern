import { useState } from "react";
import api from "../services/api";

function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    try {

      await api.post("/auth/register", {
        username,
        email,
        password
      });

      alert("Registration successful");

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="container mt-5">

      <h1>Register</h1>

      <input
        className="form-control mb-3"
        placeholder="Username"
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handleRegister}
      >
        Register
      </button>

    </div>
  );
}

export default Register;