import { Link, useLocation } from "react-router-dom";
import "../css/static.css";
const Catergory = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <nav>
      <Link to="/" className={pathname === "/" ? "active" : "category"}>
        All
      </Link>
      <Link
        to="/products/electronics"
        className={pathname === "/products/electronics" ? "active" : "category"}
      >
        Electronics
      </Link>
      <Link
        to="/products/deco"
        className={pathname === "/products/deco" ? "active" : "category"}
      >
        Deco
      </Link>
    </nav>
  );
};

export default Catergory;
