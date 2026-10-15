import "../css/static.css";
import { Link } from "react-router-dom";
import { MdWavingHand } from "react-icons/md";
const CartNavBar = ({ cart }) => {
  const user = JSON.parse(localStorage.getItem("loggedIn"));
  const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const handleCheckout = () => {
    const message = `Hi I'd like to buy ${cart.map((p) => p.description)}`;
    const url = `https://wa.me/254754706088?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  return (
    <header style={{ marginBottom: "-3.5rem" }}>
      <abbr title="Masoko Home">
        <h2>
          <Link to="/" className="back-home" style={{ color: "#000" }}>
            Hello {user.lastname} <MdWavingHand className="hello" />
          </Link>
        </h2>
      </abbr>
      {cart && (
        <button className="check-out" onClick={handleCheckout}>
          Checkout &nbsp; &nbsp; {total.toLocaleString("en-US")}
        </button>
      )}
    </header>
  );
};

export default CartNavBar;
