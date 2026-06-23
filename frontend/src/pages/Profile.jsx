import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {

  const { user } = useContext(AuthContext);

  if (!user) {

    return <h2>Please Login</h2>;

  }

  return (

    <div className="container mt-5">

      <h1>Profile</h1>

      <h4>Name: {user.username}</h4>

      <h4>Email: {user.email}</h4>

      <h4>Role: {user.role}</h4>

    </div>

  );

}

export default Profile;