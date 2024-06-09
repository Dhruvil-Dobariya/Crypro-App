import { useContext, useEffect, useState } from "react";
import "../Home/Home.css";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const TopLooser = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });

  const LoadMore = () => {
    setVisibleRange((prevRange) => ({
      start: prevRange.end,
      end: prevRange.end + 15,
    }));
  };

  useEffect(() => {
    const filteredAndSortedCoins = allCoin
      .filter((coin) => coin.price_change_percentage_24h < 0)
      .sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h
      );

    setDisplayCoin(filteredAndSortedCoins);
  }, [allCoin]);

  return (
    <div>
      <div className="home">
        <div className="hero">
          <div className="crypto-table">
            <div className="table-layout">
              <p>Rank</p>
              <p>Coins</p>
              <p>Price</p>
              <p style={{ textAlign: "center" }}>24H Change</p>
              <p className="marketcap">Market Cap</p>
            </div>
            {displayCoin.slice(0, visibleRange.end).map((item, index) => (
              <Link
                to={`/coin/${item.id}`}
                className="table-layout"
                key={index}
              >
                <p>{item.market_cap_rank}</p>
                <div>
                  <img src={item.image} alt="Coin_Logo" />
                  <p style={{ textAlign: "left" }}>
                    {item.name + " - " + item.symbol}
                  </p>
                </div>
                <p>
                  {currency.symbol}
                  {item.current_price.toLocaleString()}
                </p>
                <p
                  className={
                    item.price_change_percentage_24h > 0 ? "green" : "red"
                  }
                >
                  {Math.floor(item.price_change_percentage_24h * 100) / 100 +
                    "%"}
                </p>
                <p className="marketcap">
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
          {visibleRange.end < displayCoin.length && (
            <button className="loadmore " onClick={LoadMore}>
              Load More
            </button>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

export default TopLooser;
