import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow'

const API = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [ currency, setCurrency ] = useState([])
  const [ fromCurrency, setFromCurrency ] = useState()
  const [ toCurrency, setToCurrency ] = useState()
  const [ exchangeRate, setExchangeRate ] = useState()
  const [ amount, setAmount ] = useState(1)
  const [ amountInFromCurrency, setAmountInFromCurrency ] = useState(true)

  let toAmount, fromAmount
  if(amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }


  useEffect(() => {
    fetch(API)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrency([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])

  useEffect(() => {
    if(fromCurrency && toCurrency) {
      fetch(`${API}?base=${fromCurrency}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  const handleToAmountChange = (e) => {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow 
        currency={currency}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        currency={currency}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={toAmount}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
