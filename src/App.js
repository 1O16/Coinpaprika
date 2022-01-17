import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [price, setPrice] = useState();
  const [money, setMoney] = useState();
  const onChange = (event) => {
    setPrice(event.target.value);
    setMoney();
  };
  const inputMoney = (event) => {
    setMoney(event.target.value);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins {loading ? "" : `: ${coins.length} kinds of coins`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          <option>-</option>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={coin.quotes.USD.price}
              id={coin.symbol}
              symbol={coin.symbol}
            >
              {coin.name}({coin.symbol}) : ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        <br />
        <input
          type="number"
          value={money}
          onChange={inputMoney}
          placeholder="How much you have?"
        />{" "}
        $
      </div>
      <h1>You can get {money / price} Coins</h1>
    </div>
  );
}
export default App;
