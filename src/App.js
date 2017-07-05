import React, { Component } from 'react';
import axios from 'axios';

import InvestmentForm from './InvestmentForm';
import FundsTable from './FundsTable';

class App extends Component {
  constructor() {
    super();
    this.state = {
      uniqueFunds: [],
      tableData: [],
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:3005/api/unique-funds')
      .then(response => {
        // console.log(response);
        this.setState({
          uniqueFunds: response.data.uniqueFunds,
        });
      })
      .catch(err => alert(err));
    axios.get('http://localhost:3005/api/user-funds')
      .then(response => {
        this.setState({ tableData: response.data })
      })
      .catch(err => alert(err));
  }

  handleFormSubmit = params => {
    const urlParams = { ...params, purchaseDate: params.purchaseDate.format() };
    const { tableData } = this.state;
    axios.post('http://localhost:3005/api/new-fund', urlParams)
      .then(response => {
        this.setState({ tableData: [...tableData, response.data] })
      })
      .catch(err => alert(err));
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
