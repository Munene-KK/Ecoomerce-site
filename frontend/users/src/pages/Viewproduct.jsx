import { useNavigate, useParams, Navigate, Link } from "react-router-dom";
import { API } from "../componets/API";
import { useEffect, useState } from "react";
import UseTitle from "../componets/UseTitle";

import "../css/buy.css";
const Viewproduct = () => {
  const logedIn = JSON.parse(localStorage.getItem("loggedIn"));
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [recomended, setRecomended] = useState([]);
  const [loading, setIsloading] = useState(true);
  const [loadRecomeds, setLoadRecomeds] = useState([]);
  const handleCart = async () => {
    if (!logedIn) {
      navigate("/users/login");
    } else {
      navigate(`/products/account/cart/${product._id}`);
    }
  };
  const handlePayment = () => {
    if (!logedIn) {
      navigate("/users/login");
    } else {
      const message = `Hi I'd like to buy ${product.description}`;
      const url = `https://wa.me/254754706088?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };
  UseTitle(`buy ${product.name}`);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchProduct();
  }, [id]);
  useEffect(() => {
    const fetchRecomendedProducts = async () => {
      try {
        const response = await API.get("/products");
        const related = response.data.filter(
          (p) => p.category.includes(product.category) && p._id !== product._id,
        );
        setRecomended(related);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadRecomeds(false);
      }
    };
    fetchRecomendedProducts();
  }, [product._id, product.category]);
  return (
    <main>
      <main className="view-products">
        {loading ? (
          <p className="loading"></p>
        ) : product ? (
          <section>
            <article>
              <figure className="figure" key={product._id}>
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  loading="lazy"
                />
                <div className="describe">
                  <strong>
                    <p className="center">Description</p>
                  </strong>
                  <p>{product.description}</p>
                  <strong>
                    <p className="price center">
                      Ksh {product.price.toLocaleString("en-US")}
                      &nbsp;&nbsp;&nbsp;
                      {product.status}
                    </p>
                  </strong>
                  <p className="center">
                    <Link className="buy-now action" onClick={handlePayment}>
                      Buy now
                    </Link>
                    <Link className="add-to-cart action" onClick={handleCart}>
                      Add to cart
                    </Link>
                  </p>
                </div>
              </figure>
            </article>
            <h3 className="like-header">You might also like</h3>
            <div className="recomended-products">
              {loadRecomeds ? (
                <p className="loading"></p>
              ) : (
                recomended.map((recomend) => (
                  <Link
                    style={{ marginTop: "0.5rem" }}
                    className="product-details reco-box"
                    to={`/products/buy/${recomend._id}`}
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    <figure key={recomend._id}>
                      <img
                        src={recomend.image}
                        alt={recomend.name}
                        width={350}
                        height={250}
                      />
                      <figcaption>{recomend.description}</figcaption>
                      <p className="price">
                        <span>
                          Ksh {recomend.price.toLocaleString("en-US")}
                        </span>
                        &nbsp; &nbsp; &nbsp;
                        <span>{recomend.status}</span>
                      </p>
                    </figure>
                  </Link>
                ))
              )}
            </div>
          </section>
        ) : (
          <Navigate to="/" replace />
        )}
      </main>
    </main>
  );
};

export default Viewproduct;
