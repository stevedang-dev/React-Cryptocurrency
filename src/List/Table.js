import React from 'react';
import './Table.css';
import PropTypes from 'prop-types';

// Functional because we don't have to use state here :)
const Table = (props) => {

    return (
        <div className="Table-container">
            <table className="Table">
                <thead className="Table-head">
                    <tr>
                        <th>Cryptocurrency</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                        <th>24H Change</th>
                    </tr>
                </thead>
                <tbody className="Table-body">
                    {props.currencies.map((currency) => (
                        <tr key={currency.id}>
                            <td>
                                <span className="Table-rank">{currency.rank}</span>
                                {currency.name}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.price}
                            </td>
                            <td>
                                <span className="Table-dollar">$</span>
                                {currency.marketCap}
                            </td>
                            <td>
                                {props.renderChangePercent(currency.percentChange24h)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Checking type:
Table.propTypes = {
    /* Error:
        Warning: Failed prop type: Invalid prop `currencies` of type 
        `array` supplied to `Table`, expected `string`.
    */
    // currencies: PropTypes.string,
    currencies: PropTypes.array.isRequired,
    renderChangePercent: PropTypes.func.isRequired
}

export default Table;
