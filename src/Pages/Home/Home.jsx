import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);

    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });

    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto MarketPlace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. <br /> Sign
          up to explore more crypros...
        </p>

        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="Search Crypto"
            onChange={inputHandler}
            value={input}
            required
            list="coinList"
          />

          <dataList id="coinList">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </dataList>

          <button type="submit"> Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>Rank</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="marketcap">Market Cap</p>
        </div>
        {displayCoin.slice(0, 15).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="Coin_Logo" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol}
              {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100 + "%"}
            </p>
            <p className="marketcap">
              {currency.symbol}
              {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Home;
