import { useState, useEffect } from 'react';
import useCurrencyInfo from './hooks/useCurInfo';
import InputBox from './components/InputBox'; 
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const { exchangeRates, allCurrencies } = useCurrencyInfo(from);

  // Convert amount when input changes or currency updates
  useEffect(() => {
    if (exchangeRates[to]) {
      setConvertedAmount(amount * exchangeRates[to]);
    }
  }, [amount, from, to, exchangeRates]);

  const swap = () => {
    setAmount(convertedAmount);
    setConvertedAmount(amount);
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="app-container">
      <div className="content-box">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-section">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={allCurrencies} // Shows all currencies
              onCurrencyChange={setFrom}
              onAmountChange={setAmount}
              selectedCurrency={from}
            />
          </div>

          <div className="swap-section">
            <button type="button" className="swap-button" onClick={swap}>
              Swap
            </button>
          </div>

          <div className="input-section">
            <InputBox
              label="To"
              amount={convertedAmount.toFixed(2)} // Shows rounded value
              currencyOptions={allCurrencies} // Shows all currencies
              onCurrencyChange={setTo}
              selectedCurrency={to}
              amountDisabled
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
