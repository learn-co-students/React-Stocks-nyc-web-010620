import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocksArray: [],
    mainArr: [],
    sortBy: "",
    filter: "",
    portfolioStocks: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
      .then(resp => resp.json())
        .then(stocks => this.setState({
          mainArr: stocks,
          stocksArray: stocks
        }))
  }

  handleAlpha = () => {
    this.setState({sortBy: "Alphabetically"})
  }

  handlePrice = () => {
    this.setState({sortBy: "Price"})
  }

  setFilter = (input) => {
    this.setState({filter: input})
  }


  filterStocks = (e) => {
    let changeArr = this.state.mainArr
    if (e.target.value === "Tech") {
      let techStocksArr = changeArr.filter(stock => stock.type == "Tech")
      this.setState({
        stocksArray: techStocksArr
      })
    } else if (e.target.value === "Sportswear"){
      let sportStockArr = changeArr.filter(stock => stock.type == "Sportswear")
      this.setState({
        stocksArray: sportStockArr
      })
    } else if (e.target.value === "Finance"){
      let financeStockArr = changeArr.filter(stock => stock.type == "Finance")
      this.setState({
        stocksArray: financeStockArr
      })
  }
}

handleClick = (e) => {
  let oldStocks = [...this.state.portfolioStocks]
  let newStock = this.state.mainArr.find(stock => e.target.id == stock.id)
    oldStocks.push(newStock)
  this.setState({portfolioStocks: oldStocks})
}

handleSellClick = (e) => {
  let currentStock = [...this.state.portfolioStocks]
  let indexToRemove = currentStock.findIndex(stock => parseInt(e.target.id) === parseInt(stock.id))
    currentStock.splice(indexToRemove, 1)
  this.setState({portfolioStocks: currentStock})
}

  sortStocks = () => {
   if (this.state.sortBy === 'Alphabetically') {
     return this.state.stocksArray.slice().sort((a,b) => a.ticker.localeCompare(b.ticker))
   } else if (this.state.sortBy === "Price") {
    return this.state.stocksArray.sort(function(a,b) {return b.price-a.price})
   } else {
     return this.state.stocksArray
   }
 }

  render() {
    console.log(this.techStocksArr)
    return (
      <div>
        <SearchBar sortBy={this.state.sortBy} handleAlpha={this.handleAlpha} handlePrice={this.handlePrice} setFilter={this.setFilter} filterStocks={this.filterStocks}/>
          <div className="row">
            <div className="col-8">
              <StockContainer stocks={this.sortStocks()} handleClick={this.handleClick}/>
            </div>
            <div className="col-4">
              <PortfolioContainer portfolioStocks={this.state.portfolioStocks} handleSellClick={this.handleSellClick}/>
            </div>
          </div>
      </div>
    )
  }

}
export default MainContainer;
