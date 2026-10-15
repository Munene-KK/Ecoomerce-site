import { useParams } from "react-router-dom";
import { API } from "../componets/API";
import useTitle from "../componets/UseTitle";
import { useEffect, useState } from "react";
import CartNavBar from "../componets/CartNavBar";
import { RiDeleteBin6Fill } from "react-icons/ri";

import "../css/cart.css";
const Cart = () => {
  useTitle("Cart");
  const { id } = useParams();
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || [],
  );

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        const product = response.data;
        setCart((prev) => {
          if (prev.some((item) => item._id === product._id)) return prev;
          return [...prev, product];
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const handleDelete = (id) => {
    const removeProduct = cart.filter((p) => p._id !== id);
    setCart(removeProduct);
  };
  return (
    <main>
      <CartNavBar cart={cart} />
      <main className="main">
        {cart && cart.length > 0 ? (
          cart.map((product) => (
            <div>
              <figure key={product._id} className="buy-items">
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  loading="lazy"
                />
                <div>
                  <figcaption>{product.description}</figcaption>
                  <strong>
                    <p>
                      <span className="price">
                        Ksh {product.price.toLocaleString("en-US")}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        className="remove"
                        onClick={() => handleDelete(product._id)}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    </p>
                  </strong>
                </div>
              </figure>
            </div>
          ))
        ) : (
          <p>No products yet</p>
        )}
      </main>
    </main>
  );
};

export default Cart;
