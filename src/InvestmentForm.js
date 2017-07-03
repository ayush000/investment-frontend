import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class InvestmentForm extends Component {
  state = {
    selectedFund: '',
    purchaseDate: moment().subtract(1, 'day'),
    amountInvested: ''
  }

  static propTypes = {
    uniqueFunds: PropTypes.array.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  handleDateChange = date => {
    this.setState({ purchaseDate: date })
  }

  handleAmountChange = e => {
    e.preventDefault();
    this.setState({ amountInvested: e.target.value });
  }

  handleFundChange = e => {
    e.preventDefault();
    this.setState({ selectedFund: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { selectedFund, amountInvested } = this.state;
    if (selectedFund.length > 0 &&
      amountInvested.length > 0 &&
      parseInt(amountInvested, 10) > 0) {
      this.props.handleSubmit(this.state)
    } else {
      alert('Missing data');
    }
  }

  render() {
    const { uniqueFunds } = this.props;
    console.log(typeof this.state.purchaseDate);
    console.log(this.state.purchaseDate);
    
    return (
      <div style={{ lineHeight: '2em' }}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Fund name:
          <select defaultValue="0" onChange={this.handleFundChange}>
              <option value="0" disabled>Please select</option>
              {uniqueFunds.map(fundName => (
                <option key={fundName} value={fundName}>
                  {fundName}
                </option>))}
            </select>
          </label>
          <br />
          <label>
            Amount invested:
            <input type="number" onChange={this.handleAmountChange} />
          </label>
          <br />
          <label>
            Date purchased:
            <DatePicker
              tetherConstraints={[]}
              selected={this.state.purchaseDate}
              onChange={this.handleDateChange}
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default InvestmentForm;