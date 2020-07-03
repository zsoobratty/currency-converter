import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './components/CurrencyRow'

const API = 'https://api.exchangeratesapi.io/latest'

function App() {
  const [ currency, setCurrency ] = useState([])
  const [ fromCurrency, setFromCurrency ] = useState()
  const [ toCurrency, setToCurrency ] = useState()


  console.log(currency)

  useEffect(() => {
    fetch(API)
    .then(res => res.json())
    .then(data => {
      const firstCurrency = Object.keys(data.rates)[0]
      setCurrency([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
    })
  }, [])

  return (
    <div>
      <h1>Convert</h1>
      <CurrencyRow 
        currency={currency}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
      />
      <div className='equals'>=</div>
      <CurrencyRow
        currency={currency}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
      />
    </div>
  );
}

export default App;
