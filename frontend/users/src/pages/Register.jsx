import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { API } from "../componets/API";
import { useState } from "react";
import useTitle from "../componets/UseTitle";
import toast from "react-hot-toast";

const Register = () => {
  useTitle("Sign up");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //firstname, lastname, email, password
  const newUser = { firstname, lastname, email, password };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: user } = await API.post("/users/register", newUser);
      localStorage.setItem("loggedIn", JSON.stringify(user));
      toast.success("Signed up succesfully");
      navigate("/");
      setLoading(true);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };
  return (
    <main className="auth">
      <form onSubmit={handleSubmit}>
        <div className="logo">
          <img src={Logo} alt="Masoko Logo" width={100} />
          <h3>Log in To Masoko </h3>
        </div>
        <article>
          <label>First Name</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </article>
        <article>
          <label>LastName</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </article>
        <article>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </article>
        <article>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </article>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Sign Up"}
        </button>
        <p>
          Have an acount? <Link to="/users/login">Log in</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
