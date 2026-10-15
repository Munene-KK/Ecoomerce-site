import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import { Link } from "react-router-dom";
import "../css/static.css";
import { API } from "./API";
import { useState, useEffect } from "react";
import { FaCartArrowDown } from "react-icons/fa6";
const Navbar = () => {
  const logedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const shopping = JSON.parse(localStorage.getItem("cart")) || [];

  const [search, setSearch] = useState("");
  const initial1 = logedIn?.firstname?.charAt(0);
  const initial2 = logedIn?.lastname?.charAt(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await API.get("/products");
        const relevant = response.data.filter(
          (p) =>
            p.name?.toLowerCase().includes(search.toLowerCase()) ||
            p.category?.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase()),
        );
        setProducts(relevant);
      } catch (err) {
        console.log(err);
      }
    };
    fetchproducts();
  }, [search]);
  return (
    <header>
      <h2>
        <Link to="/" className="back-home">
          Masoko <GiShoppingCart />
        </Link>
      </h2>
      <span>
        <input
          type="text"
          placeholder="I am looking for..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p>
          {search &&
            products &&
            products.map((product) => (
              <div className="search-box" key={product._id}>
                <Link
                  className="top-search"
                  to={`/products/buy/${product._id}`}
                  onClick={() => setSearch("")}
                >
                  <span>{product.description}</span>
                  <img
                    src={product.image}
                    alt={product.name}
                    width={90}
                    height={70}
                  />
                </Link>
              </div>
            ))}
        </p>
      </span>
      <div>
        <span className="profile-details">
          {logedIn && (
            <span>
              <Link className="initials" to="/user/account">
                <abbr title="Accout">
                  <span>{initial1}</span>
                  &nbsp;
                  <span>{initial2}</span>
                </abbr>
              </Link>
              <Link className="cart-view" to="/products/viewcart">
                <span>{shopping.length || "0"}</span>
                <FaCartArrowDown className="shop" />
              </Link>
            </span>
          )}
          {!logedIn && (
            <span className="logged-out">
              <IoMdContact className="default-profile" />
              <Link className="login" to="/users/login">
                Log in
              </Link>
            </span>
          )}
        </span>
      </div>
    </header>
  );
};

export default Navbar;
