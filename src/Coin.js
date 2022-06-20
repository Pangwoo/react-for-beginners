import {useState, useEffect} from "react";

function Coin() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [convert, setConvert] = useState(false);
  const [amount, setAmount] = useState(0);
  const [select, setSelect] = useState("default");
  const onClick = () => {
    setAmount(0);
    setConvert((current) => !current);
  }
  const reset = () => {
    setAmount(0);
    setSelect("default");
  }
  const onChange = (event) => {
    setAmount(event.target.value);
  }
  const onSelect = (event) => {
    setSelect(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=3000")
    .then((response) => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  } , [])
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>
          Loading...
        </strong>
      ) : (
        <div>
          <select onChange = {onSelect}>
            <option value="default">
              Select your coin!
            </option>
            {coins.map((coin) => (
              <option value = {parseInt(coin.rank)-1} key = {coin.id}>
                {coin.rank}. {coin.name} ({coin.symbol}): $ {(coin.quotes.USD.price)} USD
              </option>
            ))}
          </select>
          <hr/>
          <label>
            Dollar $ 
          </label>
          <input 
            placeholder = "USD" 
            onChange = {onChange}
            value = {convert? (
              (select !== "default") ? (
                amount*coins[select].quotes.USD.price
              ) : (
                "0"
              )) : (
                amount
              )}
            type ="number"
            disabled = {convert}
          >
          </input>
          <button onClick={onClick}>↔</button>
          <label>
            {(select !== "default") ? (
              coins[select].symbol
            ) : (
              "select your coin"
            )}
          </label>
          <input 
            placeholder = "BTC"
            onChange = {onChange}
            value = {(convert)? (
              amount
              ) : (
                (select !== "default") ? (
                  amount/coins[select].quotes.USD.price
                ) : (
                  "0"
            ))}
            disabled = {!convert}
            type ="number"
          >
          </input>
          <div>
            <button
              onClick = {reset}
            >Reset
            </button>
          </div>
          <div>
            <h1>
              {(select !== "default") ? (
                coins[select].name + " : $" + coins[select].quotes.USD.price
              ) : (
                "Select your coin"
              )}
            </h1>
          </div>
        </div>)
      } 
    </div>
  );
}



export default Coin;
