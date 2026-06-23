import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser, setToken } = useContext(AuthContext);

  const handleLogin = async () => {

    try {

      const response = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

      setToken(response.data.token);

      setUser(response.data.data);

      alert("Login successful");

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <div className="container mt-5">

      <h1>Login</h1>

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
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  );
}

export default Login;