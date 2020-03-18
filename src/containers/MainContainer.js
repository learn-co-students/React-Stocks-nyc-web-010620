import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state={
    stocks: [],
    portfolio: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
      .then(data => {this.setState({
        stocks: data
      })
    })
  }

  buyStock =(stock)=>{
    this.setState(prevState => {
      return { portfolio: [stock, ...prevState.portfolio] }
    })
  }

  sellStock =(stock)=>{
    let index = this.state.portfolio.indexOf(stock)
    let myStocks = [...this.state.portfolio]

    myStocks.splice(index, 1)
    this.setState({
      portfolio: myStocks
    })
  }

  render() {
    return (
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stockData={this.state.stocks} buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.portfolio} sellStock={this.sellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
