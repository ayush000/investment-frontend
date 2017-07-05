import React, { Component } from 'react';
import PropTypes from 'prop-types'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class InvestmentForm extends Component {
  constructor() {
    super();
    this.state = {
      selectedFund: '',
      purchaseDate: moment().subtract(1, 'day'),
      amountInvested: ''
    }
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleAmountChange = this.handleAmountChange.bind(this)
    this.handleFundChange = this.handleFundChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
InvestmentForm.propTypes = {
  uniqueFunds: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}
export default InvestmentForm;