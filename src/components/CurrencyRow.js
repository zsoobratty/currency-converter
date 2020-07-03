import React from 'react'

export default function CurrencyRow( {currency, selectedCurrency, onChangeCurrency, amount, onChangeAmount} ) {
    return (
        <div>
            <input type="number" className='input' value={amount} onChange={onChangeAmount}/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currency.map(option => (
            <option key={option} value={option}>{option}</option>
            ))}
            </select>
        </div>
    )
}
