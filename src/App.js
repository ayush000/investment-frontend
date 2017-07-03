import React, { Component } from 'react';
import axios from 'axios';

import InvestmentForm from './InvestmentForm';
import './App.css';

class App extends Component {
  state = {
    // funds: [],
    uniqueFunds: [],
  }

  componentDidMount() {
    axios.get('http://localhost:3005/api')
      .then(response => {
        console.log(response);
        this.setState({
          // funds: response.data.funds,
          uniqueFunds: response.data.uniqueFunds,
        });
      });
  }

  handleFormSubmit = params => {
    debugger;
    params.purchaseDate = params.purchaseDate.format()
    axios.post('http://localhost:3005/api/current-value', params)
      .then(response => {
        alert(JSON.stringify(response.data));
      })
  }

  render() {
    const { uniqueFunds } = this.state;
    return (
      <div className="App">
        <div className="AppHeader" >
          <h1>Current value of investment</h1>
        </div>
        <div className="AppBody">
          <InvestmentForm
            handleSubmit={this.handleFormSubmit}
            uniqueFunds={uniqueFunds}
          />
          {JSON.stringify(this.state)}
        </div>
      </div>
    );
  }
}

export default App;
