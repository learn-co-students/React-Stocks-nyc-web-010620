import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    portfolio: [],
    stocks: [],
    filteredStocks: [], 
    sortBy: ""
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(response => response.json())
    .then(response =>{
      this.setState({
        stocks: response,
        filteredStocks: response
      })
    })
  }

  handleBuyStock = (event) => {
    let foundStock = this.state.filteredStocks.find(stock => stock.id == event.target.id)
    console.log(foundStock)
    let portArr = [...this.state.portfolio,foundStock]
    this.setState({
      portfolio: portArr
    })
  }

  handleSellStock = (event) => {
    let foundStockIndex = this.state.portfolio.findIndex(stock => stock.id == event.target.id)
    let portArr = [...this.state.portfolio]
    portArr.splice(foundStockIndex,1)
    this.setState({
      portfolio: portArr
    })
  }

  handleSortByChange = (event) => {
    console.log(event.target.value)
    if(event.target.value === "Alphabetically"){
      this.setState({
        sortBy: "Alphabetically"
      })
      this.sortByAlpha()
    } else if(event.target.value === "Price"){
      this.setState({
        sortBy: "Price"
      })
      this.sortbyPrice()
    }
  }

  sortByAlpha = () => {
    this.state.filteredStocks.sort((a, b) => a.name.localeCompare(b.name))
  }

  sortbyPrice = () => {
    this.state.filteredStocks.sort((a, b) => b.price - a.price)
  }

  handleFilterBy = (event) => {
    if(event.target.value === "Tech"){
      this.state.filteredStocks = this.state.stocks
      let filtered = this.state.filteredStocks.filter(stock => stock.type == "Tech")
      this.setState({
        filteredStocks: filtered
      })
    } else if(event.target.value === "Sportswear"){
      this.state.filteredStocks = this.state.stocks
      let filtered = this.state.filteredStocks.filter(stock => stock.type == "Sportswear")
      this.setState({
        filteredStocks: filtered
      })
    } else if(event.target.value === "Finance"){
      this.state.filteredStocks = this.state.stocks
      let filtered = this.state.filteredStocks.filter(stock => stock.type == "Finance")
      this.setState({
        filteredStocks: filtered
      })
    }
  }

  render() {
    return (
      <div>
        <SearchBar sortBy={this.state.sortBy} handleSortByChange={this.handleSortByChange} handleFilterBy={this.handleFilterBy}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.filteredStocks} handleClick={this.handleBuyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolio} handleClick={this.handleSellStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
