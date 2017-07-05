import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-table';
import 'react-table/react-table.css'

class FundsTable extends Component {
  render() {
    const columns = [{
      Header: 'ID',
      accessor: 'id' // String-based value accessors! 
    }, {
      Header: 'Fund value',
      accessor: 'fundName' // String-based value accessors! 
    }, {
      Header: 'Units purchased',
      accessor: 'units' // String-based value accessors! 
    }, {
      Header: 'Current value',
      accessor: 'value' // String-based value accessors! 
    }]

    return (
      <Table
        showPagination={false}
        minRows={0}
        data={this.props.data}
        columns={columns}
        maxWidth={50}
      />
    );
  }
}

FundsTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default FundsTable;