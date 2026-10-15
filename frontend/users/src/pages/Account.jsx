import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/account.css";
import { API } from "../componets/API";
const Account = () => {
  const navigate = useNavigate();
  const [logedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("loggedIn")),
  );

  const handleLogout = async () => {
    try {
      await API.post(`/users/logout/${logedIn._id}`);
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("cart");
      setLoggedIn(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const initial1 = logedIn?.firstname?.charAt(0);
  const initial2 = logedIn?.lastname?.charAt(0);
  return (
    <main className="account-home">
      {logedIn ? (
        <div className="account">
          <div className="profile">
            {initial1} {initial2}
          </div>
          <p>User_id: {logedIn._id}</p>
          <h3>
            Name : {logedIn.firstname} &nbsp; {logedIn.lastname}
          </h3>
          <p>Status: Active</p>
          <h4>Email: {logedIn.email}</h4>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
    </main>
  );
};

export default Account;
