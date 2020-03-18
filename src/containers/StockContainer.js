import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stockData.map( (stock, index) => {
          return (
            <Stock key={`${stock.name} - ${index}`} stock={stock} handleClick={this.props.buyStock}/>
          )
          })
        }
      </div>
    );
  }

}

export default StockContainer;
