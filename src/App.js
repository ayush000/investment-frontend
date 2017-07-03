import React, { Component } from 'react';
import axios from 'axios';

import InvestmentForm from './InvestmentForm';
import FundsTable from './FundsTable';
import './App.css';

class App extends Component {
  state = {
    uniqueFunds: [],
    tableData: [],
  }

  componentDidMount() {
    axios.get('http://localhost:3005/api')
      .then(response => {
        console.log(response);
        this.setState({
          uniqueFunds: response.data.uniqueFunds,
        });
      });
    axios.get('http://localhost:3005/api/user-funds')
      .then(response => {
        this.setState({ tableData: response.data })
      })
  }

  handleFormSubmit = params => {
    const urlParams = { ...params, purchaseDate: params.purchaseDate.format() };
    const { tableData } = this.state;
    axios.post('http://localhost:3005/api/new-fund', urlParams)
      .then(response => {
        this.setState({ tableData: [...tableData, response.data] })
      })
  }

  render() {
    const { uniqueFunds } = this.state;
    return (
      <div className="App" style={{ width: '60%', margin: 'auto' }}>
        <div className="AppHeader" >
          <h1>Current value of investment</h1>
        </div>
        <div className="AppBody">
          <InvestmentForm
            handleSubmit={this.handleFormSubmit}
            uniqueFunds={uniqueFunds}
          />
          <FundsTable data={this.state.tableData} />
        </div>
      </div>
    );
  }
}

export default App;
