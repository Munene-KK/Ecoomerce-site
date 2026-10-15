import UseTitle from "../../componets/UseTitle";
import { API } from "../../componets/API";
import ProductDetails from "../../componets/ProductDetails";
import { useState, useEffect } from "react";
import Catergory from "../../componets/Catergory";
const Electronics = () => {
  UseTitle("Elecronics");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await API.get("/products");
        const electronics = response.data.filter((p) =>
          p.category?.toLowerCase().includes("electronics"),
        );
        setProducts(electronics);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchproducts();
  }, []);
  return (
    <main>
      <Catergory />
      <main className="main">
        {loading ? (
          <p className="loading"></p>
        ) : products && products.length > 0 ? (
          products.map((product) => (
            <ProductDetails key={product._id} product={product} />
          ))
        ) : (
          <p>No products yet</p>
        )}
      </main>
    </main>
  );
};

export default Electronics;
