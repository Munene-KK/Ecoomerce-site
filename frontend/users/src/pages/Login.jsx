import "../css/auth.css";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import UseTitle from "../componets/UseTitle";
import { useState } from "react";
import { API } from "../componets/API";
import { toast } from "react-hot-toast";
const Login = () => {
  UseTitle("Log in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userInfo = { email, password };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: user } = await API.post("/users/login", userInfo);
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
          {loading ? "loging in..." : "Log in"}
        </button>
        <p>
          Don't have an account? <Link to="/users/signup">Sign up</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
