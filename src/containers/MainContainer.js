import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stockList: [],
    currentStockList: [],
    portfolioStockList: [],
    filter: "default"
  }

  componentDidMount(){
    fetch(`http://localhost:3000/stocks`)
    .then(res => res.json())
    .then(js => this.setState({stockList: js, currentStockList: js}))
  }

  onFilter = (e) => {
    let newStockList = this.state.stockList.filter(stock => stock.type == e.target.value)
    this.setState({filter: e.target.value, currentStockList: newStockList})
  }

  onSortBy = (e) => {
    let newStockList

    switch(e.target.value){
      case "Alphabetically":
       newStockList = this.state.currentStockList.sort((a, b) => a.name.localeCompare(b.name))
       this.setState({currentStockList: newStockList})
      break
      case "Price":
       newStockList = this.state.currentStockList.sort((a, b) => a.price - b.price)
       this.setState({currentStockList: newStockList})
      break
    }

  }

  addToPortfolio = (props) => {
    if(this.state.portfolioStockList.includes(props)) return

    this.setState(prevState => {
      let newStocks = prevState.portfolioStockList
      newStocks.push(props)
      return {portfolioStockList: newStocks}
    })
  }

  removeFromPortfolio = (props) => {
   let newStocks = this.state.portfolioStockList
   let mid = newStocks.indexOf(props)
   newStocks.splice(mid, 1)

    this.setState({portfolioStockList: newStocks})
  }

  render() {
    return (
      <div>
        <SearchBar onSortBy={this.onSortBy} onFilter={this.onFilter}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.currentStockList} changePortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStockList} changePortfolio={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
