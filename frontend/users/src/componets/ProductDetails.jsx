import { Link } from "react-router-dom";
import "../css/home.css";
const ProductDetails = ({ product }) => {
  return (
    <Link className="product-details" to={`/products/buy/${product._id}`}>
      <figure>
        <img src={product.image} alt={product.name} width={350} height={250} />
        <figcaption>{product.description}</figcaption>
        <p className="price">
          <span>Ksh {product.price.toLocaleString("en-US")}</span>
          &nbsp; &nbsp; &nbsp;
          <span>{product.status}</span>
        </p>
      </figure>
    </Link>
  );
};

export default ProductDetails;
