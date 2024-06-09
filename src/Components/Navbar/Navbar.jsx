import "./Navbar.css";
import logo from "../../Assets/Icons/trading.png";
import { useContext, useState } from "react";
import { CoinContext } from "./../../Context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      case "euro": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <ul className={isMenuOpen ? "show" : ""}>
        <Link to="/" onClick={toggleMenu}>
          <li>Home</li>
        </Link>
        <Link to="/topGainer" onClick={toggleMenu}>
          <li>Top Gainers</li>
        </Link>
        <Link to="/TopLooser" onClick={toggleMenu}>
          <li>Top Loosers</li>
        </Link>
      </ul>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="inr">INR</option>
          <option value="euro">EURO</option>
        </select>

        <div
          className={`menu-icon ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
