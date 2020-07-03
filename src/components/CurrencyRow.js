import React from 'react'

export default function CurrencyRow( {currency, selectedCurrency, onChangeCurrency} ) {
    return (
        <div>
            <input type="number" className='input'/>
            <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currency.map(option => (
            <option key={option} value={option}>{option}</option>
            ))}
            </select>
        </div>
    )
}
